"use client";
import { forceCheck } from "react-lazyload";
import Slider from "@/components/slider";
import Scroll from "@/components/scroll";
import RecommendList from "../components/recommendList";
export default function Main(props) {
  const { bannerList, recommendList } = props;
  const pullUp = () => {
    console.log("到底部了");
  };
  const pullDown = () => {
    console.log("到顶部了");
  };
  return (
    <Scroll
      className="list"
      direction="vertical"
      pullUp={pullUp}
      pullDown={pullDown}
      onScroll={forceCheck}
    >
      <div>
        <Slider bannerList={bannerList} />
        <RecommendList recommendList={recommendList} />
      </div>
    </Scroll>
  );
}
