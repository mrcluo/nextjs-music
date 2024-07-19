import { createSlice } from "@reduxjs/toolkit";

export const SingersSlice = createSlice({
  name: "singers",
  initialState: {
    contact: "111",
    value: 0,
    singerDes: {
      category: "",
      alpha: "",
      singerList: [],
      enterLoading: true,
      pullUpLoading: false,
      pullDownLoading: false,
      listOffset: 0, // 请求列表的偏移不是page，是个数
    },
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
      // 并不是真正的改变状态值，因为它使用了 Immer 库
      // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
      // 不可变的状态
      state.value += 1;
    },
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    changeCategory: (state, action) => {
      state.singerDes = { ...state.singerDes, category: action.payload };
    },
    changeSingerList: (state, action) => {
      console.log("🚀 ~ action:", action);
      state.singerDes = { ...state.singerDes, singerList: action.payload };
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { increment, setContact, changeCategory, changeSingerList } =
  SingersSlice.actions;
export default SingersSlice.reducer;
