import { 
  Building2, 
  FileCode, 
  Users, 
  Activity, 
  Clock, 
  Shield, 
  Wallet, 
  GitBranch,
  ChevronRight,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { CreateProjectForm } from "@/components/forms/create-project-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ProjectDialog } from "@/components/dashboard/project-dialog"
import { ActivityChart } from "@/components/dashboard/activity-chart"

export default async function OrganizationPage({ params }: { params: { organizationSlug: string } }) {
  const org = await prisma.organization.findUnique({
    where: { slug: params.organizationSlug },
    include: {
      _count: true,
      owner: true,
      users: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarUrl: true,
              role: true,
              lastActive: true,
              _count: true
            },
          },
        },
      },
      projects: {
        include: {
          deployments: true,
          activities: {
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { user: true }
          },
          _count: true,
        },
      },
      billingHistory: {
        take: 5,
        orderBy: { createdAt: 'desc' },
      },
      apiKeys: true,
    },
  });

  if (!org) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <Building2 className="h-12 w-12 text-zinc-500 mb-4" />
        <h2 className="text-xl text-zinc-200 mb-2">Organization not found</h2>
        <p className="text-zinc-400">Please check the URL and try again</p>
      </div>
    );
  }

  const stats = {
    totalProjects: org._count.projects,
    activeProjects: org.projects.filter(p => p.deploymentUrl).length,
    totalMembers: org._count.users,
    totalDeployments: org.projects.reduce((acc, project) => acc + project._count.deployments, 0),
    successfulDeployments: org.projects.reduce((acc, project) => 
      acc + project.deployments.filter(d => d.status === 'SUCCEEDED').length, 0
    ),
    totalApiKeys: org.apiKeys.length,
    activeApiKeys: org.apiKeys.filter(key => !key.expiresAt || key.expiresAt > new Date()).length,
  };

  // Process activities into chart data
  const activityData = org.projects
    .flatMap(p => p.activities)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .reduce((acc, activity) => {
      const hour = new Date(activity.createdAt).getHours()
      const existing = acc.find(d => d.timestamp === `${hour}h`)
      if (existing) {
        existing.value += 1
      } else {
        acc.push({ timestamp: `${hour}h`, value: 1 })
      }
      return acc
    }, [] as Array<{ timestamp: string; value: number }>)

  return (
    <div className="min-h-[calc(100vh-80px)] space-y-6 p-6">
      {/* Organization Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={org.avatarUrl ?? ''} />
            <AvatarFallback>
              <Building2 className="h-8 w-8 text-zinc-400" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold text-white">{org.name}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-zinc-800 text-white">{org.planType}</Badge>
              <p className="text-sm text-zinc-400">Created {formatDistanceToNow(org.createdAt)} ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-200">Projects</CardTitle>
            <FileCode className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalProjects}</div>
            <p className="text-xs text-zinc-500">
              {stats.activeProjects} active • {stats.totalDeployments} deployments
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-200">Team</CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalMembers}</div>
            <div className="flex -space-x-2 mt-2">
              {org.users.slice(0, 5).map(({ user }) => (
                <Avatar key={user.id} className="h-6 w-6 border-2 border-zinc-900">
                  <AvatarImage src={user.avatarUrl ?? ''} />
                  <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                </Avatar>
              ))}
              {org.users.length > 5 && (
                <div className="h-6 w-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">
                  +{org.users.length - 5}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-200">Deployments</CardTitle>
            <GitBranch className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.successfulDeployments}</div>
            <p className="text-xs text-zinc-500">
              {((stats.successfulDeployments / stats.totalDeployments) * 100).toFixed(1)}% success rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-200">API Keys</CardTitle>
            <Shield className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.activeApiKeys}</div>
            <p className="text-xs text-zinc-500">{stats.totalApiKeys} total keys</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects and Activity Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Projects List */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-zinc-200">Projects</CardTitle>
              <CardDescription>Your organization&apos;s active projects</CardDescription>
            </div>
            <ProjectDialog organizationId={org.id} organizationSlug={org.slug} />
          </CardHeader>
          <CardContent>
            {org.projects.length > 0 ? (
              <div className="space-y-4">
                {org.projects.map((project) => (
                  <Link 
                    href={`/dashboard/organizations/${org.slug}/projects/${project.slug}`} 
                    key={project.id}
                    className="block p-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                          <FileCode className="h-4 w-4 text-zinc-400" />
                        </div>
                        <div>
                          <p className="text-zinc-200 font-medium">{project.name}</p>
                          <p className="text-xs text-zinc-500">
                            {project._count.deployments} deployments • {project.type}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-500" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
                  <FileCode className="h-6 w-6 text-zinc-400" />
                </div>
                <h3 className="text-zinc-200 font-medium mb-2">No projects yet</h3>
                <p className="text-zinc-400 text-sm max-w-sm mb-4">
                  Create your first project to get started with development, deployments, and more.
                </p>
                <ProjectDialog organizationId={org.id} organizationSlug={org.slug} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Replace the existing activity card with the new chart component */}
        <ActivityChart data={activityData} />
      </div>
    </div>
  );
}
