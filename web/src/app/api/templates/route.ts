import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { name, description, type, files, projectId, isPublic } = await req.json()

    const template = await prisma.template.create({
      data: {
        name,
        description,
        type,
        files,
        projectId,
        isPublic
      }
    })

    return NextResponse.json(template)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create template' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const projectId = searchParams.get('projectId')
    const type = searchParams.get('type')

    const templates = await prisma.template.findMany({
      where: {
        OR: [
          { projectId: projectId ?? undefined },
          { isPublic: true }
        ],
        type: type ?? undefined
      }
    })

    return NextResponse.json(templates)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 })
  }
}
