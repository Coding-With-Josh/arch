import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            firstName,
            lastName,
            username,
            profilePhoto,
            selectedColor,
            selectedTheme,
            email,
        } = body;

        // Update user with onboarding information
        const updatedUser = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                name: `${firstName} ${lastName}`.trim(),
                username: username,
                profilePhoto: profilePhoto,
                themePreference: selectedTheme.value,
                accentColor: selectedColor.name,
                onboardingCompleted: true,
                onboardingStep: 3, // Completed all steps
                updatedAt: new Date(),
            },
        });

        return NextResponse.json(
            {
                message: "Onboarding completed successfully",
                user: updatedUser,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Onboarding error:", error);
        return NextResponse.json(
            { error: "Failed to complete onboarding" },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                onboardingCompleted: true,
                onboardingStep: true,
                name: true,
                username: true,
                profilePhoto: true,
                themePreference: true,
                accentColor: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching onboarding status:", error);
        return NextResponse.json(
            { error: "Failed to fetch onboarding status" },
            { status: 500 }
        );
    }
}