import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET: Fetch analytics for a vendor
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
      
      // Get all stores for this vendor
      const stores = await prisma.store.findMany({
        where: { vendorId: Number(vendorId) },
        select: { id: true }
      });
      
      const storeIds = stores.map(store => store.id);
      
      if (storeIds.length === 0) {
        return res.status(200).json({
          revenue: { total: 0, monthly: [] },
          orders: { total: 0, monthly: [] },
          products: { total: 0, topSelling: [] }
        });
      }
      
      // Get total revenue
      const revenueResult = await prisma.$queryRaw`
        SELECT SUM(od.quantity * od.unit_price) as total_revenue
        FROM order_detail od
        JOIN product p ON od.product_id = p.product_id
        WHERE p.store_id IN (${Prisma.join(storeIds)})
      `;
      
      const totalRevenue = revenueResult[0]?.total_revenue || 0;
      
      // Get monthly revenue for the past 6 months
      const monthlyRevenue = await prisma.$queryRaw`
        SELECT 
          DATE_TRUNC('month', o.order_date) as month,
          SUM(od.quantity * od.unit_price) as revenue
        FROM order_detail od
        JOIN orders o ON od.order_id = o.order_id
        JOIN product p ON od.product_id = p.product_id
        WHERE 
          p.store_id IN (${Prisma.join(storeIds)})
          AND o.order_date >= NOW() - INTERVAL '6 months'
        GROUP BY DATE_TRUNC('month', o.order_date)
        ORDER BY month DESC
      `;
      
      // Get total number of orders
      const orderCountResult = await prisma.$queryRaw`
        SELECT COUNT(DISTINCT od.order_id) as total_orders
        FROM order_detail od
        JOIN product p ON od.product_id = p.product_id
        WHERE p.store_id IN (${Prisma.join(storeIds)})
      `;
      
      const totalOrders = orderCountResult[0]?.total_orders || 0;
      
      // Get monthly order count for the past 6 months
      const monthlyOrders = await prisma.$queryRaw`
        SELECT 
          DATE_TRUNC('month', o.order_date) as month,
          COUNT(DISTINCT o.order_id) as order_count
        FROM orders o
        JOIN order_detail od ON o.order_id = od.order_id
        JOIN product p ON od.product_id = p.product_id
        WHERE 
          p.store_id IN (${Prisma.join(storeIds)})
          AND o.order_date >= NOW() - INTERVAL '6 months'
        GROUP BY DATE_TRUNC('month', o.order_date)
        ORDER BY month DESC
      `;
      
      // Get total number of products
      const productCount = await prisma.product.count({
        where: {
          storeId: {
            in: storeIds
          }
        }
      });
      
      // Get top selling products
      const topSellingProducts = await prisma.$queryRaw`
        SELECT 
          p.product_id,
          p.name,
          p.price,
          p.image_url,
          SUM(od.quantity) as total_sold
        FROM product p
        JOIN order_detail od ON p.product_id = od.product_id
        WHERE p.store_id IN (${Prisma.join(storeIds)})
        GROUP BY p.product_id, p.name, p.price, p.image_url
        ORDER BY total_sold DESC
        LIMIT 5
      `;
      
      return res.status(200).json({
        revenue: {
          total: totalRevenue,
          monthly: monthlyRevenue
        },
        orders: {
          total: totalOrders,
          monthly: monthlyOrders
        },
        products: {
          total: productCount,
          topSelling: topSellingProducts
        }
      });
    } catch (error: any) {
      console.error('Vendor analytics error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch vendor analytics', 
        details: error.message 
      });
    }
  }
  
  // Method not allowed
  else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
