import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { name, type, organizationId, icon, repository } = await req.json()
    const slug = name.toLowerCase().replace(/\s+/g, '-')

    const project = await prisma.project.create({
      data: {
        name,
        slug,
        type,
        organizationId,
        icon,
        repository
      },
      include: {
        organization: true,
        sandboxes: true
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
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
