import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({ src: "../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2", variable: "--font-sans", display: "swap", weight: "100 900" });
const mono = localFont({ src: "../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2", variable: "--font-code", display: "swap", weight: "100 900" });

export const metadata: Metadata = {
  title: "Hiroyuki Miyadera / Web & App Developer",
  description: "アイデアをWebアプリ、モバイルアプリ、ツールとして形にするDeveloper・Hiroyuki Miyaderaのプロダクトアーカイブ。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
