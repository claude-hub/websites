import type { Metadata } from "next";
import "./globals.css";
import { GTM } from "@mono/components";

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
        <GTM.GTMScript gtmId={gtmId} />
      </head>

      <body>
        <GTM.GTMNoscript gtmId={gtmId} />
        {children}
      </body>
    </html>
  );
}
