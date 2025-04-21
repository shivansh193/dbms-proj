import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET: Fetch payouts for a vendor
  if (req.method === 'GET') {
    try {
      const { vendorId } = req.query;
      
      if (!vendorId) {
        return res.status(400).json({ error: 'Vendor ID is required' });
      }
      
      // Check if vendor exists
      const vendor = await prisma.vendor.findUnique({
        where: { id: Number(vendorId) }
      });
      
      if (!vendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
      
      // Get payouts with pagination
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      const payouts = await prisma.vendorPayout.findMany({
        where: { vendorId: Number(vendorId) },
        skip,
        take: limit,
        orderBy: { payoutDate: 'desc' }
      });
      
      const total = await prisma.vendorPayout.count({
        where: { vendorId: Number(vendorId) }
      });
      
      // Get total payout amount
      const totalAmountResult = await prisma.vendorPayout.aggregate({
        where: { vendorId: Number(vendorId) },
        _sum: {
          amount: true
        }
      });
      
      return res.status(200).json({
        payouts,
        totalAmount: totalAmountResult._sum.amount || 0,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          page,
          limit
        }
      });
    } catch (error: any) {
      console.error('Payouts fetch error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch payouts', 
        details: error.message 
      });
    }
  }
  
  // POST: Create a new payout
  else if (req.method === 'POST') {
    try {
      const { vendorId, amount, paymentMethod } = req.body;
      
      // Validate required fields
      if (!vendorId || !amount) {
        return res.status(400).json({ error: 'Vendor ID and amount are required' });
      }
      
      // Check if vendor exists
      const vendor = await prisma.vendor.findUnique({
        where: { id: Number(vendorId) }
      });
      
      if (!vendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
      
      // Create the payout
      const payout = await prisma.vendorPayout.create({
        data: {
          vendorId: Number(vendorId),
          amount: Number(amount),
          paymentMethod,
          payoutDate: new Date()
        }
      });
      
      return res.status(201).json({ payout });
    } catch (error: any) {
      console.error('Create payout error:', error);
      return res.status(500).json({ 
        error: 'Failed to create payout', 
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
