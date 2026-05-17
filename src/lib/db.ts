import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaPool?: Pool;
};

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL fehlt. Bitte in .env setzen.");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  return { prisma, pool };
}

export const db =
  globalForPrisma.prisma ??
  (() => {
    const { prisma, pool } = createClient();
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prisma;
      globalForPrisma.prismaPool = pool;
    }
    return prisma;
  })();
