const capabilities = [
  ["Web Apps", "React / Next.js / TypeScript", "情報設計からフロントエンド、データ連携まで。使い続けられるWebサービスをつくります。"],
  ["Mobile Apps", "Flutter / Swift / SwiftUI", "迷わず使えるモバイルアプリ。端末らしい操作感と速度を大切にします。"],
  ["Tools", "Firebase / Supabase / Node.js", "繰り返し作業や身近な不便を、必要十分な小さな道具で解決します。"],
  ["Experiments", "Prototype / WebRTC / AI", "新しい技術を短期間で試し、可能性と課題を触って分かる形にします。"],
];
export function WhatIBuild() { return <section className="build-section" id="capabilities" aria-labelledby="build-title"><div className="section-shell"><div className="build-heading"><h2 id="build-title">What I build</h2><p>技術は目的ではなく、アイデアを機能させるための材料です。</p></div><div className="build-list">{capabilities.map(([title,stack,body]) => <article key={title}><div><h3>{title}</h3><small>{stack}</small></div><p>{body}</p></article>)}</div></div></section>; }
