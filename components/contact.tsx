import { ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="section-shell">
        <span className="contact-label">04 / Contact</span>
        <h2>一緒に、いいものを<br/><em>つくりませんか。</em></h2>
        <p>新規開発、既存サービスの改善、まだ輪郭のないアイデアも。まずは気軽にお聞かせください。</p>
        <a className="contact-mail" href="mailto:miyadera.hiroyuki@gmail.com">miyadera.hiroyuki@gmail.com <ArrowUpRight aria-hidden="true" /></a>
        <div className="contact-bottom"><span>© 2026 Hiroyuki Miyadera</span><nav aria-label="ソーシャルリンク"><a href="https://github.com/HiroyukiGPU">GitHub <ArrowUpRight aria-hidden="true" /></a><a href="https://x.com/HiroyukiGPU">X <ArrowUpRight aria-hidden="true" /></a><a href="mailto:miyadera.hiroyuki@gmail.com">Email <ArrowUpRight aria-hidden="true" /></a></nav><a href="#main">Back to top ↑</a></div>
      </div>
    </footer>
  );
}
