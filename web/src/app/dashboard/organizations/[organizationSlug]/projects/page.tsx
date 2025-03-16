import { 
  FileCode, 
  Building2, 
  GitBranch, 
  Plus,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreateProjectForm } from "@/components/forms/create-project-form";
import { ProjectDialog } from "@/components/dashboard/project-dialog"


async function getOrganizationProjects(organizationSlug: string) {
  const projects = await prisma.project.findMany({
    where: {
      organization: {
        slug: organizationSlug
      }
    },
    include: {
      deployments: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      },
      activities: {
        take: 3,
        orderBy: {
          createdAt: 'desc'
        }
      },
      _count: {
        select: {
          deployments: true,
          activities: true
        }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
  return projects;


}

async function getOrganization(organizationSlug: string) {
  return await prisma.organization.findUnique({
    where: { slug: organizationSlug }
  });
}

export default async function ProjectsPage({
  params
}: {
  params: { organizationSlug: string }
}) {
  const [organization, projects] = await Promise.all([
    getOrganization(params.organizationSlug),
    getOrganizationProjects(params.organizationSlug)
  ]);

  if (!organization) {
    throw new Error("Organization not found");
  }
  if (!projects) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <Building2 className="h-12 w-12 text-zinc-500 mb-4" />
        <h2 className="text-xl text-zinc-200 mb-2">No projects found</h2>
        <p className="text-zinc-400">Create your first project to get started</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Projects</h1>
          <p className="text-zinc-400">Manage and monitor your projects</p>
        </div>
        <ProjectDialog organizationId={organization.id} organizationSlug={organization.slug} />

        
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project: any) => (
          <Link 
            href={`/dashboard/organizations/${params.organizationSlug}/projects/${project.slug}`} 
            key={project.id}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50 transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <FileCode className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div>
                    <CardTitle className="text-zinc-200">{project.name}</CardTitle>
                    <CardDescription className="pt-2">
                      <Badge variant="outline" className="border-zinc-800 text-white">
                        {project.type}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <GitBranch className="h-4 w-4 text-zinc-500" />
                    <span className="text-zinc-400">
                      {project.deployments[0]?.status || 'No deployments'} • {project._count.deployments} total
                    </span>
                  </div>
                  {project.deploymentUrl && (
                    <p className="text-sm text-zinc-500 truncate">
                      {project.deploymentUrl}
                    </p>
                  )}
                  <p className="text-xs text-zinc-500">
                    Last updated {formatDistanceToNow(project.updatedAt)} ago
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
