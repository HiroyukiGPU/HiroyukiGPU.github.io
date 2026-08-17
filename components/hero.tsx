import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function Hero() {
  return <section className="hero-new section-shell" aria-labelledby="hero-title"><div className="hero-identity"><p>Hiroyuki Miyadera</p><span>Web / App Developer</span></div><div className="hero-statement"><h1 id="hero-title">Ideas become<br/><em>working products.</em></h1><p>思いつきを、触れて試せるプロダクトへ。Web、モバイル、日常のための小さな道具をつくっています。</p></div><div className="hero-nav"><a href="#selected">Selected work <ArrowDownRight aria-hidden="true" /></a><a href="https://github.com/HiroyukiGPU">GitHub <ArrowUpRight aria-hidden="true" /></a><a href="#contact">Contact <ArrowDownRight aria-hidden="true" /></a></div><div className="hero-proof"><span>Independent product archive</span><strong>70+ <small>released projects</small></strong></div></section>;
}
