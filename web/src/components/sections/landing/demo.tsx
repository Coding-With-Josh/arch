"use client"

import { HeroSection } from "@/components/sections/landing/blocks/hero-section"
import { Icons } from "@/components/ui/icons"

export function HeroSectionDemo() {
  return (
    <HeroSection
      badge={{
        text: "Introducing Arch 1.0.",
        action: {
          text: "Learn more",
          href: "/docs",
        },
      }}
      title="Build. Ship. Scale"
      description="Premium UI components built with React and Tailwind CSS. Save time and ship your next project faster with our ready-to-use components."
      actions={[
        {
          text: "Get Started",
          href: "/docs/getting-started",
          variant: "default",
        },
        {
          text: "GitHub",
          href: "https://github.com/Coding-With-Josh/arch",
          variant: "secondary",
          icon: <Icons.gitHub className="h-5 w-5" />,
        },
      ]}
      image={{
        light: "https://www.launchuicomponents.com/app-light.png",
        dark: "https://www.launchuicomponents.com/app-dark.png",
        alt: "UI Components Preview",
      }}
    />
  )
}
