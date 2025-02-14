import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarToggleProps {
  isCollapsed: boolean
  onToggle: () => void  // Changed from onCollapsedChange to onToggle
  className?: string
}

export function SidebarToggle({ isCollapsed, onToggle, className }: SidebarToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "fixed top-4 z-[60]",
        "transition-all duration-300",
        isCollapsed ? "left-[88px]" : "left-[296px]",
        className
      )}
      onClick={onToggle}
    >
      <ChevronLeft className={cn(
        "h-4 w-4 text-zinc-400 transition-transform",
        isCollapsed && "rotate-180"
      )} />
    </Button>
  )
}
