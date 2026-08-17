import type { Project, ProjectSection, UnknownSection } from "@/src/lib/project-schema";
import { projectAssetUrl } from "@/src/lib/projects";
import { FeaturesSection, GallerySection, ImageSection, LargeImageSection, LinksSection, MetricsSection, ProjectHero, StorySection, TechStackSection, TextImageSection, TextSection, VideoSection } from "./sections";

type RegistryProps = { section: ProjectSection | UnknownSection; project: Project };

export const componentRegistry = {
  hero: ProjectHero,
  text: TextSection,
  image: ImageSection,
  largeImage: LargeImageSection,
  textImage: TextImageSection,
  gallery: GallerySection,
  video: VideoSection,
  features: FeaturesSection,
  techStack: TechStackSection,
  links: LinksSection,
  metrics: MetricsSection,
  story: StorySection,
} as const;

export function ProjectSectionRenderer({ section, project }: RegistryProps) {
  const resolve = (src: string) => projectAssetUrl(project.slug, src);
  if ("invalid" in section) {
    if (process.env.NODE_ENV !== "production") return <aside className="unknown-section" role="status">Unknown or invalid section: <code>{section.component}</code></aside>;
    return null;
  }
  switch (section.component) {
    case "hero": return <ProjectHero props={section.props} resolve={resolve} />;
    case "text": return <TextSection props={section.props} />;
    case "image": return <ImageSection props={section.props} resolve={resolve} />;
    case "largeImage": return <LargeImageSection props={section.props} resolve={resolve} />;
    case "textImage": return <TextImageSection props={section.props} resolve={resolve} />;
    case "gallery": return <GallerySection props={section.props} resolve={resolve} />;
    case "video": return <VideoSection props={section.props} resolve={resolve} />;
    case "features": return <FeaturesSection props={section.props} />;
    case "techStack": return <TechStackSection props={section.props} />;
    case "links": return <LinksSection props={section.props} />;
    case "metrics": return <MetricsSection props={section.props} />;
    case "story": return <StorySection props={section.props} />;
    default: return null;
  }
}
