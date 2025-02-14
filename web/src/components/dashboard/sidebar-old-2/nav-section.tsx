import Link from "next/link"
import { cn } from "@/lib/utils"
import { NavItem } from "./nav-item"
import { Badge } from "@/components/ui/badge"

interface NavSectionProps {
  title: string
  items: {
    title: string
    href: string
    icon: any
    isActive?: boolean
    badge?: string
  }[]
  isCollapsed: boolean
}

export function NavSection({ title, items, isCollapsed }: NavSectionProps) {
  return (
    <div className="space-y-2">
      <h4 className={cn(
        "text-xs font-semibold uppercase tracking-wider text-zinc-500",
        isCollapsed && "sr-only"
      )}>
        {title}
      </h4>
      <div className="space-y-1">
        {items.map((item) => (
          <NavItem key={item.href} {...item} isCollapsed={isCollapsed} />
        ))}
      </div>
    </div>
  )
}
