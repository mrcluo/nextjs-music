"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { CSSTransition } from "react-transition-group";
import Loading from "@/components/loading";
import Scroll from "@/components/scroll";
import useGetSingerSongs from "@/hooks/useGetSingerSongs";
import Header from "../components/header";
import SongsList from "../components/songList";
import { Container, CollectButton, SongListWrapper, ImgWrapper } from "./style";
import { EnterLoading } from "../style";

function Singer() {
  const route = useParams();
  const [showStatus, setShowStatus] = useState(true);
  const { data = {}, isLoading } = useGetSingerSongs(route?.id);
  const ImgWrapperRef = useRef();
  const CollectButtonRef = useRef();
  const SongScrollWrapperRef = useRef();
  const ScrollRef = useRef();
  const HeaderRef = useRef();
  const InitialHeight = useRef(0);

  const OFFSET = 5;
  const HEADER_HEIGHT = 45;

  useEffect(() => {
    let h = ImgWrapperRef.current.offsetHeight;
    InitialHeight.current = h;
    SongScrollWrapperRef.current.style.top = `${h - OFFSET}px`;
    ScrollRef.current.refresh();
  }, []);

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = (pos) => {
    let height = InitialHeight.current;
    const newY = pos.y;
    const imageDOM = ImgWrapperRef.current;
    const buttonDOM = CollectButtonRef.current;
    const headerDOM = HeaderRef.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    const percent = Math.abs(newY / height);
    //说明: 在歌手页的布局中，歌单列表其实是没有自己的背景的，layerDOM其实是起一个遮罩的作用，给歌单内容提供白色背景
    //因此在处理的过程中，随着内容的滚动，遮罩也跟着移动
    if (newY > 0) {
      //处理往下拉的情况,效果：图片放大，按钮跟着偏移
      imageDOM.style["transform"] = `scale(${1 + percent})`;
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
    } else if (newY >= minScrollY) {
      //往上滑动，但是还没超过Header部分
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      //防止溢出的歌单内容遮住Header
      headerDOM.style.zIndex = 100;
      //此时图片高度与Header一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
    >
      <Container>
        <Header
          ref={HeaderRef}
          handleClick={setShowStatusFalse}
          title={data?.artist?.name}
        />
        <ImgWrapper ref={ImgWrapperRef} bgurl={data?.artist?.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={CollectButtonRef}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text">收藏</span>
        </CollectButton>
        <SongListWrapper
          ref={SongScrollWrapperRef}
          play={data?.hotSongs?.length}
        >
          <Scroll
            direction={"vertical"}
            refresh={true}
            ref={ScrollRef}
            onScroll={handleScroll}
          >
            <SongsList songs={data?.hotSongs} />
          </Scroll>
        </SongListWrapper>
        {isLoading ? (
          <EnterLoading style={{ zIndex: 100 }}>
            <Loading />
          </EnterLoading>
        ) : null}
      </Container>
    </CSSTransition>
  );
}

export default Singer;
