import { Building2, FileCode, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function OrganizationPage({ params }: { params: { slug: string } }) {
  console.log('Server: Fetching organization with slug:', params.slug);

  const org = await prisma.organization.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      _count: true,
      users: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarUrl: true,
              _count: true
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

  console.log('Server: Found organization:', org ? 'yes' : 'no');

  if (!org) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <Building2 className="h-12 w-12 text-zinc-500 mb-4" />
        <h2 className="text-xl text-zinc-200 mb-2">Organization not found</h2>
        <p className="text-zinc-400">Please check the URL and try again</p>
        <pre className="mt-4 p-4 bg-zinc-900 rounded-lg text-xs text-zinc-400 overflow-auto">
          Searched for slug: {params.slug}
        </pre>
      </div>
    );
  }

  const stats = {
    totalProjects: org._count.projects,
    activeProjects: org.projects.filter(p => p.deploymentUrl).length,
    totalMembers: org._count.users,
  };

  return (
    <div className="min-h-[calc(100vh-80px)] space-y-6 p-6">
      <div className="flex items-center gap-4">
        {org.avatarUrl ? (
          <img src={org.avatarUrl} alt={org.name} className="h-8 w-8 rounded-full" />
        ) : (
          <Building2 className="h-8 w-8 text-zinc-400" />
        )}
        <div>
          <h1 className="text-2xl font-semibold text-white">{org.name}</h1>
          <p className="text-sm text-zinc-400">Plan: {org.planType}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-200">Total Projects</CardTitle>
            <FileCode className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalProjects}</div>
            <p className="text-xs text-zinc-500">Active: {stats.activeProjects}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-200">Team Members</CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalMembers}</div>
            <p className="text-xs text-zinc-500">Across all projects</p>
          </CardContent>
        </Card>
      </div>

      {org.projects && org.projects.length > 0 ? (
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-200">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {org.projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between text-sm">
                  <span className="text-zinc-200">{project.name}</span>
                  <span className="text-zinc-500">{project.type}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="py-6">
            <p className="text-center text-zinc-400">No projects yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
