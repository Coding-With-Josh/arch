import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, projectId, template } = await req.json()

    const sandbox = await prisma.sandbox.create({
      data: {
        name,
        projectId,
        settings: {},
        environment: {},
        files: {
          create: [
            {
              path: '/src/index.js',
              content: template?.content || 'console.log("Hello World")',
              type: 'javascript'
            }
          ]
        }
      },
      include: {
        files: true
      }
    })

    return NextResponse.json(sandbox)
  } catch (error) {
    console.error('Sandbox creation error:', error)
    return NextResponse.json({ error: 'Failed to create sandbox' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const projectId = searchParams.get('projectId')

    const sandboxes = await prisma.sandbox.findMany({
      where: {
        projectId: projectId!
      },
      include: {
        files: true
      }
    })

    return NextResponse.json(sandboxes)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sandboxes' }, { status: 500 })
  }
}
