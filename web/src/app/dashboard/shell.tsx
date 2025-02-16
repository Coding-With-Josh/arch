import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { DashboardClient } from "./client"
import type { ReactNode } from "react"
import { FileIcon } from "lucide-react"

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
                        select: {
                            id: true,
                            name: true,
                            planType: true,
                            slug: true,
                            logo: true,
                            avatarUrl: true,
                            projects: {
                                select: {
                                    id: true,
                                    name: true,
                                    slug: true,
                                    icon: true,
                                    type: true,
                                    repository: true,
                                    deploymentUrl: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return (
        <DashboardClient 
            user={{
                id: userData!.id,
                name: userData!.name,
                email: userData!.email,
                profilePhoto: userData!.profilePhoto,
                avatarUrl: userData!.avatarUrl,
                role: "USER",
                isActive: userData!.isActive,
                isVerified: userData!.isVerified
            }}
            teams={userData?.organizations.map(org => ({
                id: org.organization.id,
                name: org.organization.name,
                planType: org.organization.planType,
                slug: org.organization.slug,
                logo: org.organization.logo,
                avatarUrl: org.organization.avatarUrl
            })) || []}
            projects={userData?.organizations.flatMap(org => 
                org.organization.projects.map(project => ({
                    ...project,
                    icon: FileIcon // Use appropriate icon based on your needs
                }))
            ) || []}
        >
            {children}
        </DashboardClient>
    )
}
