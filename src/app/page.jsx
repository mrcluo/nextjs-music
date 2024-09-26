"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);
  return <div>开屏动画</div>;
}

export default React.memo(Home);
