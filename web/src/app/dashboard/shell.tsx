import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/db"
import { DashboardClient } from "./client"
import type { ReactNode } from "react"
import { FileIcon, FolderIcon, CodeIcon } from "lucide-react"

interface ShellProps {
    children: ReactNode
}

export async function DashboardShell({ children }: ShellProps) {
    const { userId } = await auth();
    
    if (!userId) {
        return null;
    }

    const userData = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            avatarUrl: true,
            role: true,
            isActive: true,
            isVerified: true,
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

    if (!userData) {
        return null;
    }

    // Map project types to icons
    const getProjectIcon = (type: string) => {
        switch (type) {
            case 'WEB3':
                return CodeIcon
            case 'API':
                return FileIcon
            default:
                return FolderIcon
        }
    }

    return (
        <DashboardClient 
            user={{
                id: userData.id,
                name: userData.name,
                email: userData.email,
                profilePhoto: userData.profilePhoto,
                avatarUrl: userData.avatarUrl,
                role: "USER",
                isActive: userData.isActive,
                isVerified: userData.isVerified
            }}
            teams={userData.organizations.map(org => ({
                id: org.organization.id,
                name: org.organization.name,
                planType: org.organization.planType,
                slug: org.organization.slug,
                logo: org.organization.avatarUrl,
                avatarUrl: org.organization.avatarUrl
            }))}
            projects={userData.organizations.flatMap(org => 
                org.organization.projects.map(project => ({
                    id: project.id,
                    name: project.name,
                    slug: project.slug,
                    icon: getProjectIcon(project.type),
                    type: project.type,
                    repository: project.repository,
                    deploymentUrl: project.deploymentUrl
                }))
            )}
        >
            {children}
        </DashboardClient>
    )
}
