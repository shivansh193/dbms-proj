import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET: Fetch customers or a specific customer
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      
      if (id) {
        // Get a specific customer
        const customer = await prisma.customer.findUnique({
          where: { id: Number(id) },
          include: {
            orders: {
              orderBy: { orderDate: 'desc' },
              take: 5 // Include recent orders
            }
          }
        });
        
        if (!customer) {
          return res.status(404).json({ error: 'Customer not found' });
        }
        
        return res.status(200).json({ customer });
      } else {
        // Get all customers (with pagination)
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const customers = await prisma.customer.findMany({
          skip,
          take: limit,
          orderBy: { name: 'asc' }
        });
        
        const total = await prisma.customer.count();
        
        return res.status(200).json({ 
          customers,
          pagination: {
            total,
            pages: Math.ceil(total / limit),
            page,
            limit
          }
        });
      }
    } catch (error: any) {
      console.error('Customer fetch error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch customer(s)', 
        details: error.message 
      });
    }
  }
  
  // POST: Create a new customer
  else if (req.method === 'POST') {
    try {
      const { name, email, password, contactInfo } = req.body;
      
      // Validate required fields
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
      }
      
      // Check if email is already in use
      const existingCustomer = await prisma.customer.findUnique({
        where: { email }
      });
      
      if (existingCustomer) {
        return res.status(409).json({ error: 'Email already in use' });
      }
      
      // Create the customer
      const customer = await prisma.customer.create({
        data: {
          name,
          email,
          password, // In a real app, this would be hashed
          contactInfo
        }
      });
      
      return res.status(201).json({ customer });
    } catch (error: any) {
      console.error('Create customer error:', error);
      return res.status(500).json({ 
        error: 'Failed to create customer', 
        details: error.message 
      });
    }
  }
  
  // PUT: Update a customer
  else if (req.method === 'PUT') {
    try {
      const { id, name, email, contactInfo } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'Customer ID is required' });
      }
      
      // Check if customer exists
      const existingCustomer = await prisma.customer.findUnique({
        where: { id: Number(id) }
      });
      
      if (!existingCustomer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      
      // Update the customer
      const customer = await prisma.customer.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
          contactInfo
        }
      });
      
      return res.status(200).json({ customer });
    } catch (error: any) {
      console.error('Update customer error:', error);
      return res.status(500).json({ 
        error: 'Failed to update customer', 
        details: error.message 
      });
    }
  }
  
  // DELETE: Delete a customer
  else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Customer ID is required' });
      }
      
      // Check if customer exists
      const existingCustomer = await prisma.customer.findUnique({
        where: { id: Number(id) }
      });
      
      if (!existingCustomer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      
      // Delete the customer
      await prisma.customer.delete({
        where: { id: Number(id) }
      });
      
      return res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error: any) {
      console.error('Delete customer error:', error);
      return res.status(500).json({ 
        error: 'Failed to delete customer', 
        details: error.message 
      });
    }
  }
  
  // Method not allowed
  else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
