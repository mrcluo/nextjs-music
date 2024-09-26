"use client";

import React, { useRef, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import ProgressCircle from "@/components/progress-circle";
import SvgIcon from "@/components/svg-icon";
import { getName } from "@/utils";
import { MiniPlayerContainer } from "./style";
function MiniPlayer(props) {
  const { full, song, playing, percent } = props;
  const { clickPlaying, togglePlayList } = props;

  const miniPlayerRef = useRef();
  const miniWrapperRef = useRef();
  const miniImageRef = useRef();

  const handleTogglePlayList = useCallback(
    (e) => {
      togglePlayList(true);
      e.stopPropagation();
    },
    [togglePlayList]
  );

  return (
    <CSSTransition
      in={!full}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        miniPlayerRef.current.style.display = "flex";
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = "none";
      }}
    >
      <MiniPlayerContainer ref={miniPlayerRef}>
        <div className="icon">
          <div className="imgWrapper" ref={miniWrapperRef}>
            <img
              className={`play ${playing ? "" : "pause"}`}
              ref={miniImageRef}
              src={song.al.picUrl}
              width="40"
              height="40"
              alt="img"
            />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            {playing ? (
              <i
                className="icon-mini iconfont icon-pause"
                onClick={(e) => clickPlaying(e, false)}
              >
                <SvgIcon iconClass="icon-zanting" />
              </i>
            ) : (
              <i
                className="icon-mini iconfont icon-play"
                onClick={(e) => clickPlaying(e, true)}
              >
                <SvgIcon iconClass="icon-bofang" />
              </i>
            )}
          </ProgressCircle>
        </div>
        <div className="control" onClick={handleTogglePlayList}>
          <SvgIcon svgClass="iconfont" iconClass="icon-shengyin_yinlecaidan" />
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
}
export default React.memo(MiniPlayer);
