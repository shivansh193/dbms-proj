import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { businessName, storeProfile, contactInfo } = req.body;
      if (!businessName) {
        return res.status(400).json({ error: 'businessName is required' });
      }
      const vendor = await prisma.vendor.create({
        data: {
          businessName,
          storeProfile,
          contactInfo,
        },
      });
      return res.status(201).json({ vendor });
    } catch (error: any) {
      console.error('Create vendor error:', error);
      return res.status(500).json({ 
        error: 'Failed to create vendor', 
        details: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
