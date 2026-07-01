import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import mysql from "mysql2/promise";

import { getConnectionOptions } from "./config.mjs";

const validStatuses = new Set(["draft", "published", "archived"]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const seedPath = path.resolve(__dirname, "../../db/seed/projects.json");
const projects = JSON.parse(await readFile(seedPath, "utf8"));
const connection = await mysql.createConnection(getConnectionOptions());

function nullable(value) {
  return value === undefined ? null : value;
}

function normalizeStatus(status) {
  if (status === undefined || status === null) {
    return "draft";
  }

  if (!validStatuses.has(status)) {
    throw new Error(`Invalid project status: ${status}`);
  }

  return status;
}

try {
  for (const [index, project] of projects.entries()) {
    await connection.execute(
      `INSERT INTO projects (
        slug,
        title,
        summary,
        description,
        cover_src,
        cover_alt,
        status,
        project_type,
        tech_stack,
        repo_url,
        demo_url,
        started_at,
        completed_at,
        featured,
        sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        summary = VALUES(summary),
        description = VALUES(description),
        cover_src = VALUES(cover_src),
        cover_alt = VALUES(cover_alt),
        status = VALUES(status),
        project_type = VALUES(project_type),
        tech_stack = VALUES(tech_stack),
        repo_url = VALUES(repo_url),
        demo_url = VALUES(demo_url),
        started_at = VALUES(started_at),
        completed_at = VALUES(completed_at),
        featured = VALUES(featured),
        sort_order = VALUES(sort_order)`,
      [
        project.slug,
        project.title,
        project.summary,
        nullable(project.description),
        nullable(project.coverSrc),
        nullable(project.coverAlt),
        normalizeStatus(project.status),
        nullable(project.projectType),
        project.techStack ? JSON.stringify(project.techStack) : null,
        nullable(project.repoUrl),
        nullable(project.demoUrl),
        nullable(project.startedAt),
        nullable(project.completedAt),
        project.featured ? 1 : 0,
        project.sortOrder ?? index + 1,
      ],
    );
  }

  console.log(`Seeded ${projects.length} projects.`);
} finally {
  await connection.end();
}
