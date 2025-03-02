import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sandbox = await prisma.sandbox.findUnique({
      where: { id: params.id },
      include: { files: true }
    })

    if (!sandbox) {
      return NextResponse.json({ error: 'Sandbox not found' }, { status: 404 })
    }

    return NextResponse.json(sandbox)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sandbox' }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, files, settings, environment } = await req.json()

    const sandbox = await prisma.sandbox.update({
      where: { id: params.id },
      data: {
        name,
        settings,
        environment,
        files: {
          deleteMany: {},
          create: files
        }
      },
      include: { files: true }
    })

    return NextResponse.json(sandbox)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update sandbox' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.sandbox.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Sandbox deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete sandbox' }, { status: 500 })
  }
}
