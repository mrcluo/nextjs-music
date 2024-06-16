"use client";
import Slider from "@/components/slider";
import { Content } from "./style";
import useSWR from "swr";
export default function Recommend(props) {
  const { songsCount = 0 } = props;
  // const getData = async () => {
  //   const res = await fetch("http://localhost:3100/banner");
  //   // console.log(res);
  //   // The return value is *not* serialized
  //   // You can return Date, Map, Set, etc.

  //   if (!res.ok) {
  //     // This will activate the closest `error.js` Error Boundary
  //     throw new Error("Failed to fetch data");
  //   }

  //   return res.json();
  // };
  // const data = await getData();
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data } = useSWR("http://localhost:3100/banner", fetcher);
  console.log(data);
  return (
    <Content play={songsCount}>
      <Slider bannerList={data?.banners || []} />
    </Content>
  );
}
