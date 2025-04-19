import { prisma } from '../db';

export async function updateProductInventory(productId: number, newQuantity: number) {
  try {
    // Use a transaction to ensure locks are properly managed
    const result = await prisma.$transaction(async (tx) => {
      // Call the stored procedure via raw query
      await tx.$executeRaw`CALL update_inventory(${productId}, ${newQuantity})`;
      
      // Return the updated product
      return tx.product.findUnique({
        where: { id: productId },
        select: { id: true, name: true, stock: true }
      });
    });
    
    return result;
  } catch (error) {
    console.error('Failed to update inventory:', error);
    throw new Error('Could not update inventory. The item may be locked by another transaction.');
  }
}