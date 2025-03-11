import { prisma } from "@/lib/db";
import { useOrganization } from "@clerk/nextjs";
import { Organization, PlanType } from "@prisma/client";

export const organization = {
  // Create a new organization
  async createOrganization({
    name,
    ownerId,
    slug,
    planType = "FREE",
  }: {
    name: string;
    ownerId: string;
    slug: string;
    planType?: PlanType;
  }) {
    try {
      const organization = await prisma.organization.create({
        data: {
          name,
          slug,
          ownerId,
          planType,
        },
      });

      // Also create UserOrganization record for owner
      await prisma.userOrganization.create({
        data: {
          userId: ownerId,
          organizationId: organization.id,
          role: "OWNER",
        },
      });

      return { success: true, data: organization };
    } catch (error) {
      return { success: false, error: "Failed to create organization" };
    }
  },

  // Update organization details
  async updateOrganization({
    id,
    data,
  }: {
    id: string;
    data: Partial<Organization>;
  }) {
    try {
      const organization = await prisma.organization.update({
        where: { id },
        data,
      });
      return { success: true, data: organization };
    } catch (error) {
      return { success: false, error: "Failed to update organization" };
    }
  },

  // Delete organization
  async deleteOrganization(id: string) {
    try {
      await prisma.organization.delete({
        where: { id },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to delete organization" };
    }
  },

  // Get organization by ID
  async getOrganization(id: string) {
    try {
      const organization = await prisma.organization.findUnique({
        where: { id },
        include: {
          users: true,
          projects: true,
        },
      });
      return { success: true, data: organization };
    } catch (error) {
      return { success: false, error: "Failed to fetch organization" };
    }
  },

  // Get organization by ID
  async getOrganizationBySlug(slug: string) {
    if (!slug) {
      return { success: false, error: "No slug provided" };
    }

    try {
      // Clean the slug
      const cleanSlug = slug.toLowerCase().trim();
      console.log("Looking up organization with slug:", cleanSlug);

      const org = await prisma.organization.findUnique({
        where: {
          slug: cleanSlug,
        },
        include: {
          users: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  avatarUrl: true,
                },
              },
            },
          },
          projects: {
            include: {
              deployments: true,
            },
          },
        },
      });

      if (!org) {
        console.log("No organization found with slug:", cleanSlug);
        return {
          success: false,
          error: "Organization not found",
          debug: {
            searchedSlug: cleanSlug,
            originalSlug: slug,
          },
        };
      }

      console.log("Found organization:", org.name);
      return { success: true, data: org };
    } catch (error) {
      console.error("Database error:", error);
      return {
        success: false,
        error: "Failed to fetch organization",
      };
    }
  },

  // Get organizations for a user
  async getUserOrganizations(userId: string) {
    try {
      const organizations = await prisma.userOrganization.findMany({
        where: { userId },
        include: {
          organization: true,
        },
      });
      return { success: true, data: organizations };
    } catch (error) {
      return { success: false, error: "Failed to fetch user organizations" };
    }
  },

  // Add member to organization
  async addMember({
    organizationId,
    userId,
    role = "VIEWER",
  }: {
    organizationId: string;
    userId: string;
    role?: "OWNER" | "ADMIN" | "DEVELOPER" | "VIEWER";
  }) {
    try {
      const membership = await prisma.userOrganization.create({
        data: {
          userId,
          organizationId,
          role,
        },
      });
      return { success: true, data: membership };
    } catch (error) {
      return { success: false, error: "Failed to add member" };
    }
  },
  async inviteMember({
    organizationId,
    userId,
    role = "VIEWER",
  }: {
    organizationId: string;
    userId: string;
    role?: "OWNER" | "ADMIN" | "DEVELOPER" | "VIEWER";
  }) {
    try {
      const membership = await prisma.userOrganization.create({
        data: {
          userId,
          organizationId,
          role,
          inviteStatus: "PENDING",
        },
      });
      return { success: true, data: membership };
    } catch (error) {
      return { success: false, error: "Failed to send invitation" };
    }
  },

  // Accept organization invitation
  async acceptInvitation({
    organizationId,
    userId,
  }: {
    organizationId: string;
    userId: string;
  }) {
    try {
      const membership = await prisma.userOrganization.update({
        where: {
          id: organizationId,
          userId,
        },
        data: {
          inviteStatus: "ACCEPTED",
        },
      });
      return { success: true, data: membership };
    } catch (error) {
      return { success: false, error: "Failed to accept invitation" };
    }
  },

  // Decline organization invitation
  async declineInvitation({
    organizationId,
    userId,
  }: {
    organizationId: string;
    userId: string;
  }) {
    try {
      const membership = await prisma.userOrganization.update({
        where: {
          id: organizationId,
          userId,
        },
        data: {
          inviteStatus: "DECLINED",
        },
      });
      return { success: true, data: membership };
    } catch (error) {
      return { success: false, error: "Failed to decline invitation" };
    }
  },

  // Remove member from organization
  async removeMember({
    organizationId,
    userId,
  }: {
    organizationId: string;
    userId: string;
  }) {
    try {
      await prisma.userOrganization.delete({
        where: {
          id: organizationId,
          userId,
        },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to remove member" };
    }
  },

  // Update member role
  async updateMemberRole({
    organizationId,
    userId,
    role,
  }: {
    organizationId: string;
    userId: string;
    role: "OWNER" | "ADMIN" | "DEVELOPER" | "VIEWER";
  }) {
    try {
      const membership = await prisma.userOrganization.update({
        where: {
          id: organizationId,
          userId,
        },
        data: { role },
      });
      return { success: true, data: membership };
    } catch (error) {
      return { success: false, error: "Failed to update member role" };
    }
  },

  // Get pending invitations for a user
  async getPendingInvitations(userId: string) {
    try {
      const invitations = await prisma.userOrganization.findMany({
        where: {
          userId,
          inviteStatus: "PENDING",
        },
        include: {
          organization: true,
        },
      });
      return { success: true, data: invitations };
    } catch (error) {
      return { success: false, error: "Failed to fetch pending invitations" };
    }
  },
};
