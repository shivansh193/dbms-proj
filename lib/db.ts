import { PrismaClient } from '@prisma/client';

// Singleton pattern to avoid multiple connections in development
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}