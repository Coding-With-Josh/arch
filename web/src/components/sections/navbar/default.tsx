"use client";

import { useState, useEffect } from "react";
import { Profile } from "@/components/custom/profile";
import { Button } from "@/components/ui/button";
import { Cpu } from "lucide-react";
import { MainNav } from "@/components/custom/navbar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface UserData {
  username: string;
  email: string;
  imageUrl: string;
}

interface NavbarProps {
  userData: UserData | null;
}

export default function Navbar({ userData }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md transition-all duration-300",
        isScrolled ? "shadow-md" : ""
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container mx-auto flex h-20 items-center px-4">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Cpu className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-lg font-bold text-zinc-100">Arch</span>
          </a>
          <MainNav />
        </div>
        <div className="ml-auto flex items-center gap-4">
          {userData ? (
            <Profile userData={userData} />
          ) : (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                asChild
              >
                <a href="/sign-in">Sign in</a>
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                asChild
              >
                <a href="/sign-up">Get Started</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
