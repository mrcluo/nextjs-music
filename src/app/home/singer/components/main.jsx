"use client";

import React, { memo, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LazyLoad, { forceCheck } from "react-lazyload";
import Scroll from "@/components/scroll";
import musicImg from "@/assets/music.png";
import Loading from "@/components/loading";
import {
  changeSingerList,
  changePullDownLoading,
  changePullUpLoading,
} from "@/store/slices/singers";
import useSingerMutation from "@/hooks/useSingerMutation";
import { ListContainer, List, ListItem, EnterLoading } from "../style";

function Main(props) {
  const scrollRef = useRef(null);
  const data = useSelector((state) => state.singers.singerDes);
  const {
    songsCount = 0,
    singerList,
    pullUpLoading,
    pullDownLoading,
    enterLoading,
    category,
    alpha,
    listOffset,
  } = data;
  const { initSingerList } = props;
  const dispatch = useDispatch();
  const { changeSinger, loadMoreSinger } = useSingerMutation();

  useEffect(() => {
    dispatch(changeSingerList(initSingerList));
  }, [initSingerList]);

  const pullUp = () => {
    console.log("到底部了");
    dispatch(changePullUpLoading(true));
    loadMoreSinger(category, alpha, listOffset);
  };
  const pullDown = () => {
    console.log("到顶部了");
    dispatch(changePullDownLoading(true));
    changeSinger(category, alpha, 0);
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
    <>
      <ListContainer play={songsCount}>
        <Scroll
          direction={"vertical"}
          refresh={true}
          ref={scrollRef}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
          pullUp={pullUp}
          pullDown={pullDown}
        >
          {renderSingerList()}
        </Scroll>
      </ListContainer>
      {enterLoading ? (
        <EnterLoading>
          <Loading></Loading>
        </EnterLoading>
      ) : null}
    </>
  );
}

export default memo(Main);
