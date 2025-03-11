import { prisma } from "@/lib/db";

export const user = () => {
    return {
        async getUserById(id: string) {
        try {
            const user = await prisma.user.findUnique({
            where: { id },
            });
            return { success: true, data: user };
        } catch (error) {
            return { success: false, error: "Failed to fetch user" };
        }
        },
    };
}
