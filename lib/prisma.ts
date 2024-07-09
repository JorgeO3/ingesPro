import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | undefined;

function getPrismaClient() {
  if (!prisma) {
    console.log('prisma client');
    prisma = new PrismaClient();
  }
  return prisma;
}

export default getPrismaClient();
