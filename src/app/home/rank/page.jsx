import Main from "./components/main";

export default async function Rank() {
  const getData = async () => {
    const res = await fetch(`http://localhost:3100/toplist/detail`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };
  const data = await getData();
  return <Main rankList={data?.list || []} loading={!!data?.list.length} />;
}
