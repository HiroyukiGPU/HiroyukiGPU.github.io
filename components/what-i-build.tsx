const capabilities = [
  ["01", "Web Apps", "React / Next.js / TypeScript", "Webサービス、管理画面、リアルタイムに動く業務ツール。情報設計からフロントエンド、データ連携まで一貫して開発します。"],
  ["02", "Mobile Apps", "Flutter / Swift / SwiftUI", "日常の中で迷わず使えるiOS・スマートフォン向けアプリ。端末らしい操作感と速度を大切にします。"],
  ["03", "Tools", "Firebase / Supabase / Node.js", "繰り返し作業や身近な不便を小さく解決する道具。必要な機能に絞り、すぐ使える形へ落とし込みます。"],
  ["04", "Experiments", "Prototype / WebRTC / AI", "新しい技術やアイデアを短期間で試し、可能性と課題が触って分かるプロトタイプにします。"],
];
export function WhatIBuild() { return <section className="build-section" id="capabilities" aria-labelledby="build-title"><div className="section-shell"><div className="section-heading build-heading"><span>03</span><h2 id="build-title">What I Build</h2><p>Technology is a means,<br/>not the headline.</p></div><div className="build-list">{capabilities.map(([number,title,stack,body]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><small>{stack}</small></div><p>{body}</p></article>)}</div></div></section>; }
