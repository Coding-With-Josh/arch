import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function updateUserOnboarding(userId: string, data: any) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      username: data.username,
      profilePhoto: data.previewImage,
      themePreference: data.selectedTheme.value,
      accentColor: data.selectedColor.name,
      onboardingCompleted: true,
      updatedAt: new Date(),
    },
  });
}
