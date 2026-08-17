import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { FeaturedProjects } from "@/components/featured-projects";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProjectArchive } from "@/components/project-archive";
import { getReleasedProjects } from "@/src/lib/projects";
import { WhatIBuild } from "@/components/what-i-build";

export default async function Home() {
  const projects = await getReleasedProjects();
  return (
    <>
      <a className="skip-link" href="#main">本文へ移動</a>
      <Header />
      <main id="main">
        <Hero />
        <FeaturedProjects />
        <About />
        <WhatIBuild />
        <ProjectArchive projects={projects} compact />
        <Contact />
      </main>
    </>
  );
}
