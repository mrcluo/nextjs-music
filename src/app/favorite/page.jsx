"use client";
import { useSelector } from "react-redux";
export default function Home() {
  return (
    <div>
      <h1>Favorite Page</h1>
      <div>{useSelector((state) => state.singers.contact)}</div>
    </div>
  );
}
