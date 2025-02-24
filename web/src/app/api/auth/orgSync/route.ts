import { auth, createClerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { nanoid } from 'nanoid';

// Initialize the Clerk client
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      );
    }

    const membershipsResponse = await clerkClient.users.getOrganizationMembershipList({
      userId,
    });

    const memberships = membershipsResponse.data;

    if (!memberships || memberships.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "No organizations found." }),
        { status: 404 }
      );
    }

    // Sync each organization
    for (const membership of memberships) {
      const orgId = membership.organization.id;
      const orgName = membership.organization.name || 'Untitled Organization';
      // Generate a unique slug if none exists
      const orgSlug = membership.organization.slug || `org-${nanoid(10)}`;
      const orgLogo = membership.organization.imageUrl || null;

      // Check if the organization already exists
      let existingOrg = await prisma.organization.findUnique({
        where: { id: orgId },
      });

      if (!existingOrg) {
        // Create the organization with validated data
        existingOrg = await prisma.organization.create({
          data: {
            id: orgId,
            name: orgName,
            slug: orgSlug,
            avatarUrl: orgLogo, // Make sure this matches your schema field name
            ownerId: userId,
            planType: 'FREE', // Add default plan type
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }

      // Check existing user-org relationship
      const userOrg = await prisma.userOrganization.findFirst({
        where: {
          userId,
          organizationId: orgId,
        },
      });

      if (!userOrg) {
        await prisma.userOrganization.create({
          data: {
            userId,
            organizationId: orgId,
            role: Role.ADMIN,
            joinedAt: new Date(),
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sync error:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}