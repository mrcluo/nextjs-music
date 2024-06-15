import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import StyledComponentsRegistry from "./registry";

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning用于在客户端与服务器端渲染（SSR）内容不一致时，抑制 hydration 过程中的警告。
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ReduxProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
