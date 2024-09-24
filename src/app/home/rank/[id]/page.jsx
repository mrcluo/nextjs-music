"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { CSSTransition } from "react-transition-group";
import Loading from "@/components/loading";
import Scroll from "@/components/scroll";
import SvgIcon from "@/components/svg-icon";
import useGetAlbums from "@/hooks/useGetAlbums";
import Header from "@/components/header";
import style from "@/assets/global-style";
import SongsList from "../../singer/components/songList";
import { EnterLoading } from "../../singer/style";
import { Container, SongListWrapper, TopDesc } from "./style";

function Rank() {
  const route = useParams();
  const router = useRouter();
  const [showStatus, setShowStatus] = useState(true);
  const { data = {}, isLoading } = useGetAlbums(route?.id);
  const ImgWrapperRef = useRef();
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
    const headerDOM = HeaderRef.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;
    const percent = Math.abs(pos.y / minScrollY);
    if (newY < minScrollY) {
      //防止溢出的歌单内容遮住Header
      headerDOM.style.zIndex = 100;
      headerDOM.style.backgroundColor = style["theme-color"];
      headerDOM.style.opacity = Math.min(1, percent - 1);
    } else {
      headerDOM.style.backgroundColor = "";
      headerDOM.style.opacity = 1;
    }
  };

  const renderTopDesc = () => {
    return (
      <TopDesc ref={ImgWrapperRef} background={data?.playlist?.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={data?.playlist?.coverImgUrl} alt="" />
          <div className="play_count">
            <SvgIcon svgClass={"play"} iconClass={"icon-24gl-headphones"} />
            <span className="count">
              {Math.floor(data?.playlist?.subscribedCount / 1000) / 10}万
            </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{data?.playlist?.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={data?.playlist?.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{data?.playlist?.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    );
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => router.back()}
    >
      <Container>
        <Header ref={HeaderRef} handleClick={setShowStatusFalse} title="歌单" />
        {renderTopDesc()}
        <SongListWrapper
          ref={SongScrollWrapperRef}
          play={data?.playlist?.tracks.length}
        >
          <Scroll
            direction={"vertical"}
            refresh={true}
            ref={ScrollRef}
            onScroll={handleScroll}
          >
            <SongsList songs={data?.playlist?.tracks} />
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

export default Rank;
