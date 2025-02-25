"use client"

import { useEffect, useState } from "react"
import { useCollapsibleState } from "@/hooks/use-collapsible-state"
import type { ReactNode } from "react"
import { ClientAppSidebar } from "@/components/dashboard/sidebar/client-app-sidebar"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { WalletStatus } from "@/components/ui/wallet-status"
import { Button } from "@/components/ui/button"
import { Bell, LucideIcon } from "lucide-react"
import { PlanType, ProjectType } from "@prisma/client"
import { CommandCenter } from "@/components/dashboard/command"
import { usePathname } from "next/navigation"

interface DashboardClientProps {
  children: ReactNode
  user: {
    id: string
    name: string | null
    email: string
    profilePhoto: string | null
    avatarUrl: string | null
    role: "USER"
    isActive: boolean
    isVerified: boolean
  }
  teams: Array<{
    id: string | null
    name: string | null
    planType: PlanType
    slug: string | null
    logo: string | null
    avatarUrl: string | null
  }>
  projects: Array<{
    id: string | null
    name: string | null
    slug: string | null
    icon: LucideIcon
    type: ProjectType
    repository: string | null
    deploymentUrl: string | null
  }>
}

export function DashboardClient({
  children,
  user,
  teams,
  projects,
}: DashboardClientProps) {
  const pathname = usePathname()
  const isEditorPage = pathname?.includes("/studio/editor")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show loading state instead of null
  if (!mounted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    )
  }

  if (isEditorPage) {
    return (
      <div className="fixed inset-0 w-screen h-screen overflow-hidden">
        <CommandCenter />
        {children}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-zinc-950">
      <SidebarProvider>
        <CommandCenter />
        <div className="flex h-screen w-screen">
          <ClientAppSidebar data={{ user, teams, projects }} />
          <div className="flex-1 h-screen w-full overflow-hidden">
            <SidebarInset className="h-[calc(100vh-16px)] m-2 rounded-xl border border-[#1F1F23]">
              <header className="flex h-16 shrink-0 items-center gap-2 px-4 bg-zinc-900/50 rounded-t-xl border-b border-[#1F1F23]">
                <SidebarTrigger className="text-zinc-400 hover:text-zinc-100" />
                <Separator orientation="vertical" className="mr-2 h-4 bg-[#1F1F23]" />
                <div className="flex-1 overflow-x-auto scrollbar-none">
                  <Breadcrumb className="text-zinc-400" />
                </div>
                <div className="flex items-center gap-3">
                  <Button className="h-8 w-8 p-1 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-100">
                    <Bell className="size-4 text-zinc-500" />
                  </Button>
                  <WalletStatus />
                </div>
              </header>
              <main className="h-[calc(100vh-80px)] w-full overflow-y-auto p-6 bg-zinc-950/50">
                {children}
              </main>
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
