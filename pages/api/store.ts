import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { 
        vendorId, 
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
      
      // Validate required fields
      if (!vendorId || !name || !addressLine1 || !city || !state || !postalCode || !country || !latitude || !longitude) {
        return res.status(400).json({ 
          error: 'Required fields: vendorId, name, addressLine1, city, state, postalCode, country, latitude, longitude' 
        });
      }

      // First validate that the vendor exists
      const vendor = await prisma.vendor.findUnique({
        where: { id: Number(vendorId) }
      });
      
      if (!vendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
      
      // Use raw SQL for the entire store creation to handle the GEOGRAPHY type
      const finalOperatingRadius = operatingRadius ? Number(operatingRadius) : 25000;
      
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
      
      // Execute the raw SQL insert with all fields including the location
      const [store] = await prisma.$queryRaw<StoreResult[]>`
        INSERT INTO store (
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
          location,
          operating_radius
        ) VALUES (
          ${Number(vendorId)},
          ${name},
          ${description || null},
          ${bannerUrl || null},
          ${logoUrl || null},
          ${addressLine1},
          ${city},
          ${state},
          ${postalCode},
          ${country},
          ST_SetSRID(ST_MakePoint(${Number(longitude)}, ${Number(latitude)}), 4326),
          ${finalOperatingRadius}
        )
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
      
      // Transform the raw result to match your API response format
      const formattedStore = {
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
        operatingRadius: store.operating_radius,
        location: {
          latitude: Number(latitude),
          longitude: Number(longitude)
        }
      };

      return res.status(201).json({ store: formattedStore });
    } catch (error: any) {
      console.error('Create store error:', error);
      return res.status(500).json({ 
        error: 'Failed to create store', 
        details: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}