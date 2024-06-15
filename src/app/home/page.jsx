"use client";
import Slider from "@/components/slider";
import { Content } from "./style";
export default function Recommend(props) {
  const { songsCount = 0 } = props;
  return (
    <Content play={songsCount}>
      <Slider bannerList={[]} />
    </Content>
  );
}
