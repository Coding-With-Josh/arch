import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const team = [
  {
    name: "Alex Johnson",
    role: "Lead Developer",
    status: "online",
    avatar: "AJ",
  },
  {
    name: "Sarah Miller",
    role: "UI Designer",
    status: "offline",
    avatar: "SM",
  },
  {
    name: "David Chen",
    role: "Backend Dev",
    status: "online",
    avatar: "DC",
  },
]

export default function TeamList({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {team.map((member) => (
        <div key={member.name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors">
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-100">
            {member.avatar}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-zinc-100">{member.name}</h3>
            <p className="text-xs text-zinc-400">{member.role}</p>
          </div>
          <Badge variant="outline" className={cn(
            "text-xs",
            member.status === "online" ? "border-emerald-500/20 text-emerald-500" : "border-zinc-800 text-zinc-400"
          )}>
            {member.status}
          </Badge>
        </div>
      ))}
    </div>
  )
}
