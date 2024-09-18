"use client";

import React, { useRef, useState, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import Scroll from "@/components/scroll";
import Confirm from "@/components/confirm";
import { shuffle, findIndex, getName } from "@/utils";
import { playMode } from "@/api/config";
import {
  changeShowPlayList,
  changePlayList,
  changeCurrentIndex,
  changePlayMode,
} from "@/store/slices/songs";
import {
  PlayListWrapper,
  ListHeader,
  ListContent,
  ScrollWrapper,
} from "./style";
function PlayList() {
  const dispatch = useDispatch();
  const _states = useSelector((state) => state.songs);
  let {
    mode,
    sequencePlayList = [],
    currentIndex,
    playList = [],
    currentSong = {},
    showPlayList,
  } = _states;

  const listContentRef = useRef();
  const listWrapperRef = useRef();
  const playListRef = useRef();
  const confirmRef = useRef();

  const [isShow, setIsShow] = useState(false);

  const onEnterCB = useCallback(() => {
    setIsShow(true);
    listWrapperRef.current.style["transform"] = `translate3d(0, 100%, 0)`;
  }, []);

  const onEnteringCB = useCallback(() => {
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style["transform"] = `translate3d(0, 0, 0)`;
  }, []);

  const onExitCB = useCallback(() => {
    listWrapperRef.current.style["transform"] = `translate3d(0, 0px, 0)`;
  }, []);

  const onExitingCB = useCallback(() => {
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style["transform"] = `translate3d(0px, 100%, 0px)`;
  }, []);

  const onExitedCB = useCallback(() => {
    setIsShow(false);
    listWrapperRef.current.style["transform"] = `translate3d(0px, 100%, 0px)`;
  }, []);

  const changeMode = (e) => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      dispatch(changePlayList(sequencePlayList));
      let index = findIndex(currentSong, sequencePlayList);
      dispatch(changeCurrentIndex(index));
    } else if (newMode === 1) {
      dispatch(changePlayList(sequencePlayList));
    } else if (newMode === 2) {
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      dispatch(changePlayList(newList));
      dispatch(changeCurrentIndex(index));
    }
    dispatch(changePlayMode(newMode));
  };

  const getPlayMode = () => {
    let content, text;
    if (mode === playMode.sequence) {
      content = "&#xe625;";
      text = "顺序播放";
    } else if (mode === playMode.loop) {
      content = "&#xe653;";
      text = "单曲循环";
    } else {
      content = "&#xe61b;";
      text = "随机播放";
    }
    return (
      <div>
        <i
          className="iconfont"
          onClick={(e) => changeMode(e)}
          dangerouslySetInnerHTML={{ __html: content }}
        ></i>
        <span className="text" onClick={(e) => changeMode(e)}>
          {text}
        </span>
      </div>
    );
  };

  const togglePlayListDispatch = (status) => {
    dispatch(changeShowPlayList(status));
  };

  const handleShowClear = () => {
    confirmRef.current.show();
  };

  const handleConfirmClear = () => {
    // clearDispatch();
    // // 修复清空播放列表后点击同样的歌曲，播放器不出现的bug
    // clearPreSong();
  };

  const getFavoriteIcon = (item) => {
    return <i className="iconfont">&#xe601;</i>;
  };

  const getCurrentIcon = (item) => {
    const current = currentSong.id === item.id;
    const className = current ? "icon-play" : "";
    const content = current ? "&#xe6e3;" : "";
    return (
      <i
        className={`current iconfont ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      ></i>
    );
  };

  const handleScroll = (pos) => {};

  const handleChangeCurrentIndex = (index) => {
    if (currentIndex === index) return;
    dispatch(changeCurrentIndex(index));
  };

  const handleDeleteSong = (e, song) => {
    e.stopPropagation();
    // deleteSongDispatch(song);
  };

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExit={onExitCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <PlayListWrapper
        ref={playListRef}
        style={isShow === true ? { display: "block" } : { display: "none" }}
        onClick={() => togglePlayListDispatch(false)}
      >
        <div
          className="list_wrapper"
          ref={listWrapperRef}
          onClick={(e) => e.stopPropagation()}
        >
          <ListHeader>
            <h1 className="title">
              {getPlayMode()}
              {/* <span className="iconfont clear" onClick={handleShowClear}>
                &#xe63d;
              </span> */}
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll
              ref={listContentRef}
              direction={"vertical"}
              refresh={true}
              onScroll={(pos) => handleScroll(pos)}
              bounceTop={false}
            >
              <ListContent>
                {playList.map((item, index) => {
                  return (
                    <li
                      className="item"
                      key={item.id}
                      onClick={() => handleChangeCurrentIndex(index)}
                    >
                      {getCurrentIcon(item)}
                      <span className="text">
                        {item.name} - {getName(item.ar)}
                      </span>
                      {/* <span className="like">{getFavoriteIcon(item)}</span> */}
                      {/* <span
                        className="delete"
                        onClick={(e) => handleDeleteSong(e, item)}
                      >
                        <i className="iconfont">&#xe63d;</i>
                      </span> */}
                    </li>
                  );
                })}
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
        <Confirm
          ref={confirmRef}
          text={"是否删除全部?"}
          cancelBtnText={"取消"}
          confirmBtnText={"确定"}
          handleConfirm={handleConfirmClear}
        ></Confirm>
      </PlayListWrapper>
    </CSSTransition>
  );
}
export default React.memo(PlayList);
