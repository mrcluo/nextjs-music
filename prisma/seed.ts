import { PrismaClient } from "@prisma/client";
// js用 const { PrismaClient } = require("@prisma/client");
// 初始化 Prisma Client
const prisma = new PrismaClient();

async function main() {
  //在此编写 Prisma Client 查询
  const user = await prisma.user.create({
    data: {
      name: "小马",
      avatar:
        "https://p3-passport.byteimg.com/img/user-avatar/585e1491713363bc8f67d06c485e8260~100x100.awebp",
    },
  });
  console.log(user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 关闭 Prisma Client
    await prisma.$disconnect();
  });
