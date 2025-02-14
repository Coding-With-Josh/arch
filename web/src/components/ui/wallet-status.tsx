import { Wallet } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { motion } from "framer-motion"

export function WalletStatus() {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 border-zinc-800 bg-zinc-900 relative text-white overflow-hidden",
            "hover:bg-zinc-800 hover:text-zinc-100",
            "flex items-center gap-2 rounded-lg group"
          )}    
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <Wallet className="h-4 w-4 text-zinc-400 group-hover:text-zinc-100 transition-colors" />
            <span className="text-xs font-medium">0.00 ETH</span>
            <motion.span 
              className="size-2 rounded-full bg-green-500"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </Button>
      </TooltipTrigger>
      <TooltipContent 
        side="bottom" 
        align="end"
        className="bg-zinc-900 border-zinc-800"
      >
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-2"
        >
          <p className="text-sm font-semibold text-zinc-100">Connected to Ethereum</p>
          <p className="text-xs text-zinc-400 font-mono">0x1234...5678</p>
        </motion.div>
      </TooltipContent>
    </Tooltip>
  )
}
