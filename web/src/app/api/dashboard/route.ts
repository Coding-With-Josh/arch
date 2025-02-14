import { NextResponse } from 'next/server'
import { getDashboardData } from '@/lib/dashboard'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  const { userId } = await auth()
  
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const data = await getDashboardData(userId)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Dashboard data fetch error:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
