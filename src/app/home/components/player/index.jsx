"use client";

import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmptyObject, getSongUrl } from "@/utils";
import Toast from "@/components/toast";
import {
  changeCurrentSong,
  changePlaying,
  changeShowPlayList,
} from "@/store/slices/songs";
import MiniPlayer from "../miniPlayer";
import PlayList from "../playList";

function Player() {
  const dispatch = useDispatch();
  const _states = useSelector((state) => state.songs);
  let {
    speed,
    playing,
    currentIndex,
    playList = [],
    currentSong = {},
  } = _states;

  const audioRef = useRef();
  const toastRef = useRef();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [preSong, setPreSong] = useState({});
  const [modeText, setModeText] = useState("");

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ currentIndex:", currentIndex);
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id
    )
      return;
    let current = playList[currentIndex];
    dispatch(changeCurrentSong(current));
    setPreSong(current); // 保存当前歌曲
    audioRef.current.src = getSongUrl(current.id);
    audioRef.current.autoplay = true;
    audioRef.current.playbackRate = speed;
    dispatch(changePlaying(true));
    setCurrentTime(0);
    setDuration((current.dt / 1000) | 0); // 设置歌曲时长
  }, [currentIndex, playList]);
  const clickPlaying = (e, state) => {
    e.stopPropagation();
    dispatch(changePlaying(state));
  };

  const togglePlayListDispatch = (data) => {
    dispatch(changeShowPlayList(data));
  };

  const updateTime = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const handleEnd = () => {};
  const handleError = () => {};

  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <MiniPlayer
          playing={playing}
          song={currentSong}
          percent={percent}
          clickPlaying={clickPlaying}
          togglePlayList={togglePlayListDispatch}
        ></MiniPlayer>
      )}

      <PlayList clearPreSong={setPreSong.bind(null, {})}></PlayList>
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
        onError={handleError}
      ></audio>
      <Toast text={modeText} ref={toastRef}></Toast>
    </div>
  );
}
export default React.memo(Player);
