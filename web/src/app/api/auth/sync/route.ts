import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";


export async function POST() {

  const user = await currentUser()

  if (!user) {
    return new NextResponse('User not found', { status: 404 })
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      email: user?.primaryEmailAddress?.emailAddress
    }
  })


  if (!dbUser) {
    if (!user.primaryEmailAddress?.emailAddress) {
      return new NextResponse('Email address is required', { status: 400 });
    }
    
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.primaryEmailAddress.emailAddress,
        authProviderId: user.externalAccounts[0].id,
        walletAddress: user.primaryWeb3WalletId,
        role: Role.USER,
        onboardingCompleted: false,
        avatarUrl: user.imageUrl,
        username: user.username,
        name: user.fullName,
        organizations: undefined,
        isVerified: false,
        ownedOrganizations: undefined,
        onboardingStep: 0,
        walletProviderId: "",
        
      }
    })
  }
  return NextResponse.json(user);
}
