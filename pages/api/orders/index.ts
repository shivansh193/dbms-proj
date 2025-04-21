import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET: Fetch orders or a specific order
  if (req.method === 'GET') {
    try {
      const { id, customerId } = req.query;
      
      if (id) {
        // Get a specific order
        const order = await prisma.order.findUnique({
          where: { id: Number(id) },
          include: {
            customer: true,
            orderDetails: {
              include: {
                product: true
              }
            },
            payments: true
          }
        });
        
        if (!order) {
          return res.status(404).json({ error: 'Order not found' });
        }
        
        return res.status(200).json({ order });
      } else if (customerId) {
        // Get orders for a specific customer
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const orders = await prisma.order.findMany({
          where: { customerId: Number(customerId) },
          skip,
          take: limit,
          orderBy: { orderDate: 'desc' },
          include: {
            orderDetails: {
              include: {
                product: true
              }
            }
          }
        });
        
        const total = await prisma.order.count({
          where: { customerId: Number(customerId) }
        });
        
        return res.status(200).json({ 
          orders,
          pagination: {
            total,
            pages: Math.ceil(total / limit),
            page,
            limit
          }
        });
      } else {
        // Get all orders (with pagination)
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const orders = await prisma.order.findMany({
          skip,
          take: limit,
          orderBy: { orderDate: 'desc' },
          include: {
            customer: true,
            orderDetails: {
              include: {
                product: true
              }
            }
          }
        });
        
        const total = await prisma.order.count();
        
        return res.status(200).json({ 
          orders,
          pagination: {
            total,
            pages: Math.ceil(total / limit),
            page,
            limit
          }
        });
      }
    } catch (error: any) {
      console.error('Order fetch error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch order(s)', 
        details: error.message 
      });
    }
  }
  
  // POST: Create a new order
  else if (req.method === 'POST') {
    try {
      const { customerId, cartId, paymentMethod } = req.body;
      
      // Validate required fields
      if (!customerId) {
        return res.status(400).json({ error: 'Customer ID is required' });
      }
      
      // Check if customer exists
      const customer = await prisma.customer.findUnique({
        where: { id: Number(customerId) }
      });
      
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      
      // If cartId is provided, use it to create the order
      if (cartId) {
        // Get the cart with items
        const cart = await prisma.cart.findUnique({
          where: { id: Number(cartId) },
          include: {
            cartItems: {
              include: {
                product: true
              }
            }
          }
        });
        
        if (!cart) {
          return res.status(404).json({ error: 'Cart not found' });
        }
        
        if (cart.cartItems.length === 0) {
          return res.status(400).json({ error: 'Cart is empty' });
        }
        
        // Calculate total amount
        const totalAmount = cart.cartItems.reduce((sum: number, item: any) => {
          return sum + (Number(item.product.price) * item.quantity);
        }, 0);
        
        // Create the order in a transaction
        const order = await prisma.$transaction(async (tx) => {
          // Create the order
          const newOrder = await tx.order.create({
            data: {
              customerId: Number(customerId),
              totalAmount,
              orderStatus: 'pending',
              paymentStatus: 'unpaid'
            }
          });
          
          // Create order details for each cart item
          for (const item of cart.cartItems) {
            await tx.orderDetail.create({
              data: {
                orderId: newOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.product.price
              }
            });
            
            // Update product stock if available
            if (item.product.stock !== null) {
              await tx.product.update({
                where: { id: item.productId },
                data: { stock: item.product.stock - item.quantity }
              });
            }
          }
          
          // Create payment record if payment method is provided
          if (paymentMethod) {
            await tx.payment.create({
              data: {
                orderId: newOrder.id,
                paymentMethod,
                paymentStatus: 'pending',
                amount: totalAmount
              }
            });
          }
          
          // Clear the cart
          await tx.cartItem.deleteMany({
            where: { cartId: Number(cartId) }
          });
          
          return newOrder;
        });
        
        // Get the complete order with details
        const completeOrder = await prisma.order.findUnique({
          where: { id: order.id },
          include: {
            orderDetails: {
              include: {
                product: true
              }
            },
            payments: true
          }
        });
        
        return res.status(201).json({ order: completeOrder });
      } else {
        // Direct order creation (without cart)
        const { items, totalAmount } = req.body;
        
        if (!items || !Array.isArray(items) || items.length === 0) {
          return res.status(400).json({ error: 'Order items are required' });
        }
        
        if (!totalAmount) {
          return res.status(400).json({ error: 'Total amount is required' });
        }
        
        // Create the order in a transaction
        const order = await prisma.$transaction(async (tx) => {
          // Create the order
          const newOrder = await tx.order.create({
            data: {
              customerId: Number(customerId),
              totalAmount,
              orderStatus: 'pending',
              paymentStatus: 'unpaid'
            }
          });
          
          // Create order details for each item
          for (const item of items) {
            const { productId, quantity, unitPrice } = item;
            
            if (!productId || !quantity || !unitPrice) {
              throw new Error('Product ID, quantity, and unit price are required for each item');
            }
            
            // Check if product exists
            const product = await tx.product.findUnique({
              where: { id: Number(productId) }
            });
            
            if (!product) {
              throw new Error(`Product with ID ${productId} not found`);
            }
            
            await tx.orderDetail.create({
              data: {
                orderId: newOrder.id,
                productId: Number(productId),
                quantity: Number(quantity),
                unitPrice: Number(unitPrice)
              }
            });
            
            // Update product stock if available
            if (product.stock !== null) {
              await tx.product.update({
                where: { id: Number(productId) },
                data: { stock: product.stock - Number(quantity) }
              });
            }
          }
          
          // Create payment record if payment method is provided
          if (paymentMethod) {
            await tx.payment.create({
              data: {
                orderId: newOrder.id,
                paymentMethod,
                paymentStatus: 'pending',
                amount: Number(totalAmount)
              }
            });
          }
          
          return newOrder;
        });
        
        // Get the complete order with details
        const completeOrder = await prisma.order.findUnique({
          where: { id: order.id },
          include: {
            orderDetails: {
              include: {
                product: true
              }
            },
            payments: true
          }
        });
        
        return res.status(201).json({ order: completeOrder });
      }
    } catch (error: any) {
      console.error('Create order error:', error);
      return res.status(500).json({ 
        error: 'Failed to create order', 
        details: error.message 
      });
    }
  }
  
  // PUT: Update an order's status
  else if (req.method === 'PUT') {
    try {
      const { id, orderStatus, paymentStatus } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'Order ID is required' });
      }
      
      // Check if order exists
      const existingOrder = await prisma.order.findUnique({
        where: { id: Number(id) }
      });
      
      if (!existingOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      // Update the order
      const order = await prisma.order.update({
        where: { id: Number(id) },
        data: {
          orderStatus: orderStatus || undefined,
          paymentStatus: paymentStatus || undefined
        },
        include: {
          orderDetails: true,
          payments: true
        }
      });
      
      return res.status(200).json({ order });
    } catch (error: any) {
      console.error('Update order error:', error);
      return res.status(500).json({ 
        error: 'Failed to update order', 
        details: error.message 
      });
    }
  }
  
  // Method not allowed
  else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
