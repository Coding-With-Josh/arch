import { Profile } from "../../custom/profile";
import Navigation from "../../ui/navigation";
import { Button } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { BarChart3, Cpu, Menu } from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { CreateOrganization, UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/custom/navbar"

export default async function Navbar() {
  const user = await currentUser();
  const authMethod = await auth();

  // Transform user data into a plain object
  const userData = user
    ? {
        username: user.username || user.firstName || "User",
        email: user.emailAddresses[0]?.emailAddress || "",
        imageUrl: user.imageUrl || "",
      }
    : null;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/60 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <Cpu className="h-6 w-6 text-blue-500" />
            <span className="text-lg font-bold text-zinc-100">Arch</span>
          </a>
          <MainNav />
        </div>
        <div className="ml-auto flex items-center gap-4">
          {/* <Button 
            variant="ghost"
            size="sm"
            className="hidden text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 sm:flex"
            asChild
          >
            <a href="/dashboard">
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </a>
          </Button> */}
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
    </header>
  )
}
