import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { path, content, type } = await req.json()

    const file = await prisma.sandboxFile.create({
      data: {
        sandboxId: params.id,
        path,
        content,
        type
      }
    })

    return NextResponse.json(file)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create file' }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { fileId, content } = await req.json()

    const file = await prisma.sandboxFile.update({
      where: { id: fileId },
      data: { content }
    })

    return NextResponse.json(file)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update file' }, { status: 500 })
  }
}
