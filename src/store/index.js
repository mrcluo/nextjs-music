import { configureStore } from "@reduxjs/toolkit";
import singers from "./slices/singers";

const store = configureStore({
  reducer: {
    singers,
  },
});
export default store;
