import { Building2, FileCode, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function Page({ params }: { params: { slug: string } }) {
  console.log('Server: Fetching project with slug:', params.slug);

  const project = await prisma.project.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      deployments: true,
      activities: true,
      sandboxes: true,
      organization: true
    }
  });

  console.log('Server: Found project:', project ? 'yes' : 'no');

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <Building2 className="h-12 w-12 text-zinc-500 mb-4" />
        <h2 className="text-xl text-zinc-200 mb-2">Project not found</h2>
        <p className="text-zinc-400">Please check the URL and try again</p>
        <pre className="mt-4 p-4 bg-zinc-900 rounded-lg text-xs text-zinc-400 overflow-auto">
          Searched for slug: {params.slug}
        </pre>
      </div>
    );
  }

  const stats = {
    totalDeployments: project.deployments.length,
    activeDeployments: project.deployments.filter(d => d.status === 'SUCCEEDED').length,
    totalSandboxes: project.sandboxes.length,
  };

  return (
    <div className="min-h-[calc(100vh-80px)] space-y-6 p-6">
      <div className="flex items-center gap-4">
        {project.icon ? (
          <img src={project.icon} alt={project.name} className="h-8 w-8 rounded-full" />
        ) : (
          <Building2 className="h-8 w-8 text-zinc-400" />
        )}
        <div>
          <h1 className="text-2xl font-semibold text-white">{project.name}</h1>
          <p className="text-sm text-zinc-400">Type: {project.type}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-200">Deployments</CardTitle>
            <FileCode className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalDeployments}</div>
            <p className="text-xs text-zinc-500">Active: {stats.activeDeployments}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-200">Sandboxes</CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalSandboxes}</div>
            <p className="text-xs text-zinc-500">Development environments</p>
          </CardContent>
        </Card>
      </div>

      {project.activities && project.activities.length > 0 ? (
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-200">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-center justify-between text-sm">
                  <span className="text-zinc-200">{activity.action}</span>
                  <span className="text-zinc-500">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="py-6">
            <p className="text-center text-zinc-400">No recent activity</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
