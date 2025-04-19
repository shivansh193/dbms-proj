import { prisma } from '../lib/db';

export async function getCachedValue(key: string) {
  const result = await prisma.$queryRaw`SELECT cache_get(${key})`;
  // The function returns null if not found or expired
  return result[0]?.cache_get;
}

export async function setCachedValue(key: string, value: any, ttlSeconds: number = 3600) {
  // Convert value to JSON string for storage
  const jsonValue = JSON.stringify(value);
  
  await prisma.$executeRaw`SELECT cache_set(${key}, ${jsonValue}::jsonb, ${ttlSeconds})`;
}

// Optional: Function to clear cache
export async function clearCache(keyPattern?: string) {
  if (keyPattern) {
    await prisma.$executeRaw`DELETE FROM cache WHERE key LIKE ${`%${keyPattern}%`}`;
  } else {
    await prisma.$executeRaw`DELETE FROM cache`;
  }
}

// Setup a periodic cache cleanup job (can be moved to a separate file/cron job)
export function setupCacheCleanup() {
  // Clean expired cache entries every hour
  setInterval(async () => {
    await prisma.$executeRaw`DELETE FROM cache WHERE expires_at < NOW()`;
  }, 3600000); // 1 hour
}