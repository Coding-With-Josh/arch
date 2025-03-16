import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name, slug, type, repository, organizationId } = body

    // Check if slug already exists
    const existingProject = await prisma.project.findFirst({
      where: {
        organizationId,
        slug,
      },
    })

    if (existingProject) {
      return new NextResponse(
        "A project with this slug already exists in this organization",
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        name,
        slug,
        type,
        repository,
        organizationId,
      },
    })

    // Create initial activity
    await prisma.activity.create({
      data: {
        userId,
        projectId: project.id,
        action: "PROJECT_CREATED",
        metadata: { projectName: name, projectType: type }
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('[PROJECTS]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const organizationId = searchParams.get('organizationId')

    const projects = await prisma.project.findMany({
      where: { organizationId: organizationId! },
      include: {
        sandboxes: true,
        templates: true,
        deployments: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    })

    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}
