import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET: Fetch payments for an order
  if (req.method === 'GET') {
    try {
      const { orderId } = req.query;
      
      if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required' });
      }
      
      // Check if order exists
      const order = await prisma.order.findUnique({
        where: { id: Number(orderId) }
      });
      
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      // Get payments for the order
      const payments = await prisma.payment.findMany({
        where: { orderId: Number(orderId) },
        orderBy: { paymentDate: 'desc' }
      });
      
      return res.status(200).json({ payments });
    } catch (error: any) {
      console.error('Payments fetch error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch payments', 
        details: error.message 
      });
    }
  }
  
  // POST: Create a new payment
  else if (req.method === 'POST') {
    try {
      const { orderId, transactionId, paymentMethod, amount } = req.body;
      
      // Validate required fields
      if (!orderId || !paymentMethod || !amount) {
        return res.status(400).json({ error: 'Order ID, payment method, and amount are required' });
      }
      
      // Check if order exists
      const order = await prisma.order.findUnique({
        where: { id: Number(orderId) }
      });
      
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      // Create the payment
      const payment = await prisma.payment.create({
        data: {
          orderId: Number(orderId),
          transactionId,
          paymentMethod,
          paymentStatus: 'completed',
          amount: Number(amount),
          paymentDate: new Date()
        }
      });
      
      // Update order payment status
      await prisma.order.update({
        where: { id: Number(orderId) },
        data: { paymentStatus: 'paid' }
      });
      
      return res.status(201).json({ payment });
    } catch (error: any) {
      console.error('Create payment error:', error);
      return res.status(500).json({ 
        error: 'Failed to create payment', 
        details: error.message 
      });
    }
  }
  
  // PUT: Update a payment status
  else if (req.method === 'PUT') {
    try {
      const { id, paymentStatus, transactionId } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'Payment ID is required' });
      }
      
      // Check if payment exists
      const existingPayment = await prisma.payment.findUnique({
        where: { id: Number(id) }
      });
      
      if (!existingPayment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      
      // Update the payment
      const payment = await prisma.payment.update({
        where: { id: Number(id) },
        data: {
          paymentStatus,
          transactionId
        }
      });
      
      // If payment is completed, update order payment status
      if (paymentStatus === 'completed') {
        await prisma.order.update({
          where: { id: payment.orderId },
          data: { paymentStatus: 'paid' }
        });
      }
      
      return res.status(200).json({ payment });
    } catch (error: any) {
      console.error('Update payment error:', error);
      return res.status(500).json({ 
        error: 'Failed to update payment', 
        details: error.message 
      });
    }
  }
  
  // Method not allowed
  else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
