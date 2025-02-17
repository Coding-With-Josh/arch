import { useUser } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function orgSync(clerkOrgs: any) {

    const { userId } = await auth();
    if (!userId) {
      return null
    }

    const user = await currentUser();
    if (!user) {
      return null
    }

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      return null
    }
    
    
    // Get user's organizations from Clerk
    const userOrgs = await clerkOrgs.user?.getOrganizationMemberships();

    // For each organization the user is a member of
    if (userOrgs && userOrgs.total_count > 0) {
      for (const org of userOrgs.data) {
      await prisma.organization.create({
    
        data:{
            
          id: org.organization.id,
          name: org.organization.name,
          slug: org.organization.slug || org.organization.name.toLowerCase(),
          logo: org.organization.imageUrl || null,
          owner: {
            connect: {
              email
            }
          },
        }
      });
      }
    }
}