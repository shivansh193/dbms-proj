import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { vendorId, name, description, bannerUrl, logoUrl, addressLine1, city, state, postalCode, country, operatingRadius } = req.body;
      if (!vendorId || !name || !addressLine1 || !city || !state || !postalCode || !country) {
        return res.status(400).json({ error: 'Required fields: vendorId, name, addressLine1, city, state, postalCode, country' });
      }
      const store = await prisma.store.create({
        data: {
          vendorId: Number(vendorId),
          name,
          description,
          bannerUrl,
          logoUrl,
          addressLine1,
          city,
          state,
          postalCode,
          country,
          operatingRadius: operatingRadius ? Number(operatingRadius) : undefined,
        },
      });
      return res.status(201).json({ store });
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