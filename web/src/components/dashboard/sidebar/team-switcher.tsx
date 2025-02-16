"use client"

import * as React from "react"
import { Building2, ChevronDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

interface Team {
  id: string | null
  name: string | null
  planType: string
  slug: string | null
  avatarUrl: string | null
}

interface TeamSwitcherProps {
  teams: Team[]
}

export function TeamSwitcher({ teams }: TeamSwitcherProps) {
  const { isMobile } = useSidebar()
  const [open, setOpen] = React.useState(false)
  const [activeTeam, setActiveTeam] = React.useState<Team>(teams[0] || {
    id: null,
    name: "No Team",
    planType: "FREE",
    slug: null,
    avatarUrl: null
  })

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-zinc-800 data-[state=open]:text-zinc-100"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700">
                <Building2 className="size-4 text-zinc-400" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-zinc-100">{activeTeam?.name || "Select Team"}</span>
                <span className="truncate text-xs text-zinc-400">{activeTeam?.planType?.toLowerCase() || "No plan"}</span>
              </div>
              <ChevronDown className="ml-auto text-zinc-400 h-4 w-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-zinc-900 border-zinc-800"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2 text-white"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border border-[#1F1F23]">
                  <Building2 className="size-4 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-[#1F1F23]" />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md text-white bg-zinc-800">
                <Plus className="size-3" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
