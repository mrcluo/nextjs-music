import { createSlice } from "@reduxjs/toolkit";
import { playMode } from "@/api/config";

export const SongsSlice = createSlice({
  name: "songs",
  initialState: {
    playing: false,
    playList: [],
    sequencePlayList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    showPlayList: false,
    currentSong: {},
    speed: 1,
  },
  reducers: {
    changeCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    changePlaying: (state, action) => {
      state.playing = action.payload;
    },
    changeShowPlayList: (state, action) => {
      state.showPlayList = action.payload;
    },
    changeSequencePlayList: (state, action) => {
      state.sequencePlayList = action.payload;
    },
    changePlayList: (state, action) => {
      state.playList = action.payload;
    },
    changeCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    changePlayMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const {
  changeCurrentSong,
  changePlayList,
  changeShowPlayList,
  changePlaying,
  changeCurrentIndex,
  changeSequencePlayList,
  changePlayMode,
} = SongsSlice.actions;
export default SongsSlice.reducer;
