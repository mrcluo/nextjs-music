import prisma from "@/lib/db";

export default async function Rank() {
  const data = await prisma.user.findMany();
  console.log(222222, data);
  return (
    <div>
      <h1>Rank Page</h1>
    </div>
  );
}
