import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Valid product ID is required' });
  }
  
  const productId = Number(id);
  
  // GET: Fetch a specific product
  if (req.method === 'GET') {
    try {
      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: {
          store: {
            include: {
              vendor: true
            }
          },
          reviews: {
            include: {
              customer: {
                select: {
                  id: true,
                  name: true
                }
              }
            },
            orderBy: {
              reviewDate: 'desc'
            },
            take: 5
          }
        }
      });
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      // Calculate average rating
      const ratings = product.reviews.map(review => review.rating);
      const avgRating = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
        : null;
        
      // Get related products from the same store and category
      const relatedProducts = await prisma.product.findMany({
        where: {
          storeId: product.storeId,
          category: product.category,
          id: { not: productId }
        },
        take: 4,
        include: {
          reviews: {
            select: {
              rating: true
            }
          }
        }
      });
      
      // Calculate average rating for related products
      const relatedWithRatings = relatedProducts.map(relProduct => {
        const relRatings = relProduct.reviews.map(review => review.rating);
        const relAvgRating = relRatings.length > 0 
          ? relRatings.reduce((sum, rating) => sum + rating, 0) / relRatings.length 
          : null;
          
        return {
          ...relProduct,
          avgRating: relAvgRating,
          reviewCount: relRatings.length
        };
      });
      
      return res.status(200).json({
        product: {
          ...product,
          avgRating,
          reviewCount: ratings.length
        },
        relatedProducts: relatedWithRatings
      });
    } catch (error: any) {
      console.error('Product fetch error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch product', 
        details: error.message 
      });
    }
  }
  
  // PUT: Update a product
  else if (req.method === 'PUT') {
    try {
      const { name, description, category, price, stock, imageUrl } = req.body;
      
      // Check if product exists
      const existingProduct = await prisma.product.findUnique({
        where: { id: productId }
      });
      
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      // Update the product
      const product = await prisma.product.update({
        where: { id: productId },
        data: {
          name,
          description,
          category,
          price: price !== undefined ? Number(price) : undefined,
          stock: stock !== undefined ? (stock === null ? null : Number(stock)) : undefined,
          imageUrl
        }
      });
      
      return res.status(200).json({ product });
    } catch (error: any) {
      console.error('Update product error:', error);
      return res.status(500).json({ 
        error: 'Failed to update product', 
        details: error.message 
      });
    }
  }
  
  // DELETE: Delete a product
  else if (req.method === 'DELETE') {
    try {
      // Check if product exists
      const existingProduct = await prisma.product.findUnique({
        where: { id: productId }
      });
      
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      // Delete the product
      await prisma.product.delete({
        where: { id: productId }
      });
      
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error: any) {
      console.error('Delete product error:', error);
      return res.status(500).json({ 
        error: 'Failed to delete product', 
        details: error.message 
      });
    }
  }
  
  // Method not allowed
  else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
