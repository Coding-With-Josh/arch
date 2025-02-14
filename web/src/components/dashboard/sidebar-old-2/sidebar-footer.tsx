import { Settings, HelpCircle, LogOut } from "lucide-react"
import { NavItem } from "./nav-item"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SidebarFooter({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className="mt-auto p-4">
      <Separator className="mb-4 bg-zinc-800" />
      <div className="space-y-1">
        <NavItem
          href="/settings"
          icon={Settings}
          title="Settings"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/help"
          icon={HelpCircle}
          title="Help & Support"
          isCollapsed={isCollapsed}
        />
      </div>

      <Button 
        variant="ghost" 
        className={cn(
          "w-full mt-4",
          "text-zinc-400 hover:text-white",
          "flex items-center justify-start gap-3",
          "hover:bg-zinc-800/50"
        )}
      >
        <LogOut className="size-4" />
        {!isCollapsed && "Log out"}
      </Button>
    </div>
  )
}
