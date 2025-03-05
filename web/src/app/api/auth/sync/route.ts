import { NextResponse } from "next/server";
import { PlanType, Role } from "@prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }), 
        { status: 401 }
      );
    }

    const user = await currentUser();
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'User not found' }), 
        { status: 404 }
      );
    }

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      return new NextResponse(
        JSON.stringify({ error: 'Email required' }), 
        { status: 400 }
      );
    }

    let dbUser = await prisma.user.findUnique({
      where: { email }
    });

    if (!dbUser) {
      // First, create a default wallet provider if needed
      const defaultProvider = await prisma.walletProvider.upsert({
        where: {  name: 'default' },
        update: {},
        create: {
          name: 'default',
          displayName: 'Default Provider',
          isActive: true,
        },
      });

      // Create user with all required relationships
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          email,
          name: user.fullName || null,
          username: user.username || null,
          avatarUrl: user.imageUrl || null,
          role: Role.USER,
          onboardingCompleted: false,
          onboardingStep: 0,
          isVerified: false,
          isActive: true,
          themePreference: "dark",
          accentColor: "blue",
          walletAddress: user.primaryWeb3WalletId || null,
          // Connect to the default wallet provider
          walletProvider: {
            connect: {
              id: defaultProvider.id
            }
          },
          planType: PlanType.FREE
        }
      });
    } else {
      // Update only non-foreign key fields
      const needsUpdate = 
        dbUser.avatarUrl !== user.imageUrl ||
        dbUser.username !== user.username ||
        dbUser.name !== user.fullName;

      if (needsUpdate) {
        dbUser = await prisma.user.update({
          where: { email },
          data: {
            avatarUrl: user.imageUrl || null,
            username: user.username || null,
            name: user.fullName || null,
          }
        });
      }
    }

    

    return NextResponse.json(dbUser);
  } catch (error) {
    console.error('Sync error:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { status: 500 }
    );
  }
}
