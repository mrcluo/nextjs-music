"use client";

import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoryTypes, alphaTypes } from "@/api/config";
import { changeCategory } from "@/store/slices/singers";
import { NavContainer } from "../style";
import Horizen from "./horizen-item";
function TopHeader() {
  const data = useSelector((state) => state.singers.singerDes);
  const dispatch = useDispatch();
  const { category, alpha } = data;

  const handleUpdateCategory = (newVal) => {
    if (category === newVal) return;
    dispatch(changeCategory(newVal));
    // dispatch(getSingerList());
    // scrollRef.current.refresh();
  };

  const handleUpdateAlpha = (newVal) => {
    if (alpha === newVal) return;
    // dispatch(changeAlpha(newVal));
    // dispatch(getSingerList());
    // scrollRef.current.refresh();
  };
  return (
    <NavContainer>
      <Horizen
        title={"分类(默认热门):"}
        list={categoryTypes}
        handleClick={(v) => handleUpdateCategory(v)}
        oldVal={category}
      ></Horizen>
      <Horizen
        title={"首字母:"}
        list={alphaTypes}
        handleClick={(v) => handleUpdateAlpha(v)}
        oldVal={alpha}
      ></Horizen>
    </NavContainer>
  );
}
export default memo(TopHeader);
