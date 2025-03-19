"use client";

import Image from "next/image";
import { ArrowRightIcon, TwitterIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

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
  const { resolvedTheme } = useTheme();
  const imageSrc = resolvedTheme === "light" ? image.light : image.dark;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      className={cn(
        "text-foreground",
        "py-12 sm:py-24 md:py-32 px-4 max-w-screen",
        "overflow-hidden pb-0",
        "bg-zinc-950"
      )}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 20, 0],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -20, 0],
            rotate: [0, -360, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {/* Badge */}
          {badge && (
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="gap-2 border-zinc-800 bg-zinc-900/50 flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <TwitterIcon
                  className="h-3 w-3 text-blue-600"
                  strokeWidth={3}
                />
                <span className="text-zinc-400">{badge.text}</span>
                <a
                  href={badge.action.href}
                  className="flex items-center gap-1 text-white transition-all hover:scale-105 duration-300"
                >
                  {badge.action.text}
                  <ArrowRightIcon className="h-3 w-3" />
                </a>
              </Badge>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            className="inline-block bg-gradient-to-r from-white via-zinc to-zinc-400 bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="max-w-[550px] font-medium text-zinc-400 sm:text-xl"
            variants={itemVariants}
          >
            {description}
          </motion.p>

          {/* Actions */}
          <motion.div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-300"
          variants={itemVariants}>
            
            <WaitlistDialog
              trigger={<RainbowButton>Join Waitlist</RainbowButton>}
            />
          </motion.div>

          {/* Image with Glow */}
          <motion.div className="relative pt-[4rem]" variants={itemVariants}>
            <MockupFrame className="dark:bg-zinc-900 dark:border-zinc-800 hover:scale-105 transition-transform duration-300">
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
            <Glow variant="top" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
