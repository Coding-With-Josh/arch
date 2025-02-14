import { prisma } from "./db"

export async function getDashboardData(userId: string) {
  const [user, stats, activities] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      include: {
        organizations: {
          include: {
            organization: {
              include: {
                projects: {
                  include: {
                    deployments: true,
                    apiKeys: true,
                  },
                },
              },
            },
          },
        },
      },
    }),
    prisma.$transaction([
      prisma.project.count(),
      prisma.deployment.count({
        where: { status: 'SUCCEEDED' }
      }),
      prisma.apiKey.count(),
    ]),
    prisma.activity.findMany({
      where: { userId },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        project: true,
      },
    }),
  ])

  return {
    user,
    stats: {
      totalProjects: stats[0],
      activeDeployments: stats[1],
      totalApiKeys: stats[2],
    },
    activities,
    organizations: user?.organizations.map(uo => uo.organization) ?? [],
  }
}
