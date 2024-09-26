import { API_BASE_URL } from "@/api/config";
import Main from "./components/main";

export default async function Rank() {
  const getData = async () => {
    const res = await fetch(`${API_BASE_URL}/toplist/detail`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };
  const data = await getData();
  return <Main rankList={data?.list || []} loading={!!data?.list.length} />;
}
