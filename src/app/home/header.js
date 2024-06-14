'use client'
import React from "react";
import { Top, Tab, TabItem } from "../HomeLayout.style";
import Link from 'next/link'

function Header(props) {
  const { route } = props;

  return (
    <div>
      <Top>
        <span
          className="iconfont menu"
          onClick={() => alert("用户中心正在开发中，敬请期待:)")}
        >
          &#xe65c;
        </span>
        <span className="title">云音悦</span>
        <span
          className="iconfont search"
          onClick={() => props.history.push("/search")}
        >
          &#xe62b;
        </span>
      </Top>
      <Tab>
        <Link href="/recommend" >
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </Link>
        <Link href="/singers" >
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </Link>
        <Link href="/rank" >
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </Link>
      </Tab>
    </div>
  );
}

export default React.memo(Header);
