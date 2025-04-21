import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Valid store ID is required' });
  }
  
  const storeId = Number(id);
  
  // GET: Fetch a specific store with its products
  if (req.method === 'GET') {
    try {
      // Get the store details
      const store = await prisma.store.findUnique({
        where: { id: storeId },
        include: {
          vendor: true
        }
      });
      
      if (!store) {
        return res.status(404).json({ error: 'Store not found' });
      }
      
      // Get store products with pagination
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      const products = await prisma.product.findMany({
        where: { storeId },
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        include: {
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
      
      // Get total product count
      const totalProducts = await prisma.product.count({
        where: { storeId }
      });
      
      // Get store categories
      const categories = await prisma.$queryRaw`
        SELECT DISTINCT category
        FROM product
        WHERE store_id = ${storeId}
        AND category IS NOT NULL
        ORDER BY category
      `;
      
      return res.status(200).json({
        store,
        products: productsWithRating,
        categories,
        pagination: {
          total: totalProducts,
          pages: Math.ceil(totalProducts / limit),
          page,
          limit
        }
      });
    } catch (error: any) {
      console.error('Store fetch error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch store', 
        details: error.message 
      });
    }
  }
  
  // PUT: Update a store
  else if (req.method === 'PUT') {
    try {
      const { 
        name, 
        description, 
        bannerUrl, 
        logoUrl, 
        addressLine1, 
        city, 
        state, 
        postalCode, 
        country, 
        operatingRadius,
        latitude,
        longitude
      } = req.body;
      
      // Check if store exists
      const existingStore = await prisma.store.findUnique({
        where: { id: storeId }
      });
      
      if (!existingStore) {
        return res.status(404).json({ error: 'Store not found' });
      }
      
      // Update store information
      let updatedStore;
      
      // If location (lat/lng) is being updated, use raw SQL
      if (latitude !== undefined && longitude !== undefined) {
        // Define an interface to match the returned row structure
        interface StoreResult {
          store_id: number;
          vendor_id: number;
          store_name: string;
          description: string | null;
          banner_url: string | null;
          logo_url: string | null;
          address_line1: string;
          city: string;
          state: string;
          postal_code: string;
          country: string;
          operating_radius: number;
          // location field is not directly accessible in JS
        }
        
        // Execute the raw SQL update with all fields including the location
        const [store] = await prisma.$queryRaw<StoreResult[]>`
          UPDATE store
          SET 
            store_name = ${name || existingStore.name},
            description = ${description !== undefined ? description : existingStore.description},
            banner_url = ${bannerUrl !== undefined ? bannerUrl : existingStore.bannerUrl},
            logo_url = ${logoUrl !== undefined ? logoUrl : existingStore.logoUrl},
            address_line1 = ${addressLine1 || existingStore.addressLine1},
            city = ${city || existingStore.city},
            state = ${state || existingStore.state},
            postal_code = ${postalCode || existingStore.postalCode},
            country = ${country || existingStore.country},
            location = ST_SetSRID(ST_MakePoint(${Number(longitude)}, ${Number(latitude)}), 4326),
            operating_radius = ${operatingRadius !== undefined ? Number(operatingRadius) : existingStore.operatingRadius}
          WHERE store_id = ${storeId}
          RETURNING 
            store_id, 
            vendor_id, 
            store_name, 
            description, 
            banner_url, 
            logo_url, 
            address_line1, 
            city, 
            state, 
            postal_code, 
            country, 
            operating_radius
        `;
        
        updatedStore = {
          id: store.store_id,
          vendorId: store.vendor_id,
          name: store.store_name,
          description: store.description,
          bannerUrl: store.banner_url,
          logoUrl: store.logo_url,
          addressLine1: store.address_line1,
          city: store.city,
          state: store.state,
          postalCode: store.postal_code,
          country: store.country,
          operatingRadius: store.operating_radius
        };
      } else {
        // If location is not being updated, use Prisma's update
        updatedStore = await prisma.store.update({
          where: { id: storeId },
          data: {
            name,
            description,
            bannerUrl,
            logoUrl,
            addressLine1,
            city,
            state,
            postalCode,
            country,
            operatingRadius: operatingRadius !== undefined ? Number(operatingRadius) : undefined
          }
        });
      }
      
      return res.status(200).json({ store: updatedStore });
    } catch (error: any) {
      console.error('Update store error:', error);
      return res.status(500).json({ 
        error: 'Failed to update store', 
        details: error.message 
      });
    }
  }
  
  // DELETE: Delete a store
  else if (req.method === 'DELETE') {
    try {
      // Check if store exists
      const existingStore = await prisma.store.findUnique({
        where: { id: storeId }
      });
      
      if (!existingStore) {
        return res.status(404).json({ error: 'Store not found' });
      }
      
      // Delete all products associated with the store
      await prisma.product.deleteMany({
        where: { storeId }
      });
      
      // Delete the store
      await prisma.store.delete({
        where: { id: storeId }
      });
      
      return res.status(200).json({ message: 'Store and all its products deleted successfully' });
    } catch (error: any) {
      console.error('Delete store error:', error);
      return res.status(500).json({ 
        error: 'Failed to delete store', 
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
