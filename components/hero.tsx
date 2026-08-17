import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function Hero() {
  return <section className="hero-new section-shell" aria-labelledby="hero-title"><div className="hero-identity"><p>Hiroyuki Miyadera</p><span>Web / App Developer</span></div><div className="hero-statement"><h1 id="hero-title">Ideas into<br/><em>working products.</em></h1><p>思いついたアイデアを、すぐ触れる形にすることが好きです。Webアプリ、モバイルアプリ、日常や開発のための小さなツールを作っています。</p></div><div className="hero-nav"><a href="#selected">Projects <ArrowDownRight aria-hidden="true" /></a><a href="https://github.com/HiroyukiGPU">GitHub <ArrowUpRight aria-hidden="true" /></a><a href="#contact">Contact <ArrowDownRight aria-hidden="true" /></a></div><div className="hero-proof"><span>Independent product archive</span><strong>70+ <small>projects shipped</small></strong><span>Web · Mobile · Tools · Experiments</span></div></section>;
}
