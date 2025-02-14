import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sidebarButtonVariants = cva(
  "flex items-center gap-2 rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50",
        outline: "border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:text-zinc-100",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-7 px-2",
        lg: "h-11 px-5",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SidebarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarButtonVariants> {
  asChild?: boolean
}

export { sidebarButtonVariants }
