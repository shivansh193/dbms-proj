import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET: Fetch a customer's cart
  if (req.method === 'GET') {
    try {
      const { customerId } = req.query;
      
      if (!customerId) {
        return res.status(400).json({ error: 'Customer ID is required' });
      }
      
      // Find the customer's active cart or create a new one
      let cart = await prisma.cart.findFirst({
        where: { customerId: Number(customerId) },
        include: {
          cartItems: {
            include: {
              product: true
            }
          }
        }
      });
      
      // If no cart exists, create a new one
      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            customerId: Number(customerId),
            createdDate: new Date()
          },
          include: {
            cartItems: {
              include: {
                product: true
              }
            }
          }
        });
      }
      
      // Calculate total price
      const totalPrice = cart.cartItems.reduce((sum, item) => {
        return sum + (Number(item.product.price) * item.quantity);
      }, 0);
      
      return res.status(200).json({ 
        cart,
        totalPrice
      });
    } catch (error: any) {
      console.error('Cart fetch error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch cart', 
        details: error.message 
      });
    }
  }
  
  // POST: Create a new cart
  else if (req.method === 'POST') {
    try {
      const { customerId } = req.body;
      
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
      
      // Check if customer already has a cart
      const existingCart = await prisma.cart.findFirst({
        where: { customerId: Number(customerId) }
      });
      
      if (existingCart) {
        return res.status(200).json({ 
          cart: existingCart,
          message: 'Customer already has a cart' 
        });
      }
      
      // Create a new cart
      const cart = await prisma.cart.create({
        data: {
          customerId: Number(customerId),
          createdDate: new Date()
        }
      });
      
      return res.status(201).json({ cart });
    } catch (error: any) {
      console.error('Create cart error:', error);
      return res.status(500).json({ 
        error: 'Failed to create cart', 
        details: error.message 
      });
    }
  }
  
  // DELETE: Clear a cart
  else if (req.method === 'DELETE') {
    try {
      const { cartId } = req.query;
      
      if (!cartId) {
        return res.status(400).json({ error: 'Cart ID is required' });
      }
      
      // Check if cart exists
      const cart = await prisma.cart.findUnique({
        where: { id: Number(cartId) }
      });
      
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
      
      // Delete all cart items first
      await prisma.cartItem.deleteMany({
        where: { cartId: Number(cartId) }
      });
      
      return res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error: any) {
      console.error('Clear cart error:', error);
      return res.status(500).json({ 
        error: 'Failed to clear cart', 
        details: error.message 
      });
    }
  }
  
  // Method not allowed
  else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
