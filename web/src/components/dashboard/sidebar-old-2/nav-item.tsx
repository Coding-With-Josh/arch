import Link from "next/link"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

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
        "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
        "hover:bg-accent hover:text-accent-foreground",
        isActive ? "bg-accent" : "transparent",
        isCollapsed ? "justify-center" : ""
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
