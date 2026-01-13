import { PrismaClient } from "@prisma/client";

// Pass your DATABASE_URL here
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // required in Prisma 7
    },
  },
});

export default prisma;
