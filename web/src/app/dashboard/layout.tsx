"use client"

import { useEffect, useState } from "react"
import { useCollapsibleState } from "@/hooks/use-collapsible-state"
import type { ReactNode } from "react"
import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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
      <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="bg-zinc-950">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 bg-[#0F0F12]">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-[#1F1F23]" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children }
        </div>
      </SidebarInset>
    </SidebarProvider>
    )
  )
}

export default DashboardLayout