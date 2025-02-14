"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SidebarOptInForm } from "./sidebar-opt-in-form"


export function ClientAppSidebar({
  data,
  ...props
}: {
  data: {
    teams: any[]
    projects: any[]
    user: any
  }
  props?: React.ComponentProps<typeof Sidebar>
}) {
  return (
    <Sidebar variant="floating" {...props} className="bg-zinc-950 scrollbar-custom rounded-xl">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} /> 
      </SidebarHeader>
      <SidebarContent className="px-2">
        <NavMain/>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="px-4 py-2">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
