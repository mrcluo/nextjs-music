import TopHeader from "./components/top-header";
import Main from "./components/main";

export default async function Singer() {
  const getData = async (count = 1) => {
    const res = await fetch(
      `http://localhost:3100/top/artists?offset=${count}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };
  const data = await getData();
  return (
    <div>
      <TopHeader />
      <Main initSingerList={data?.artists || []} />
    </div>
  );
}
