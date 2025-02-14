import Link from "next/link"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { sidebarButtonVariants } from "./sidebar-button"

interface NavItemProps {
  href: string
  icon: React.ElementType
  title: string
  isActive?: boolean
  isCollapsed: boolean
}

export function NavItem({ href, icon: Icon, title, isActive, isCollapsed }: NavItemProps) {
  const link = (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-md px-3 py-2",
        "min-w-0 flex-1 transition-all duration-200",
        isActive ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50",
        isCollapsed && "justify-center px-2"
      )}
    >
      <Icon className={cn(
        "size-4 flex-shrink-0 transition-transform",
        isCollapsed ? "transform scale-110" : "mr-2",
        isActive && "text-zinc-100"
      )} />
      {!isCollapsed && <span className="truncate">{title}</span>}
    </Link>
  )

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right">{title}</TooltipContent>
      </Tooltip>
    )
  }

  return link
}
