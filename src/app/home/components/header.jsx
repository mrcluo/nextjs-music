"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SvgIcon from "@/components/svg-icon";
import { Top, Tab, TabItem } from "../../HomeLayout.style";

function Header() {
  const pathName = usePathname();
  const pathCheck = (path) => {
    const reg = new RegExp(`/(${path})$`);
    return reg.test(pathName) ? "selected" : "";
  };
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
            <span className={pathCheck("home")}>推荐</span>
          </TabItem>
        </Link>
        <Link href="/home/singer">
          <TabItem>
            <span className={pathCheck("singer")}>歌手</span>
          </TabItem>
        </Link>
        <Link href="/home/rank">
          <TabItem>
            <span className={pathCheck("rank")}>排行榜</span>
          </TabItem>
        </Link>
      </Tab>
    </div>
  );
}

export default React.memo(Header);
