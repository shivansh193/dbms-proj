import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET: Fetch products with filtering and pagination
  if (req.method === 'GET') {
    try {
      const { 
        storeId, 
        category, 
        minPrice, 
        maxPrice, 
        search,
        page = '1',
        limit = '10',
        sortBy = 'name',
        sortOrder = 'asc'
      } = req.query;
      
      // Build filter conditions
      const whereClause: any = {};
      
      if (storeId) {
        whereClause.storeId = Number(storeId);
      }
      
      if (category) {
        whereClause.category = category;
      }
      
      if (minPrice || maxPrice) {
        whereClause.price = {};
        
        if (minPrice) {
          whereClause.price.gte = Number(minPrice);
        }
        
        if (maxPrice) {
          whereClause.price.lte = Number(maxPrice);
        }
      }
      
      if (search) {
        whereClause.OR = [
          { name: { contains: search as string, mode: 'insensitive' } },
          { description: { contains: search as string, mode: 'insensitive' } }
        ];
      }
      
      // Pagination
      const pageNum = Number(page);
      const limitNum = Number(limit);
      const skip = (pageNum - 1) * limitNum;
      
      // Sorting
      const orderBy: any = {};
      orderBy[sortBy as string] = sortOrder;
      
      // Get products
      const products = await prisma.product.findMany({
        where: whereClause,
        skip,
        take: limitNum,
        orderBy,
        include: {
          store: {
            select: {
              id: true,
              name: true,
              vendor: {
                select: {
                  id: true,
                  businessName: true
                }
              }
            }
          },
          reviews: {
            select: {
              rating: true
            }
          }
        }
      });
      
      // Calculate average rating for each product
      const productsWithRating = products.map(product => {
        const ratings = product.reviews.map(review => review.rating);
        const avgRating = ratings.length > 0 
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
          : null;
          
        return {
          ...product,
          avgRating,
          reviewCount: ratings.length
        };
      });
      
      // Get total count for pagination
      const total = await prisma.product.count({
        where: whereClause
      });
      
      return res.status(200).json({
        products: productsWithRating,
        pagination: {
          total,
          pages: Math.ceil(total / limitNum),
          page: pageNum,
          limit: limitNum
        }
      });
    } catch (error: any) {
      console.error('Products fetch error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch products', 
        details: error.message 
      });
    }
  }
  
  // POST: Create a new product
  else if (req.method === 'POST') {
    try {
      const { storeId, name, description, category, price, stock, imageUrl } = req.body;
      
      // Validate required fields
      if (!storeId || !name || !price) {
        return res.status(400).json({ error: 'Store ID, name, and price are required' });
      }
      
      // Check if store exists
      const store = await prisma.store.findUnique({
        where: { id: Number(storeId) }
      });
      
      if (!store) {
        return res.status(404).json({ error: 'Store not found' });
      }
      
      // Create the product
      const product = await prisma.product.create({
        data: {
          storeId: Number(storeId),
          name,
          description,
          category,
          price: Number(price),
          stock: stock ? Number(stock) : null,
          imageUrl
        }
      });
      
      return res.status(201).json({ product });
    } catch (error: any) {
      console.error('Create product error:', error);
      return res.status(500).json({ 
        error: 'Failed to create product', 
        details: error.message 
      });
    }
  }
  
  // Method not allowed
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
