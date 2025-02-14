"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({ user }: { user: any }) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu className="w-full">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-zinc-800 data-[state=open]:text-zinc-100 w-full"
            >
              <div className="size-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <span className="text-xs font-medium text-zinc-400">
                  {user.name?.charAt(0)}
                </span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-zinc-100">{user.name}</span>
                <span className="truncate text-xs text-zinc-400">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-zinc-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
            <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-zinc-900 border-zinc-800"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
            > 
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              <div className="flex items-center gap-2 px-1 py-1.5">
              <Avatar className="size-8 ro  unded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-white">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#1F1F23]" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 p-2 text-white">
              <div className="flex size-6 items-center justify-center rounded-sm border border-[#1F1F23]">
                <Sparkles className="size-4 shrink-0" />
              </div>
              Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[#1F1F23]" />
            <DropdownMenuGroup>
              {[
              { icon: BadgeCheck, label: 'Account' },
              { icon: CreditCard, label: 'Billing' },
              { icon: Bell, label: 'Notifications' },
              ].map(({ icon: Icon, label }) => (
              <DropdownMenuItem key={label} className="gap-2 p-2 text-white">
                <div className="flex size-6 items-center justify-center rounded-sm border border-[#1F1F23]">
                <Icon className="size-4 shrink-0" />
                </div>
                {label}
              </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[#1F1F23]" />
            <DropdownMenuItem className="gap-2 p-2 text-white">
              <div className="flex size-6 items-center justify-center rounded-sm border border-[#1F1F23]">
              <LogOut className="size-4 shrink-0" />
              </div>
              Log out
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
