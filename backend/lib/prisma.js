import { PrismaClient } from "@prisma/client";

// Pass your DATABASE_URL here
// const prisma = new PrismaClient({
//   // datasources: {
//   //   db: {
//   //     url: process.env.DATABASE_URL, // required in Prisma 7
//   //   },
//   // },
//   datasourceUrl: process.env.DATABASE_URL,
// });

const prisma = new PrismaClient();
export default prisma;
