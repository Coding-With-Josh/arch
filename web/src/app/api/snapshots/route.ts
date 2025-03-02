import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { name, sandboxId, files } = await req.json()

    const snapshot = await prisma.snapshot.create({
      data: {
        name,
        sandboxId,
        files
      }
    })

    return NextResponse.json(snapshot)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create snapshot' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const sandboxId = searchParams.get('sandboxId')

    if (!sandboxId) {
      return NextResponse.json({ error: 'Sandbox ID is required' }, { status: 400 })
    }

    const snapshots = await prisma.snapshot.findMany({
      where: { sandboxId }
    })

    return NextResponse.json(snapshots)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch snapshots' }, { status: 500 })
  }
}
