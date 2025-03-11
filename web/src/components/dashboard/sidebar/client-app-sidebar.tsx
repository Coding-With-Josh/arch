"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LucideIcon,
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

interface ClientAppSidebarProps {
  data: {
    user: {
      id: string;
      name: string | null;
      email: string;
      profilePhoto: string | null;
      role: 'ADMIN' | 'USER' | 'TESTER' | 'DEVELOPER';
      isActive: boolean;
      isVerified: boolean;
      avatarUrl: string | null;
    };
    teams: Array<{
      id: string | null;
      name: string | null;
      planType: 'FREE' | 'GOLD' | 'SILVER' | 'TITANIUM' | 'ENTERPRISE';
      slug: string | null;
      avatarUrl: string | null;
    }>;
    projects: Array<{
      id: string | null;
      name: string | null;
      slug: string | null;
      icon: LucideIcon;
      type: 'WEB2' | 'WEB3' | 'API';
      repository: string | null;
      deploymentUrl: string | null;
    }>;
  }
}

export function ClientAppSidebar({ data, ...props }: ClientAppSidebarProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Sidebar 
      variant="floating" 
      {...props} 
      className="h-screen min-w-[280px] bg-zinc-950 border-r border-zinc-800/50"
    >
      <SidebarHeader>
        {}
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
