import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hiroyuki Miyadera — Web / App Developer",
  description: "アイデアをWebアプリ、モバイルアプリ、ツールとして形にするDeveloper・Hiroyuki Miyaderaのプロダクトアーカイブ。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
