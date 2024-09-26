"use client";
import React, { useEffect, useState } from "react";
import { forceCheck } from "react-lazyload";
import Slider from "@/components/slider";
import Scroll from "@/components/scroll";
import Loading from "@/components/loading";
import { EnterLoading } from "../singer/style";
import RecommendList from "../components/recommendList";
export default function Main(props) {
  const { bannerList, recommendList } = props;
  const [enterLoading, setEnterLoading] = useState(true);

  useEffect(() => {
    setEnterLoading(false);
  }, recommendList);
  const pullUp = () => {
    console.log("到底部了");
  };
  const pullDown = () => {
    console.log("到顶部了");
  };

  return (
    <>
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
      {enterLoading ? (
        <EnterLoading>
          <Loading></Loading>
        </EnterLoading>
      ) : null}
    </>
  );
}
