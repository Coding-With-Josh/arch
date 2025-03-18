import Image from "next/image";
import { ArrowRightIcon, TwitterIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Glow } from "@/components/sections/landing/blocks/glow";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import { cn } from "@/lib/utils";
import { RainbowButton } from "@/components/custom/rainbow-button";
import { WaitlistDialog } from "./waitlist-dialog";

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?:
    | "link"
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost";
}

interface HeroProps {
  badge?: {
    text: string;
    action: {
      text: string;
      href: string;
    };
  };
  title: string;
  description: string;
  actions: HeroAction[];
  image: {
    light: string;
    dark: string;
    alt: string;
  };
} 

export function HeroSection({
  badge,
  title,
  description,
  actions,
  image,
}: HeroProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const imageSrc = resolvedTheme === "light" ? image.light : image.dark;
  return (
    <section
      className={cn(
        "text-foreground",
        "py-12 sm:py-24 md:py-32 px-4 w-screen",
        "fade-bottom overflow-hidden pb-0",
        "bg-zinc-950" // Add dark background
      )}
    >
      <div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {/* Badge */}
          {badge && (
            <Badge
              variant="outline"
              className="animate-appear gap-2 border-zinc-800 bg-zinc-900/50 flex items-center justify-center"
            >
              <TwitterIcon className="h-3 w-3 text-blue-600" strokeWidth={3} />
              <span className="text-zinc-400">{badge.text}</span>
              <a
                href={badge.action.href}
                className="flex items-center gap-1 text-white transition-all hover:scale-105 duration-300"
              >
                {badge.action.text}
                <ArrowRightIcon className="h-3 w-3" />
              </a>
            </Badge>
          )}

          {/* Title */}
          <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-white via-zinc to-zinc-400 bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="text-md relative z-10 max-w-[550px] animate-appear font-medium text-zinc-400 opacity-0 delay-100 sm:text-xl">
            {description}
          </p>

          {/* Actions */}
          <div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-300">
            <WaitlistDialog 
              trigger={
                <RainbowButton>
                  Join Waitlist
                </RainbowButton>
              } 
            />
          </div>

          {/* Image with Glow */}
          <div className="relative pt-[4rem]">
            <MockupFrame
              className="animate-appear opacity-0 delay-700 dark:bg-zinc-900 dark:border-zinc-800"
              size="small"
            >
              <Mockup type="responsive">
                <Image
                  src={imageSrc}
                  alt={image.alt}
                  width={1248}
                  height={765}
                  priority
                />
              </Mockup>
            </MockupFrame>
            <Glow
              variant="top"
              className="animate-appear-zoom opacity-0 delay-1000"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
