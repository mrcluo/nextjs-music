// 不想用require 所以文件后缀为.ts
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
  } & typeof global;

// 单例模式，避免dev环境频繁创建 new PrismaClient()
const prisma = globalThis?.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export default prisma

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }
// export default prisma;
