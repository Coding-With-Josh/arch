import { prisma } from "@/lib/db"
import { ClientAppSidebar } from "./client-app-sidebar"
import { auth } from "@clerk/nextjs/server"

export async function AppSidebar() {
  const { userId } = await auth()

  const data = await prisma.user.findUnique({
    where: { id: userId as string },
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
  })

  return (
    <ClientAppSidebar 
      data={{
        user: {
          name: data?.name,
          email: data?.email,
          imageUrl: data?.avatarUrl
        },
        teams: data?.organizations.map(org => ({
          name: org.organization.name,
          plan: org.organization.planType
        })) || [],
        projects: data?.organizations.flatMap(org => 
          org.organization.projects
        ) || []
      }}
    />
  )
}
