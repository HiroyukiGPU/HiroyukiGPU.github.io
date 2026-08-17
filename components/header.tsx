"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["Projects", "/projects"],
  ["About", "#about"],
  ["GitHub", "https://github.com/HiroyukiGPU"],
  ["Contact", "#contact"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="wordmark" href="#main" aria-label="ページ上部へ">HM<span>.</span></a>
      <nav className="desktop-nav" aria-label="メインナビゲーション">
        {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </nav>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "メニューを閉じる" : "メニューを開く"}>
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="モバイルナビゲーション">
          {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
      )}
    </header>
  );
}
