"use client";

import { useState, useEffect } from "react";
import { Profile } from "@/components/custom/profile";
import { Button } from "@/components/ui/button";
import { Cpu } from "lucide-react";
import { MainNav } from "@/components/custom/navbar";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar at the top of the page
      if (currentScrollY < 20) {
        setIsVisible(true);
      } else {
        // Hide when scrolling down, show when scrolling up
        setIsVisible(currentScrollY < lastScrollY);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="fixed top-0 z-50 w-full"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="mx-4 my-4">
            <div className="container mx-auto rounded-full border border-zinc-800/30 bg-zinc-900/70 backdrop-blur-lg">
              <div className="flex h-16 items-center px-6">
                <div className="flex items-center gap-8">
                  <a href="/" className="flex items-center gap-2">
                    <motion.div
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-400"
                      whileHover={{ scale: 1.05 }}
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
                        className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                        asChild
                      >
                        <a href="/sign-in">Sign in</a>
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:opacity-90"
                        asChild
                      >
                        <a href="/sign-up">Get Started</a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
