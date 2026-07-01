import "server-only";

import { type ResultSetHeader, type RowDataPacket } from "mysql2";

import { getMysqlPool } from "@/libs/db/mysql";

export const projectStatuses = ["draft", "published", "archived"] as const;

export type ProjectStatus = (typeof projectStatuses)[number];

export type Project = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string | null;
  coverSrc: string | null;
  coverAlt: string | null;
  status: ProjectStatus;
  projectType: string | null;
  techStack: string[] | null;
  repoUrl: string | null;
  demoUrl: string | null;
  startedAt: string | null;
  completedAt: string | null;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type ProjectInput = {
  slug?: unknown;
  title?: unknown;
  summary?: unknown;
  description?: unknown;
  coverSrc?: unknown;
  coverAlt?: unknown;
  status?: unknown;
  projectType?: unknown;
  techStack?: unknown;
  repoUrl?: unknown;
  demoUrl?: unknown;
  startedAt?: unknown;
  completedAt?: unknown;
  featured?: unknown;
  sortOrder?: unknown;
};

type ProjectRow = RowDataPacket & {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string | null;
  cover_src: string | null;
  cover_alt: string | null;
  status: ProjectStatus;
  project_type: string | null;
  tech_stack: string | string[] | null;
  repo_url: string | null;
  demo_url: string | null;
  started_at: Date | string | null;
  completed_at: Date | string | null;
  featured: 0 | 1 | boolean;
  sort_order: number;
  created_at: Date | string;
  updated_at: Date | string;
};

type ProjectRecord = {
  slug: string;
  title: string;
  summary: string;
  description: string | null;
  coverSrc: string | null;
  coverAlt: string | null;
  status: ProjectStatus;
  projectType: string | null;
  techStack: string[] | null;
  repoUrl: string | null;
  demoUrl: string | null;
  startedAt: string | null;
  completedAt: string | null;
  featured: boolean;
  sortOrder: number;
};

type ListProjectsOptions = {
  status?: ProjectStatus | "all";
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const columnMap = {
  slug: "slug",
  title: "title",
  summary: "summary",
  description: "description",
  coverSrc: "cover_src",
  coverAlt: "cover_alt",
  status: "status",
  projectType: "project_type",
  techStack: "tech_stack",
  repoUrl: "repo_url",
  demoUrl: "demo_url",
  startedAt: "started_at",
  completedAt: "completed_at",
  featured: "featured",
  sortOrder: "sort_order",
} as const;

function isProjectStatus(value: unknown): value is ProjectStatus {
  return projectStatuses.includes(value as ProjectStatus);
}

function formatDate(value: Date | string | null) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value).slice(0, 10);
}

function formatDateTime(value: Date | string) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value);
}

function parseTechStack(value: ProjectRow["tech_stack"]) {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value;
  }

  return JSON.parse(value) as string[];
}

function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    description: row.description,
    coverSrc: row.cover_src,
    coverAlt: row.cover_alt,
    status: row.status,
    projectType: row.project_type,
    techStack: parseTechStack(row.tech_stack),
    repoUrl: row.repo_url,
    demoUrl: row.demo_url,
    startedAt: formatDate(row.started_at),
    completedAt: formatDate(row.completed_at),
    featured: Boolean(row.featured),
    sortOrder: row.sort_order,
    createdAt: formatDateTime(row.created_at),
    updatedAt: formatDateTime(row.updated_at),
  };
}

function normalizeString(value: unknown, field: string, required = false) {
  if (value === undefined || value === null || value === "") {
    if (required) {
      throw new Error(`${field} is required.`);
    }

    return null;
  }

  if (typeof value !== "string") {
    throw new Error(`${field} must be a string.`);
  }

  const trimmed = value.trim();
  if (!trimmed && required) {
    throw new Error(`${field} is required.`);
  }

  return trimmed || null;
}

function normalizeSlug(value: unknown, required: boolean) {
  const slug = normalizeString(value, "slug", required);
  if (slug && !slugPattern.test(slug)) {
    throw new Error("slug must use lowercase letters, numbers, and hyphens.");
  }

  return slug;
}

function normalizeUrl(value: unknown, field: string) {
  const url = normalizeString(value, field);
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error();
    }
  } catch {
    throw new Error(`${field} must be a valid http or https URL.`);
  }

  return url;
}

function normalizeDate(value: unknown, field: string) {
  const date = normalizeString(value, field);
  if (date && !datePattern.test(date)) {
    throw new Error(`${field} must use YYYY-MM-DD format.`);
  }

  return date;
}

function normalizeBoolean(value: unknown, field: string, fallback: boolean) {
  if (value === undefined || value === null) {
    return fallback;
  }

  if (typeof value !== "boolean") {
    throw new Error(`${field} must be a boolean.`);
  }

  return value;
}

function normalizeInteger(value: unknown, field: string, fallback: number) {
  if (value === undefined || value === null) {
    return fallback;
  }

  if (typeof value !== "number" || !Number.isInteger(value)) {
    throw new Error(`${field} must be an integer.`);
  }

  return value;
}

function normalizeTechStack(value: unknown) {
  if (value === undefined || value === null) {
    return null;
  }

  if (
    !Array.isArray(value) ||
    value.some((item) => typeof item !== "string" || item.trim().length === 0)
  ) {
    throw new Error("techStack must be an array of non-empty strings.");
  }

  return value.map((item) => item.trim());
}

export function validateProjectInput(
  input: ProjectInput,
  { partial = false } = {},
): Partial<ProjectRecord> {
  const record: Partial<ProjectRecord> = {};

  if (!partial || "slug" in input) {
    const slug = normalizeSlug(input.slug, !partial);
    if (slug !== null) {
      record.slug = slug;
    }
  }

  if (!partial || "title" in input) {
    const title = normalizeString(input.title, "title", !partial);
    if (title !== null) {
      record.title = title;
    }
  }

  if (!partial || "summary" in input) {
    const summary = normalizeString(input.summary, "summary", !partial);
    if (summary !== null) {
      record.summary = summary;
    }
  }

  if (!partial || "description" in input) {
    record.description = normalizeString(input.description, "description");
  }

  if (!partial || "coverSrc" in input) {
    record.coverSrc = normalizeString(input.coverSrc, "coverSrc");
  }

  if (!partial || "coverAlt" in input) {
    record.coverAlt = normalizeString(input.coverAlt, "coverAlt");
  }

  if (!partial || "status" in input) {
    const status = input.status ?? "draft";
    if (!isProjectStatus(status)) {
      throw new Error("status must be draft, published, or archived.");
    }

    record.status = status;
  }

  if (!partial || "projectType" in input) {
    record.projectType = normalizeString(input.projectType, "projectType");
  }

  if (!partial || "techStack" in input) {
    record.techStack = normalizeTechStack(input.techStack);
  }

  if (!partial || "repoUrl" in input) {
    record.repoUrl = normalizeUrl(input.repoUrl, "repoUrl");
  }

  if (!partial || "demoUrl" in input) {
    record.demoUrl = normalizeUrl(input.demoUrl, "demoUrl");
  }

  if (!partial || "startedAt" in input) {
    record.startedAt = normalizeDate(input.startedAt, "startedAt");
  }

  if (!partial || "completedAt" in input) {
    record.completedAt = normalizeDate(input.completedAt, "completedAt");
  }

  if (!partial || "featured" in input) {
    record.featured = normalizeBoolean(input.featured, "featured", false);
  }

  if (!partial || "sortOrder" in input) {
    record.sortOrder = normalizeInteger(input.sortOrder, "sortOrder", 0);
  }

  return record;
}

function valuesForRecord(record: Partial<ProjectRecord>) {
  return Object.entries(record).map(([key, value]) =>
    key === "techStack" && value !== null ? JSON.stringify(value) : value,
  );
}

export async function listProjects(options: ListProjectsOptions = {}) {
  const status = options.status ?? "published";

  if (status !== "all" && !isProjectStatus(status)) {
    throw new Error("status must be draft, published, archived, or all.");
  }

  const whereSql = status === "all" ? "" : "WHERE status = ?";
  const values = status === "all" ? [] : [status];
  const [rows] = await getMysqlPool().query<ProjectRow[]>(
    `SELECT * FROM projects ${whereSql}
    ORDER BY featured DESC, sort_order ASC, id ASC`,
    values,
  );

  return rows.map(rowToProject);
}

export async function getProjectBySlug(slug: string) {
  const [rows] = await getMysqlPool().query<ProjectRow[]>(
    "SELECT * FROM projects WHERE slug = ? LIMIT 1",
    [slug],
  );

  return rows[0] ? rowToProject(rows[0]) : null;
}

export async function createProject(input: ProjectInput) {
  const record = validateProjectInput(input) as ProjectRecord;
  const columns = Object.keys(record) as Array<keyof ProjectRecord>;
  const columnSql = columns.map((column) => columnMap[column]).join(", ");
  const placeholderSql = columns.map(() => "?").join(", ");
  const values = valuesForRecord(record);

  await getMysqlPool().query<ResultSetHeader>(
    `INSERT INTO projects (${columnSql}) VALUES (${placeholderSql})`,
    values,
  );

  const project = await getProjectBySlug(record.slug);
  if (!project) {
    throw new Error("Project was created but could not be loaded.");
  }

  return project;
}

export async function updateProject(slug: string, input: ProjectInput) {
  const record = validateProjectInput(input, { partial: true });
  const columns = Object.keys(record) as Array<keyof ProjectRecord>;

  if (columns.length === 0) {
    throw new Error("At least one project field is required.");
  }

  const setSql = columns
    .map((column) => `${columnMap[column]} = ?`)
    .join(", ");
  const values = [...valuesForRecord(record), slug];
  const [result] = await getMysqlPool().query<ResultSetHeader>(
    `UPDATE projects SET ${setSql} WHERE slug = ?`,
    values,
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getProjectBySlug(record.slug ?? slug);
}

export async function deleteProject(slug: string) {
  const [result] = await getMysqlPool().query<ResultSetHeader>(
    "DELETE FROM projects WHERE slug = ?",
    [slug],
  );

  return result.affectedRows > 0;
}
