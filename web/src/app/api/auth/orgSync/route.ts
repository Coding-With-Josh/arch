import { auth, createClerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

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

    // Fetch the user's organization memberships from Clerk
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
      const orgName = membership.organization.name;
      const orgSlug = membership.organization.slug;
      const orgLogo = membership.organization.imageUrl;

      // Check if the organization already exists in the database
      let existingOrg = await prisma.organization.findUnique({
        where: { id: orgId },
      });

      if (!existingOrg) {
        // Create the organization if it doesn't exist
        existingOrg = await prisma.organization.create({
          data: {
            id: orgId,
            name: orgName,
            slug: orgSlug,
            logo: orgLogo,
            ownerId: userId,
          },
        });
      }

      // Check if the user is already associated with the organization
      const userOrg = await prisma.userOrganization.findFirst({
        where: {
          userId,
          organizationId: orgId,
        },
      });

      if (!userOrg) {
        // Associate the user with the organization
        await prisma.userOrganization.create({
          data: {
            userId,
            organizationId: orgId,
            role: Role.ADMIN, // or whatever role you want to assign
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