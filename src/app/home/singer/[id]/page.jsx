"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Loading from "@/components/loading";
import Scroll from "@/components/scroll";
import useGetSingerSongs from "@/hooks/useGetSingerSongs";
import Header from "../components/header";
import SongsList from "../components/songList";
import {
  Container,
  ImgWrapper,
  CollectButton,
  BgLayer,
  SongListWrapper,
} from "./style";
import { EnterLoading } from "../style";

function Singer() {
  const [showStatus, setShowStatus] = useState(true);
  const { data, isLoading } = useGetSingerSongs(2116);
  console.log("🚀 ~ Singer ~ data:", data);
  const { artist = {}, hotSongs = [] } = data || {};

  const OFFSET = 5;

  const initialHeight = useRef(0);
  const imageWrapper = useRef();
  const collectButton = useRef();
  const layer = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();

  useEffect(() => {
    let h = imageWrapper.current.offsetHeight;
    initialHeight.current = h;
    songScrollWrapper.current.style.top = `${h - OFFSET}px`;
    layer.current.style.top = `${h - OFFSET}px`;
    // songScroll.current.refresh();
  }, []);

  // 加了useCallback, Header不会重新渲染
  const handleClick = useCallback(() => {
    setShowStatus(false);
  }, []);
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
    >
      <Container>
        <Header handleClick={handleClick} title={artist?.name} />
        <ImgWrapper ref={imageWrapper} bgurl={artist?.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text">收藏</span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll direction={"vertical"} refresh={true} ref={songScroll}>
            <SongsList
              songs={hotSongs}
              showCollect={false}
              usePageSplit={false}
            ></SongsList>
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
