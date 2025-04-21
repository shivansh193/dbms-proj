import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Valid vendor ID is required' });
  }
  
  const vendorId = Number(id);
  
  // GET: Fetch a specific vendor with their stores
  if (req.method === 'GET') {
    try {
      const vendor = await prisma.vendor.findUnique({
        where: { id: vendorId },
        include: {
          stores: true
        }
      });
      
      if (!vendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
      
      return res.status(200).json({ vendor });
    } catch (error: any) {
      console.error('Vendor fetch error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch vendor', 
        details: error.message 
      });
    }
  }
  
  // PUT: Update a vendor
  else if (req.method === 'PUT') {
    try {
      const { businessName, storeProfile, contactInfo } = req.body;
      
      // Check if vendor exists
      const existingVendor = await prisma.vendor.findUnique({
        where: { id: vendorId }
      });
      
      if (!existingVendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
      
      // Update the vendor
      const vendor = await prisma.vendor.update({
        where: { id: vendorId },
        data: {
          businessName,
          storeProfile,
          contactInfo
        }
      });
      
      return res.status(200).json({ vendor });
    } catch (error: any) {
      console.error('Update vendor error:', error);
      return res.status(500).json({ 
        error: 'Failed to update vendor', 
        details: error.message 
      });
    }
  }
  
  // DELETE: Delete a vendor
  else if (req.method === 'DELETE') {
    try {
      // Check if vendor exists
      const existingVendor = await prisma.vendor.findUnique({
        where: { id: vendorId },
        include: {
          stores: {
            include: {
              products: true
            }
          }
        }
      });
      
      if (!existingVendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
      
      // Delete all related data in a transaction
      await prisma.$transaction(async (tx) => {
        // Delete all products for each store
        for (const store of existingVendor.stores) {
          // Delete all cart items that reference these products
          for (const product of store.products) {
            await tx.cartItem.deleteMany({
              where: { productId: product.id }
            });
            
            // Delete all order details that reference these products
            await tx.orderDetail.deleteMany({
              where: { productId: product.id }
            });
            
            // Delete all reviews for these products
            await tx.review.deleteMany({
              where: { productId: product.id }
            });
          }
          
          // Delete all products for this store
          await tx.product.deleteMany({
            where: { storeId: store.id }
          });
        }
        
        // Delete all stores for this vendor
        await tx.store.deleteMany({
          where: { vendorId }
        });
        
        // Delete all payouts for this vendor
        await tx.vendorPayout.deleteMany({
          where: { vendorId }
        });
        
        // Finally, delete the vendor
        await tx.vendor.delete({
          where: { id: vendorId }
        });
      });
      
      return res.status(200).json({ message: 'Vendor and all related data deleted successfully' });
    } catch (error: any) {
      console.error('Delete vendor error:', error);
      return res.status(500).json({ 
        error: 'Failed to delete vendor', 
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
