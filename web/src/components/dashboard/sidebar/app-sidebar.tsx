import { prisma } from "@/lib/db"
import { ClientAppSidebar } from "./client-app-sidebar"
import { auth } from "@clerk/nextjs/server";
import { LucideIcon, icons } from "lucide-react";

export async function AppSidebar() {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      organizations: {
        include: {
          organization: {
            include: {
              projects: true
            }
          }
        }
      }
    }
  });

  return (
    <ClientAppSidebar 
      data={{
        user: {
          id: data?.id ?? '',
          name: data?.name ?? null,
          email: data?.email ?? '',
          profilePhoto: data?.avatarUrl ?? null,
          avatarUrl: data?.avatarUrl ?? null,
          role: "USER",
          isActive: true,
          isVerified: true
        },
        teams: data?.organizations.map(org => ({
          id: org.organization.id,
          name: org.organization.name,
          planType: org.organization.planType,
          slug: org.organization.slug,
          logo: org.organization.avatarUrl,
          avatarUrl: org.organization.avatarUrl
        })) || [],
        projects: data?.organizations.flatMap(org => 
          org.organization.projects.map(project => ({
            id: project.id,
            name: project.name,
            slug: project.slug,
            icon: project.icon ? icons[project.icon as keyof typeof icons] : icons.File,
            type: project.type,
            repository: project.repository,
            deploymentUrl: project.deploymentUrl
          }))
        ) || []
      }}
    />
  );
}
