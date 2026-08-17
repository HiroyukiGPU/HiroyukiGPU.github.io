import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { projectSchema, sectionSchema, type Project, type UnknownSection } from "./project-schema";

const projectsRoot = path.join(process.cwd(), "src", "projects");

export function projectAssetUrl(slug: string, relativePath: string) {
  const clean = relativePath.replace(/^\.\//, "").split("/").map(encodeURIComponent).join("/");
  return `/project-assets/${encodeURIComponent(slug)}/${clean}`;
}

async function loadProject(folder: string): Promise<Project | null> {
  try {
    const jsonPath = path.join(projectsRoot, folder, "project.json");
    const raw: unknown = JSON.parse(await fs.readFile(jsonPath, "utf8"));
    const parsed = projectSchema.safeParse(raw);
    if (!parsed.success) {
      if (process.env.NODE_ENV !== "production") console.warn(`[projects] Invalid project.json in "${folder}":`, parsed.error.flatten());
      return null;
    }
    if (parsed.data.slug !== folder) {
      if (process.env.NODE_ENV !== "production") console.warn(`[projects] Slug "${parsed.data.slug}" must match folder "${folder}".`);
      return null;
    }
    const sections = parsed.data.sections.map((section, index) => {
      const result = sectionSchema.safeParse(section);
      if (result.success) return result.data;
      const name = typeof section === "object" && section && "component" in section ? String(section.component) : "unknown";
      if (process.env.NODE_ENV !== "production") console.warn(`[projects] Skipping invalid section ${index} (${name}) in "${folder}".`, result.error.flatten());
      return { component: name, props: section, invalid: true } satisfies UnknownSection;
    });
    const category = parsed.data.category ?? (parsed.data.tech.some((tech) => ["Flutter", "Swift", "SwiftUI"].includes(tech)) ? "Mobile" : "Web");
    return { ...parsed.data, category, sections, folder, thumbnailUrl: parsed.data.thumbnail ? projectAssetUrl(folder, parsed.data.thumbnail) : null };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") console.warn(`[projects] Could not load "${folder}".`, error);
    return null;
  }
}

export const getAllProjects = cache(async (): Promise<Project[]> => {
  try {
    const entries = await fs.readdir(projectsRoot, { withFileTypes: true });
    const loaded = await Promise.all(entries.filter((entry) => entry.isDirectory()).map((entry) => loadProject(entry.name)));
    return loaded.filter((project): project is Project => project !== null).sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") console.warn("[projects] Project directory could not be scanned.", error);
    return [];
  }
});

export async function getReleasedProjects() { return (await getAllProjects()).filter((project) => project.status === "released" || project.status === "development"); }
export async function getProjectBySlug(slug: string) { return (await getAllProjects()).find((project) => project.slug === slug) ?? null; }
