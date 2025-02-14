import { useMemo } from "react"
import { usePathname } from "next/navigation"
import { NavItem } from "./nav-item"
import { 
  Home, 
  LayoutGrid, 
  Users, 
  Settings,
  FolderTree,
  Terminal,
  Boxes,
  KeyRound
} from "lucide-react"
import { cn } from "@/lib/utils"

export function SidebarNav({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname()

  return (
    <div className="space-y-4">
      {!isCollapsed && (
        <div className="mb-4">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Overview
          </h2>
        </div>
      )}
      <nav className="space-y-2">
        {[
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: Home,
            isActive: pathname === "/dashboard"
          },
          {
            title: "Projects",
            href: "/dashboard/projects",
            icon: LayoutGrid,
            isActive: pathname.startsWith("/dashboard/projects")
          },
          // ...rest of nav items
        ].map((item) => (
          <NavItem key={item.href} {...item} isCollapsed={isCollapsed} />
        ))}
      </nav>
    </div>
  )
}
