import { z } from "zod";

const heading = z.string().optional();
const body = z.string().optional();
const image = z.string().min(1);

export const sectionSchema = z.discriminatedUnion("component", [
  z.object({ component: z.literal("hero"), props: z.object({ eyebrow: z.string().optional(), heading, body, image: image.optional() }) }),
  z.object({ component: z.literal("text"), props: z.object({ heading, body: z.string() }) }),
  z.object({ component: z.literal("image"), props: z.object({ image, alt: z.string().default(""), caption: z.string().optional() }) }),
  z.object({ component: z.literal("largeImage"), props: z.object({ image, alt: z.string().default(""), caption: z.string().optional() }) }),
  z.object({ component: z.literal("textImage"), props: z.object({ heading, body: z.string(), image, alt: z.string().default(""), imagePosition: z.enum(["left", "right"]).default("right") }) }),
  z.object({ component: z.literal("gallery"), props: z.object({ heading, images: z.array(z.object({ src: image, alt: z.string().default(""), caption: z.string().optional() })).min(1) }) }),
  z.object({ component: z.literal("video"), props: z.object({ heading, src: image, poster: z.string().optional(), caption: z.string().optional() }) }),
  z.object({ component: z.literal("features"), props: z.object({ heading, items: z.array(z.object({ title: z.string(), description: z.string() })).min(1) }) }),
  z.object({ component: z.literal("techStack"), props: z.object({ heading, items: z.array(z.object({ name: z.string(), purpose: z.string() })).min(1) }) }),
  z.object({ component: z.literal("links"), props: z.object({ heading, website: z.string().optional(), github: z.string().optional(), links: z.array(z.object({ label: z.string(), url: z.string() })).optional() }) }),
  z.object({ component: z.literal("metrics"), props: z.object({ heading, items: z.array(z.object({ value: z.string(), label: z.string() })).min(1) }) }),
  z.object({ component: z.literal("story"), props: z.object({ heading, problem: z.string(), idea: z.string(), implementation: z.string(), result: z.string().optional() }) }),
]);

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  shortDescription: z.string(),
  description: z.string(),
  status: z.enum(["released", "development", "idea", "planned", "in-progress", "archived"]),
  date: z.iso.date().nullable(),
  featured: z.boolean().default(false),
  category: z.enum(["Web", "Mobile", "Tool", "Game", "Experiment"]).optional(),
  thumbnail: z.string().min(1).nullable(),
  tech: z.array(z.string().min(1)),
  links: z.object({ website: z.url().nullable(), github: z.url().nullable() }),
  sections: z.array(z.unknown()).default([]),
});

export type ProjectSection = z.infer<typeof sectionSchema>;
export type Project = Omit<z.infer<typeof projectSchema>, "sections" | "category"> & {
  category: "Web" | "Mobile" | "Tool" | "Game" | "Experiment";
  sections: Array<ProjectSection | UnknownSection>;
  folder: string;
  thumbnailUrl: string | null;
};
export type UnknownSection = { component: string; props?: unknown; invalid: true };

export type HeroSectionProps = Extract<ProjectSection, { component: "hero" }>["props"];
export type TextSectionProps = Extract<ProjectSection, { component: "text" }>["props"];
export type ImageSectionProps = Extract<ProjectSection, { component: "image" }>["props"];
export type LargeImageSectionProps = Extract<ProjectSection, { component: "largeImage" }>["props"];
export type TextImageSectionProps = Extract<ProjectSection, { component: "textImage" }>["props"];
export type GallerySectionProps = Extract<ProjectSection, { component: "gallery" }>["props"];
export type VideoSectionProps = Extract<ProjectSection, { component: "video" }>["props"];
export type FeaturesSectionProps = Extract<ProjectSection, { component: "features" }>["props"];
export type TechStackSectionProps = Extract<ProjectSection, { component: "techStack" }>["props"];
export type LinksSectionProps = Extract<ProjectSection, { component: "links" }>["props"];
export type MetricsSectionProps = Extract<ProjectSection, { component: "metrics" }>["props"];
export type StorySectionProps = Extract<ProjectSection, { component: "story" }>["props"];
