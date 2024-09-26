import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import StyledComponentsRegistry from "./registry";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning用于在客户端与服务器端渲染（SSR）内容不一致时，抑制 hydration 过程中的警告。
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script
          defer={true}
          src={"http://at.alicdn.com/t/c/font_824912_i1b86ti0p3.js"}
        />
      </head>
      <body>
        <ReduxProvider>
          <Providers>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
