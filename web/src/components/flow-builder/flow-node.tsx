"use client"

import { cn } from "@/lib/utils"
import { Zap, Filter, Mail, Clock } from "lucide-react"

interface FlowNodeProps {
  id: string
  type: "trigger" | "action" | "conditional" | "delay"
  label: string
  description?: string
  selected?: boolean
  onClick?: () => void
}

export function FlowNode({ id, type, label, description, selected, onClick }: FlowNodeProps) {
  const getNodeIcon = () => {
    switch (type) {
      case "trigger":
        return <Zap className="h-4 w-4 text-yellow-500" />
      case "action":
        return <Mail className="h-4 w-4 text-blue-500" />
      case "conditional":
        return <Filter className="h-4 w-4 text-purple-500" />
      case "delay":
        return <Clock className="h-4 w-4 text-green-500" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const getNodeColor = () => {
    switch (type) {
      case "trigger":
        return "border-yellow-200 bg-yellow-50"
      case "action":
        return "border-blue-200 bg-blue-50"
      case "conditional":
        return "border-purple-200 bg-purple-50"
      case "delay":
        return "border-green-200 bg-green-50"
      default:
        return "border-gray-200 bg-background"
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-md border p-3 shadow-sm cursor-pointer",
        getNodeColor(),
        selected && "ring-2 ring-primary",
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-center mb-1">{getNodeIcon()}</div>
      <div className="text-center">
        <div className="font-medium text-sm">{label}</div>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
      </div>
    </div>
  )
}

