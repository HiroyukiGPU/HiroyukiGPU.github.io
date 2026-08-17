import type { Metadata } from "next";
import { Header } from "@/components/header";
import { ProjectArchive } from "@/components/project-archive";
import { getReleasedProjects } from "@/src/lib/projects";

export const metadata: Metadata = { title: "Projects — Hiroyuki Miyadera", description: "Web・モバイル・ツール・実験のプロダクトアーカイブ。" };

export default async function ProjectsPage() {
  const projects = await getReleasedProjects();
  return <><Header /><main className="projects-page"><header className="projects-intro section-shell"><span>Selected work / Archive</span><h1>Projects</h1><p>アイデアの輪郭をつかみ、設計し、動くものにする。これまでに取り組んだプロジェクトの記録です。</p></header><ProjectArchive projects={projects} /></main></>;
}
