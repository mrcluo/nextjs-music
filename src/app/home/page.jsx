import { API_BASE_URL } from "@/api/config";
import RecommendMain from "./recommend/main";
import { Content } from "./style";
export default async function Recommend(props) {
  const { songsCount = 0 } = props;
  const getData = async () => {
    const res = await fetch(`${API_BASE_URL}/banner`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };
  const getrecommendData = async () => {
    const res = await fetch(`${API_BASE_URL}/personalized`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };
  const bannerList = await getData();
  const recommendList = await getrecommendData();
  return (
    <Content play={songsCount}>
      <RecommendMain
        bannerList={bannerList?.banners || []}
        recommendList={recommendList?.result || []}
      />
    </Content>
  );
}
