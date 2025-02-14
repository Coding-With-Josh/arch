import Link from "next/link"
import { cn } from "@/lib/utils"
import { LogoIcon } from "@/components/ui/icons"

export function SidebarHeader({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className="h-16 border-b border-[#1F1F23] flex items-center px-4">
      <Link href="/dashboard" className="flex items-center gap-3">
        <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <LogoIcon className="size-5 text-white" />
        </div>
        <span className={cn(
          "text-lg font-semibold text-white transition-opacity",
          isCollapsed ? "opacity-0 hidden" : "opacity-100"
        )}>
          Arch
        </span>
      </Link>
    </div>
  )
}
