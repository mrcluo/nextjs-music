import { configureStore } from "@reduxjs/toolkit";
import singers from "./slices/singers";
import songs from "./slices/songs";

const store = configureStore({
  reducer: {
    singers,
    songs,
  },
});
export default store;
