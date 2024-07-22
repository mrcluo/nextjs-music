"use client";

import React, { memo, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LazyLoad, { forceCheck } from "react-lazyload";
import Scroll from "@/components/scroll";
import musicImg from "@/assets/music.png";
import { changeSingerList } from "@/store/slices/singers";
import { ListContainer, List, ListItem } from "../style";

function Main(props) {
  const scrollRef = useRef(null);
  const data = useSelector((state) => state.singers.singerDes);
  const { singerList, songsCount = 0 } = data;
  const { initSingerList } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeSingerList(initSingerList));
  }, [initSingerList]);

  const pullUp = () => {
    console.log("到底部了");
  };
  const pullDown = () => {
    console.log("到顶部了");
  };

  const enterDetail = (id) => {
    console.log("🚀 ~ enterDetail ~ id:", id);
    // props.history.push(`/singers/${id}`);
  };

  const renderSingerList = () => {
    return (
      <List>
        {singerList.map((item, index) => {
          return (
            <ListItem
              key={item.accountId + "" + index}
              onClick={() => enterDetail(item.id)}
            >
              <div className="img_wrapper">
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
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };
  return (
    <ListContainer play={songsCount}>
      <Scroll
        direction={"vertical"}
        onScroll={forceCheck}
        pullUp={pullUp}
        pullDown={pullDown}
        refresh={true}
        ref={scrollRef}
      >
        {renderSingerList()}
      </Scroll>
    </ListContainer>
  );
}

export default memo(Main);
