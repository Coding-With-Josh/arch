import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { nanoid } from 'nanoid';

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

    // 1. First sync user data
    const defaultProvider = await prisma.walletProvider.upsert({
      where: { name: 'default' },
      update: {},
      create: {
        name: 'default',
        displayName: 'Default Provider',
        isActive: true,
      },
    });

    let dbUser = await prisma.user.upsert({
      where: { email: user.emailAddresses[0].emailAddress },
      update: {
        name: user.fullName || null,
        username: user.username || null,
        avatarUrl: user.imageUrl || null,
        lastActive: new Date(),
        isActive: true,
      },
      create: {
        id: userId,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName || null,
        username: user.username || null,
        avatarUrl: user.imageUrl || null,
        role: Role.USER,
        isActive: true,
        isVerified: true,
        walletProviderId: defaultProvider.id,
      }
    });

    // 2. Then sync app memberships
    const appMemberships = await clerkClient.users.getOrganizationMembershipList({
      userId,
    });

    // Create or update organizations
    for (const membership of appMemberships.data) {
      const org = membership.organization;
      
      const dbOrg = await prisma.organization.upsert({
        where: { id: org.id },
        update: {
          name: org.name || 'Untitled Organization',
          slug: org.slug || `org-${nanoid(10)}`,
          avatarUrl: org.imageUrl || null,
          updatedAt: new Date(),
        },
        create: {
          id: org.id,
          name: org.name || 'Untitled Organization',
          slug: org.slug || `org-${nanoid(10)}`,
          avatarUrl: org.imageUrl || null,
          ownerId: userId,
          planType: 'FREE',
        },
      });

      // Ensure user-organization relationship exists
      await prisma.userOrganization.upsert({
        where: {
          userId_organizationId: {
            userId: dbUser.id,
            organizationId: dbOrg.id,
          },
        },
        update: {
          role: membership.role === 'org:admin' ? 'ADMIN' : 'DEVELOPER',
        },
        create: {
          userId: dbUser.id,
          organizationId: dbOrg.id,
          role: membership.role === 'org:admin' ? 'ADMIN' : 'DEVELOPER',
        },
      });
    }

    // 3. Create initial project if none exists
    const hasProjects = await prisma.project.findFirst({
      where: {
        organization: {
          users: {
            some: {
              userId: dbUser.id
            }
          }
        }
      }
    });

    if (!hasProjects) {
      const firstOrg = await prisma.organization.findFirst({
        where: {
          users: {
            some: {
              userId: dbUser.id
            }
          }
        }
      });

      if (firstOrg) {
        await prisma.project.create({
          data: {
            name: 'First Project',
            slug: `first-project-${nanoid(6)}`,
            organizationId: firstOrg.id,
            type: 'WEB3',
            icon: 'FileIcon'
          }
        });
      }
    }

    // 4. Log activity
    await prisma.activity.create({
      data: {
        userId: dbUser.id,
        action: 'APP_SYNC',
        metadata: {
          synced_at: new Date().toISOString(),
          organizations: appMemberships.data.length
        }
      }
    });

    return NextResponse.json({
      success: true,
      user: dbUser,
      organizationsSynced: appMemberships.data.length,
    });

  } catch (error) {
    console.error('App sync error:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500 }
    );
  }
}
