import { promises as fs } from "node:fs";
import path from "node:path";

const projectRoot = path.join(process.cwd(), "src", "projects");
const outputRoot = path.join(process.cwd(), "public", "project-assets");

async function copyAssets(source, destination) {
  const entries = await fs.readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === "project.json") continue;

    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      await fs.mkdir(destinationPath, { recursive: true });
      await copyAssets(sourcePath, destinationPath);
    } else if (entry.isFile()) {
      await fs.mkdir(destination, { recursive: true });
      await fs.copyFile(sourcePath, destinationPath);
    }
  }
}

await fs.rm(outputRoot, { recursive: true, force: true });
await fs.mkdir(outputRoot, { recursive: true });

const projects = await fs.readdir(projectRoot, { withFileTypes: true });
for (const project of projects) {
  if (!project.isDirectory()) continue;
  await copyAssets(
    path.join(projectRoot, project.name),
    path.join(outputRoot, project.name),
  );
}

console.log(`[project-assets] Synced assets for ${projects.filter((entry) => entry.isDirectory()).length} projects.`);
