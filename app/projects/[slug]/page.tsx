import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { ProjectSectionRenderer } from "@/src/components/project-sections/registry";
import { getAllProjects, getProjectBySlug } from "@/src/lib/projects";

export async function generateStaticParams() { return (await getAllProjects()).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const project = await getProjectBySlug((await params).slug); return project ? { title: `${project.title} — Hiroyuki Miyadera`, description: project.shortDescription } : {}; }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = await getProjectBySlug((await params).slug);
  if (!project) notFound();
  return <><Header /><main className="project-detail"><header className="project-detail-header section-shell"><Link href="/projects"><ArrowLeft aria-hidden="true" /> All projects</Link><div className="project-title-grid"><span>{project.category} / {project.date?.slice(0, 4) ?? "Date TBD"} / {project.status}</span><div><h1>{project.title}</h1>{project.description && <p>{project.description}</p>}<ul>{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul></div></div>{project.thumbnailUrl ? <div className="project-cover"><Image src={project.thumbnailUrl} alt={`${project.title}のカバー画像`} fill priority sizes="100vw" unoptimized /></div> : <div className="project-cover project-cover-empty" aria-hidden="true"><span><small>{project.category}</small>{project.title}</span></div>}</header><div className="project-sections">{project.sections.map((section, index) => <ProjectSectionRenderer key={`${section.component}-${index}`} section={section} project={project} />)}</div><footer className="project-next section-shell"><span>プロジェクトについて相談する</span><a href="mailto:miyadera.hiroyuki@gmail.com">Get in touch <ArrowUpRight aria-hidden="true" /></a></footer></main></>;
}
