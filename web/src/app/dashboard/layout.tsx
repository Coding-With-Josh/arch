"use client"

import { useEffect, useState } from "react"
import { useCollapsibleState } from "@/hooks/use-collapsible-state"
import type { ReactNode } from "react"
import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar"
import {
  Breadcrumb,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { WalletStatus } from "@/components/ui/wallet-status"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

interface LayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: LayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useCollapsibleState('sidebar-state', false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted && (
      <SidebarProvider className="bg-zinc-950 scrollbar-custom">
        <AppSidebar />
        <SidebarInset className="m-2 rounded-xl border border-[#1F1F23] scrollbar-custom">
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
          <main className="flex-1 overflow-auto scrollbar-custom p-6">  
            <div className="">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    )
  )
}

export default DashboardLayout