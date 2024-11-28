import type { Metadata } from "next";
import "./globals.css";
import { GTM } from "@mono/components";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Game Search And Download",
  description: "search and download games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || ''; // 从环境变量中获取GTM ID

  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `console.log('单独的script gtm 加载之前', performance);` }}></script>
        <Script dangerouslySetInnerHTML={{ __html: `console.log('gtm 加载之前', performance);` }}></Script>
        <GTM.GTMScript gtmId={gtmId} />
        <script dangerouslySetInnerHTML={{ __html: `console.log('单独的script gtm 加载之后', performance);` }}></script>
        <Script dangerouslySetInnerHTML={{ __html: `console.log('gtm 加载之后', performance);` }}></Script>

      </head>

      <body>
        <GTM.GTMNoscript gtmId={gtmId} />
        {children}

        <Script dangerouslySetInnerHTML={{ __html: `console.log('body 里面的 script', performance);` }}></Script>
      </body>
    </html>
  );
}
