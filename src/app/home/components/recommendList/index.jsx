"use client";

import React from "react";
import LazyLoad from "react-lazyload";
import Link from "next/link";
import SvgIcon from "@/components/svg-icon";
import musicImg from "@/assets/music.png";
import { ListWrapper, ListItem, List } from "./style";

function RecommendList(props) {
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {props.recommendList.map((item) => {
          return (
            <ListItem key={item.id}>
              <Link href={`/home/rank/${item.id}`}>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  <LazyLoad
                    placeholder={
                      <img
                        width="100%"
                        height="100%"
                        src={musicImg.src}
                        alt="music"
                      />
                    }
                  >
                    <img
                      src={item.picUrl + "?param=300x300"}
                      width="100%"
                      height="100%"
                      alt="music"
                    />
                  </LazyLoad>
                  <div className="play_count">
                    <SvgIcon iconClass={"icon-24gl-headphones"} />
                    <span className="count">
                      {Math.floor(item.playCount / 10000)}万
                    </span>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </ListWrapper>
  );
}

export default React.memo(RecommendList);
