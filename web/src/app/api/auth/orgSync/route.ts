import { auth, createClerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { nanoid } from 'nanoid';

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    // 1. Get organizations from both Clerk and Prisma
    const [clerkMemberships, prismaOrgs] = await Promise.all([
      clerkClient.users.getOrganizationMembershipList({ userId }),
      prisma.organization.findMany({
        where: {
          users: {
            some: {
              userId
            }
          }
        },
        include: {
          users: true
        }
      })
    ]);

    // 2. Create sets for easy comparison
    const clerkOrgIds = new Set(clerkMemberships.data.map(m => m.organization.id));
    const prismaOrgIds = new Set(prismaOrgs.map(org => org.id));

    // 3. Sync Clerk -> Prisma (Create missing orgs in Prisma)
    for (const membership of clerkMemberships.data) {
      const orgId = membership.organization.id;
      
      if (!prismaOrgIds.has(orgId)) {
        // Create new org in Prisma
        await prisma.organization.create({
          data: {
            id: orgId,
            name: membership.organization.name || 'Untitled Organization',
            slug: membership.organization.slug || `org-${nanoid(10)}`,
            avatarUrl: membership.organization.imageUrl,
            ownerId: userId,
            planType: 'FREE',
            users: {
              create: {
                userId,
                role: Role.ADMIN,
                joinedAt: new Date()
              }
            }
          }
        });
      }
    }

    // 4. Sync Prisma -> Clerk (Create missing orgs in Clerk)
    for (const org of prismaOrgs) {
      if (!clerkOrgIds.has(org.id)) {
        try {
          // Create organization in Clerk
          const clerkOrg = await clerkClient.organizations.createOrganization({
            name: org.name,
            slug: org.slug,
            // Use existing org's image if available
            // imageUrl: org.avatarUrl || undefined,
            
            // Create initial membership for the creating user
            createdBy: userId,
          });

          // Update Prisma org with any new Clerk-generated fields
          await prisma.organization.update({
            where: { id: org.id },
            data: {
              id: clerkOrg.id, // Update to match Clerk's ID
              avatarUrl: clerkOrg.imageUrl || org.avatarUrl,
              slug: clerkOrg.slug || org.slug
            }
          });
        } catch (error) {
          console.error(`Failed to sync org ${org.id} to Clerk:`, error);
        }
      }
    }

    // 5. Sync organization details (Update existing orgs)
    for (const membership of clerkMemberships.data) {
      const orgId = membership.organization.id;
      if (prismaOrgIds.has(orgId)) {
        await prisma.organization.update({
          where: { id: orgId },
          data: {
            name: membership.organization.name || undefined,
            slug: membership.organization.slug || undefined,
            avatarUrl: membership.organization.imageUrl || undefined,
            updatedAt: new Date()
          }
        });
      }
    }

    return NextResponse.json({ 
      success: true,
      syncedOrganizations: {
        clerk: clerkMemberships.data.length,
        prisma: prismaOrgs.length
      }
    });

  } catch (error) {
    console.error("Sync error:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500 }
    );
  }
}