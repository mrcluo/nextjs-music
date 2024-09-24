"use client";
import React from "react";
import Link from "next/link";
import SvgIcon from "@/components/svg-icon";
import { Top, Tab, TabItem } from "../../HomeLayout.style";

function Header() {
  return (
    <div>
      <Top>
        <span
          className="iconfont menu"
          onClick={() => alert("用户中心正在开发中，敬请期待:)")}
        >
          <SvgIcon iconClass={"icon-caidan"} />
        </span>
        <span className="title">云音悦</span>
        <span
          className="iconfont search"
          onClick={() => alert("用户中心正在开发中，敬请期待:)")}
        >
          <SvgIcon iconClass={"icon-sousuo2"} />
        </span>
      </Top>
      <Tab>
        <Link href="/home">
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </Link>
        <Link href="/home/singer">
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </Link>
        <Link href="/home/rank">
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </Link>
      </Tab>
    </div>
  );
}

export default React.memo(Header);
