"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

interface ProfileProps {
  userData: {
    username: string;
    email: string;
    imageUrl: string;
  };
  //   logout: () => void
}

export function Profile({ userData }: ProfileProps) {
  const initials = userData.username?.slice(0, 2).toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="w-full hover:bg-transparent"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={userData.imageUrl} alt={userData.username} />
            <AvatarFallback className="bg-zinc-900">{initials}</AvatarFallback>
          </Avatar>{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-zinc-900 border-zinc-800"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          <div className="flex items-center gap-2 px-1 py-1.5">
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold text-white">
                {userData.username}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {userData.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#1F1F23]" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 p-2 text-white">
            <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#1F1F23]">
              <Sparkles className="h-4 w-4 shrink-0" />
            </div>
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#1F1F23]" />
        <DropdownMenuGroup>
          {[
            { icon: LayoutDashboard, label: "Dashboard", link: "/dashboard" },
            { icon: CreditCard, label: "Billing" },
            { icon: Bell, label: "Notifications" },
          ].map(({ icon: Icon, label, link }) => (
            <DropdownMenuItem key={label} className="gap-2 p-2 text-white">
              {link ? (
                <a
                  href={link}
                  className="flex items-center justify-start gap-2 w-full h-full"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#1F1F23]">
                    <Icon className="h-4 w-4 shrink-0" />
                  </div>
                  {label}
                </a>
              ) : (
                <>
                  <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#1F1F23]">
                    <Icon className="h-4 w-4 shrink-0" />
                  </div>
                  {label}
                </>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#1F1F23]" />
        <DropdownMenuItem className="gap-2 p-2 text-white">
          <SignOutButton>
            <div className="flex items-center justify-start gap-2 w-full h-full">
              <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#1F1F23]">
                <LogOut className="h-4 w-4 shrink-0" />
              </div>
              Log out
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
