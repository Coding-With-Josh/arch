import Navigation from "../../ui/navigation";
import { Button } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Menu } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { CreateOrganization, UserButton } from "@clerk/nextjs";

export default async function Navbar() {
  const user = await currentUser();
  return (
    <header className="sticky top-0 z-50 -mb-4 px-12 py-2 w-full items-center bg-transparent border-b border-zinc-900 backdrop-blur-md">
      <div className="fade-bottom absolute left-0 h-24 w-full p-12"></div>
      <div className="relative mx-auto max-w-container">
        <NavbarComponent>
          <NavbarLeft>
            <a
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
            >
              Arch
            </a>
          </NavbarLeft>
          <Navigation />
          <NavbarRight>
            {user ? (
              <>
                <UserButton />
              </>
            ) : (
              <>
                <a
                  href="/sign-in"
                  className="hidden text-sm md:block text-white"
                >
                  Sign in
                </a>
                <Button variant="default" asChild>
                  <a href="/sign-up">Get Started</a>
                </Button>
              </>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold text-white"
                  >
                    <span>Launch UI</span>
                  </a>
                  <a href="/" className="text-white hover:text-foreground">
                    Getting Started
                  </a>
                  <a href="/" className="text-white hover:text-foreground">
                    Components
                  </a>
                  <a href="/" className="text-white hover:text-foreground">
                    Documentation
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
