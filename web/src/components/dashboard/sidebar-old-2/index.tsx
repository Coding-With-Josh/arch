"use client"

import { cn } from "@/lib/utils"
import { SidebarNav } from "./sidebar-nav"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps {
  isCollapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-30 h-screen border-r bg-background",
        "px-4 pb-10 pt-16 md:pt-4",
        isCollapsed ? "w-[70px]" : "w-[200px]",
        "transition-width duration-300",
      )}
    >
      <ScrollArea className="h-[calc(100vh-8rem)] px-1">
        <SidebarNav isCollapsed={isCollapsed} />
      </ScrollArea>
    </aside>
  )
}

export default Sidebar
