import { PrismaClient } from '@prisma/client';
const prismacl=new PrismaClient({
    adapter: { provider: "mongodb" }, 
});
export default prismacl;