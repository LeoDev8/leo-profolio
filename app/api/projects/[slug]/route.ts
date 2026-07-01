import { NextResponse, type NextRequest } from "next/server";

import {
  deleteProject,
  getProjectBySlug,
  updateProject,
} from "@/libs/projects";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

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

export async function GET(_request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;

  try {
    const project = await getProjectBySlug(slug);
    if (!project) {
      return errorResponse("Project not found.", 404);
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error(`Failed to load project: ${slug}.`, error);
    return errorResponse("Failed to load project.", 500);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  if (!isAuthorized(request)) {
    return errorResponse("Unauthorized.", 401);
  }

  const { slug } = await context.params;

  try {
    const project = await updateProject(slug, await request.json());
    if (!project) {
      return errorResponse("Project not found.", 404);
    }

    return NextResponse.json({ project });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update project.";
    return errorResponse(message, 400);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!isAuthorized(request)) {
    return errorResponse("Unauthorized.", 401);
  }

  const { slug } = await context.params;

  try {
    const deleted = await deleteProject(slug);
    if (!deleted) {
      return errorResponse("Project not found.", 404);
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Failed to delete project: ${slug}.`, error);
    return errorResponse("Failed to delete project.", 500);
  }
}
