import prisma from "@/lib/db";

export default async function Mine() {
  const data = await prisma.user.findMany();
  console.log(222222, data);
  return (
    <div>
      <h1>Mine Page</h1>
    </div>
  );
}
