import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { storeId, name, description, category, price, stock, imageUrl } = req.body;
      let assignedStoreId = storeId;
      let newStore = null;
      
      if (!storeId) {
        // Create a new store with default values
        const now = new Date();
        const storeName = `Auto Store ${now.getTime()}`;
        
        try {
          // Create a new vendor first
          const vendor = await prisma.vendor.create({
            data: { 
              businessName: `AutoVendor ${now.getTime()}`
            }
          });
          
          // Then create the store with a raw SQL query to handle the GEOGRAPHY type
          // This uses Prisma's $executeRaw to create the store with a proper location point
          interface StoreRow {
            store_id: number;
            vendor_id: number;
            store_name: string;
            description?: string;
            banner_url?: string;
            logo_url?: string;
            address_line1: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
            location?: unknown; // GEOGRAPHY type, handle as needed
            operating_radius: number;
          }

          const [newStoreResult] = await prisma.$queryRaw<StoreRow[]>`
            INSERT INTO store (
              vendor_id, 
              store_name, 
              address_line1, 
              city, 
              state, 
              postal_code, 
              country, 
              location, 
              operating_radius
            ) VALUES (
              ${vendor.id}, 
              ${storeName}, 
              'Auto Address', 
              'Auto City', 
              'Auto State', 
              '000000', 
              'Auto Country', 
              ST_SetSRID(ST_MakePoint(0, 0), 4326), 
              5000
            ) RETURNING store_id, vendor_id, store_name, description, banner_url, logo_url, address_line1, city, state, postal_code, country, location, operating_radius
          `;
          
          newStore = newStoreResult;
          assignedStoreId = newStoreResult.store_id;
        } catch (storeError: any) {
          console.error('Store creation error:', storeError);
          return res.status(500).json({ 
            error: 'Failed to create store', 
            details: storeError.message 
          });
        }
      }
      
      if (!assignedStoreId || !name || !price) {
        return res.status(400).json({ error: 'storeId (auto or provided), name, and price are required' });
      }
      
      const product = await prisma.product.create({
        data: {
          storeId: Number(assignedStoreId),
          name,
          description,
          category,
          price: parseFloat(price),
          stock: stock ? Number(stock) : undefined,
          imageUrl,
        },
      });
      
      return res.status(201).json({ product, store: newStore });
    } catch (error: any) {
      console.error('Create product error:', error);
      return res.status(500).json({ 
        error: 'Failed to create product', 
        details: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}