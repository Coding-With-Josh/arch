import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Boxes } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { formatDistance } from "date-fns"
import Link from "next/link"

async function getOrganizationProjects(slug: string) {
  const projects = await prisma.project.findMany({
    where: {
      organization: {
        slug: slug
      }
    },
    include: {
      deployments: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      },
      _count: {
        select: {
          deployments: true
        }
      }
    }
  })
  return projects
}

export default async function ProjectsPage({
  params
}: {
  params: { projectSlug: string }
}) {
  const projects = await getOrganizationProjects(params.projectSlug)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-muted-foreground">View and manage your projects</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link href={`/dashboard/organizations/${params.projectSlug}/projects/${project.slug}`} key={project.id}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-2">
                <Boxes className="size-5" />
                <div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.type}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    Status: {project.deployments[0]?.status || 'No deployments'}
                  </p>
                  <p>Total Deployments: {project._count.deployments}</p>
                  {project.deploymentUrl && (
                    <p className="truncate">URL: {project.deploymentUrl}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Created {formatDistance(new Date(project.createdAt), new Date(), { addSuffix: true })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
