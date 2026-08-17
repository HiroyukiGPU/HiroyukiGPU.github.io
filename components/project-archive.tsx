"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/src/lib/project-schema";

export function ProjectArchive({ projects, compact = false }: { projects: Project[]; compact?: boolean }) {
  const [tech, setTech] = useState("All");
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");
  const [sort, setSort] = useState<"new" | "old">("new");
  const technologies = useMemo(() => [...new Set(projects.flatMap((project) => project.tech))].sort(), [projects]);
  const years = useMemo(() => [...new Set(projects.flatMap((project) => project.date ? [project.date.slice(0, 4)] : []))].sort().reverse(), [projects]);
  const visible = useMemo(() => projects
    .filter((project) => (category === "All" || project.category === category) && (tech === "All" || project.tech.includes(tech)) && (year === "All" || project.date?.startsWith(year)))
    .sort((a, b) => sort === "new" ? (b.date ?? "").localeCompare(a.date ?? "") : (a.date ?? "9999").localeCompare(b.date ?? "9999")), [projects, category, tech, year, sort]);

  return <section className={`archive section-shell ${compact ? "archive-compact" : ""}`} id="archive" aria-labelledby="archive-title">
    <div className="section-heading archive-heading"><h2 id="archive-title">All projects</h2><p>継続してつくり、公開してきた記録。</p></div>
    <div className="project-filters">
      <label>Category<select value={category} onChange={(e) => setCategory(e.target.value)}><option>All</option>{["Web", "Mobile", "Tool", "Game", "Experiment"].map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>Technology<select value={tech} onChange={(e) => setTech(e.target.value)}><option>All</option>{technologies.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>Year<select value={year} onChange={(e) => setYear(e.target.value)}><option>All</option>{years.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>Sort<select value={sort} onChange={(e) => setSort(e.target.value as "new" | "old")}><option value="new">Newest</option><option value="old">Oldest</option></select></label>
    </div>
    <div className="archive-count"><span>{visible.length.toString().padStart(2, "0")} projects</span><Link href="/projects">Open full archive <ArrowUpRight aria-hidden="true" /></Link></div>
    <div className="project-table" aria-live="polite">
      <div className="table-head"><span>Project / Description</span><span>Category / Stack</span><span>Year</span><span /></div>
      {visible.length ? visible.map((project) => <Link className="project-row" href={`/projects/${project.slug}`} key={project.slug}><span className="row-title">{project.title}{project.shortDescription && <small>{project.shortDescription}</small>}</span><span className="row-tech">{project.category}{project.tech.length ? ` / ${project.tech.join(" / ")}` : ""}</span><span>{project.date?.slice(0, 4) ?? "TBD"}</span><ArrowUpRight aria-hidden="true" /></Link>) : <p className="empty-state">条件に一致するプロジェクトはありません。</p>}
    </div>
  </section>;
}
