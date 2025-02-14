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
        sidebarButtonVariants({ variant: "default", size: isCollapsed ? "icon" : "default" }),
        isActive && "bg-zinc-800 text-zinc-100",
        isCollapsed && "justify-center"
      )}
    >
      <Icon className={cn("h-4 w-4", isCollapsed ? "mx-0" : "mr-2")} />
      {!isCollapsed && <span>{title}</span>}
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
