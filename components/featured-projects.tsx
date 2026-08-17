import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getReleasedProjects } from "@/src/lib/projects";
import { Reveal } from "./reveal";

export async function FeaturedProjects() {
  const released = await getReleasedProjects();
  const projects = released.filter((project) => project.featured).slice(0, 5);
  return <section className="featured section-shell" id="selected" aria-labelledby="featured-title"><div className="section-heading"><h2 id="featured-title">Selected work</h2><p>問いを見つけ、設計し、動く形まで。</p></div><div className="featured-list">{projects.map((project, index) => <Reveal className={`featured-item featured-${index + 1}`} key={project.slug}><div className="project-meta"><span>{project.category} / {project.date?.slice(0, 4) ?? "Date TBD"}</span><div><h3>{project.title}</h3>{project.shortDescription && <p>{project.shortDescription}</p>}<ul>{project.tech.slice(0, 4).map((tech) => <li key={tech}>{tech}</li>)}</ul><div className="project-links"><Link href={`/projects/${project.slug}`}>Case study <ArrowUpRight aria-hidden="true" /></Link>{project.links.github && <a href={project.links.github}>GitHub <ArrowUpRight aria-hidden="true" /></a>}</div></div></div><Link className={`project-cover-link ${project.thumbnailUrl ? "" : "project-cover-empty"}`} href={`/projects/${project.slug}`} aria-label={`${project.title}の詳細を見る`}>{project.thumbnailUrl ? <Image src={project.thumbnailUrl} alt={`${project.title}のカバー画像`} fill priority={index === 0} sizes="(max-width: 900px) 100vw, 67vw" unoptimized /> : <span aria-hidden="true"><small>{project.category}</small>{project.title}</span>}</Link></Reveal>)}</div></section>;
}
