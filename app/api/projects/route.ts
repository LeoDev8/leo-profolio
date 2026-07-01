import { NextResponse, type NextRequest } from "next/server";

import {
  createProject,
  listProjects,
  projectStatuses,
  type ProjectStatus,
} from "@/libs/projects";

function isAuthorized(request: NextRequest) {
  const token = process.env.PROJECTS_ADMIN_TOKEN;

  if (!token) {
    return false;
  }

  const authorization = request.headers.get("authorization");
  const bearerToken = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : null;

  return (
    bearerToken === token || request.headers.get("x-admin-token") === token
  );
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get("status") ?? "published";
    if (status !== "all" && !projectStatuses.includes(status as ProjectStatus)) {
      return errorResponse("Invalid status.", 400);
    }

    const projects = await listProjects({
      status: status as ProjectStatus | "all",
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Failed to list projects.", error);
    return errorResponse("Failed to list projects.", 500);
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return errorResponse("Unauthorized.", 401);
  }

  try {
    const project = await createProject(await request.json());
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create project.";
    const status = message.includes("Duplicate") ? 409 : 400;
    return errorResponse(message, status);
  }
}
