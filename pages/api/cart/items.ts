import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // POST: Add an item to the cart
  if (req.method === 'POST') {
    try {
      const { cartId, productId, quantity } = req.body;
      
      // Validate required fields
      if (!cartId || !productId) {
        return res.status(400).json({ error: 'Cart ID and Product ID are required' });
      }
      
      // Check if cart exists
      const cart = await prisma.cart.findUnique({
        where: { id: Number(cartId) }
      });
      
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
      
      // Check if product exists
      const product = await prisma.product.findUnique({
        where: { id: Number(productId) }
      });
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      // Check if product is in stock
      if (product.stock !== null && product.stock < (quantity || 1)) {
        return res.status(400).json({ error: 'Not enough stock available' });
      }
      
      // Check if item already exists in cart
      const existingItem = await prisma.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: Number(cartId),
            productId: Number(productId)
          }
        }
      });
      
      let cartItem;
      
      if (existingItem) {
        // Update quantity
        cartItem = await prisma.cartItem.update({
          where: {
            cartId_productId: {
              cartId: Number(cartId),
              productId: Number(productId)
            }
          },
          data: {
            quantity: existingItem.quantity + (quantity || 1)
          },
          include: {
            product: true
          }
        });
      } else {
        // Add new item
        cartItem = await prisma.cartItem.create({
          data: {
            cartId: Number(cartId),
            productId: Number(productId),
            quantity: quantity || 1
          },
          include: {
            product: true
          }
        });
      }
      
      return res.status(201).json({ cartItem });
    } catch (error: any) {
      console.error('Add to cart error:', error);
      return res.status(500).json({ 
        error: 'Failed to add item to cart', 
        details: error.message 
      });
    }
  }
  
  // PUT: Update cart item quantity
  else if (req.method === 'PUT') {
    try {
      const { cartId, productId, quantity } = req.body;
      
      // Validate required fields
      if (!cartId || !productId || quantity === undefined) {
        return res.status(400).json({ error: 'Cart ID, Product ID, and quantity are required' });
      }
      
      // Check if item exists in cart
      const existingItem = await prisma.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: Number(cartId),
            productId: Number(productId)
          }
        }
      });
      
      if (!existingItem) {
        return res.status(404).json({ error: 'Item not found in cart' });
      }
      
      // If quantity is 0, remove the item
      if (quantity === 0) {
        await prisma.cartItem.delete({
          where: {
            cartId_productId: {
              cartId: Number(cartId),
              productId: Number(productId)
            }
          }
        });
        
        return res.status(200).json({ message: 'Item removed from cart' });
      }
      
      // Check if product is in stock
      const product = await prisma.product.findUnique({
        where: { id: Number(productId) }
      });
      
      if (product?.stock !== null && product.stock < quantity) {
        return res.status(400).json({ error: 'Not enough stock available' });
      }
      
      // Update quantity
      const cartItem = await prisma.cartItem.update({
        where: {
          cartId_productId: {
            cartId: Number(cartId),
            productId: Number(productId)
          }
        },
        data: {
          quantity: Number(quantity)
        },
        include: {
          product: true
        }
      });
      
      return res.status(200).json({ cartItem });
    } catch (error: any) {
      console.error('Update cart item error:', error);
      return res.status(500).json({ 
        error: 'Failed to update cart item', 
        details: error.message 
      });
    }
  }
  
  // DELETE: Remove an item from the cart
  else if (req.method === 'DELETE') {
    try {
      const { cartId, productId } = req.query;
      
      // Validate required fields
      if (!cartId || !productId) {
        return res.status(400).json({ error: 'Cart ID and Product ID are required' });
      }
      
      // Check if item exists in cart
      const existingItem = await prisma.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: Number(cartId),
            productId: Number(productId)
          }
        }
      });
      
      if (!existingItem) {
        return res.status(404).json({ error: 'Item not found in cart' });
      }
      
      // Remove the item
      await prisma.cartItem.delete({
        where: {
          cartId_productId: {
            cartId: Number(cartId),
            productId: Number(productId)
          }
        }
      });
      
      return res.status(200).json({ message: 'Item removed from cart' });
    } catch (error: any) {
      console.error('Remove from cart error:', error);
      return res.status(500).json({ 
        error: 'Failed to remove item from cart', 
        details: error.message 
      });
    }
  }
  
  // Method not allowed
  else {
    res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
