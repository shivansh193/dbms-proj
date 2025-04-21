import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET: Fetch reviews for a product or by a customer
  if (req.method === 'GET') {
    try {
      const { productId, customerId } = req.query;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      let whereClause: any = {};
      
      if (productId) {
        whereClause.productId = Number(productId);
      }
      
      if (customerId) {
        whereClause.customerId = Number(customerId);
      }
      
      if (!productId && !customerId) {
        return res.status(400).json({ error: 'Product ID or Customer ID is required' });
      }
      
      const reviews = await prisma.review.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { reviewDate: 'desc' },
        include: {
          customer: {
            select: {
              id: true,
              name: true
            }
          },
          product: {
            select: {
              id: true,
              name: true,
              imageUrl: true
            }
          }
        }
      });
      
      const total = await prisma.review.count({
        where: whereClause
      });
      
      // Calculate average rating if productId is provided
      let averageRating = null;
      if (productId) {
        const result = await prisma.review.aggregate({
          where: { productId: Number(productId) },
          _avg: {
            rating: true
          }
        });
        averageRating = result._avg.rating;
      }
      
      return res.status(200).json({ 
        reviews,
        averageRating,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          page,
          limit
        }
      });
    } catch (error: any) {
      console.error('Reviews fetch error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch reviews', 
        details: error.message 
      });
    }
  }
  
  // POST: Create a new review
  else if (req.method === 'POST') {
    try {
      const { customerId, productId, rating, comment } = req.body;
      
      // Validate required fields
      if (!customerId || !productId || rating === undefined) {
        return res.status(400).json({ error: 'Customer ID, Product ID, and rating are required' });
      }
      
      // Validate rating range
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
      }
      
      // Check if customer exists
      const customer = await prisma.customer.findUnique({
        where: { id: Number(customerId) }
      });
      
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      
      // Check if product exists
      const product = await prisma.product.findUnique({
        where: { id: Number(productId) }
      });
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      // Check if customer has already reviewed this product
      const existingReview = await prisma.review.findFirst({
        where: {
          customerId: Number(customerId),
          productId: Number(productId)
        }
      });
      
      if (existingReview) {
        // Update existing review
        const updatedReview = await prisma.review.update({
          where: { id: existingReview.id },
          data: {
            rating: Number(rating),
            comment,
            reviewDate: new Date()
          },
          include: {
            customer: {
              select: {
                id: true,
                name: true
              }
            },
            product: {
              select: {
                id: true,
                name: true
              }
            }
          }
        });
        
        return res.status(200).json({ 
          review: updatedReview,
          message: 'Review updated successfully'
        });
      }
      
      // Create new review
      const review = await prisma.review.create({
        data: {
          customerId: Number(customerId),
          productId: Number(productId),
          rating: Number(rating),
          comment,
          reviewDate: new Date()
        },
        include: {
          customer: {
            select: {
              id: true,
              name: true
            }
          },
          product: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
      
      return res.status(201).json({ review });
    } catch (error: any) {
      console.error('Create review error:', error);
      return res.status(500).json({ 
        error: 'Failed to create review', 
        details: error.message 
      });
    }
  }
  
  // DELETE: Delete a review
  else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Review ID is required' });
      }
      
      // Check if review exists
      const review = await prisma.review.findUnique({
        where: { id: Number(id) }
      });
      
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
      
      // Delete the review
      await prisma.review.delete({
        where: { id: Number(id) }
      });
      
      return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error: any) {
      console.error('Delete review error:', error);
      return res.status(500).json({ 
        error: 'Failed to delete review', 
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
