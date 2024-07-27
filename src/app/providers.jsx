"use client";
// 集成nextui

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
