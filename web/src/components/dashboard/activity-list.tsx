import { cn } from "@/lib/utils"
import { 
  Code2, 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  MessageSquare, 
  Package, 
  type LucideIcon 
} from "lucide-react"

interface Activity {
  id: string
  user: {
    name: string
    avatar: string
  }
  type: "commit" | "pr" | "deploy" | "comment" | "branch" | "package"
  project: string
  description: string
  timestamp: string
}

const iconMap: Record<Activity['type'], LucideIcon> = {
  commit: GitCommit,
  pr: GitPullRequest,
  deploy: Package,
  comment: MessageSquare,
  branch: GitBranch,
  package: Code2
}


export default function ActivityList({ className, activities }: { className?: string, activities: Activity[]}) {
  return (
    <div className={cn(
      "relative max-h-[500px] overflow-y-auto",
      "scrollbar-custom scrollbar-container",
      "rounded-lg",
      className
    )}>
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-800" />
      
      <div className="space-y-6">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type]
          
          return (
            <div key={activity.id} className="relative flex gap-4">
              {/* Timeline dot */}
              <div className="absolute left-6 w-2 h-2 rounded-full bg-zinc-800 -translate-x-1/2 translate-y-2" />
              
              {/* User avatar */}
              <div className="w-12 h-12 rounded-full bg-zinc-800/50 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-zinc-400">{activity.user.avatar}</span>
              </div>
              
              <div className="flex-1 bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-medium text-zinc-100">{activity.user.name}</span>
                  <span className="text-sm text-zinc-400">•</span>
                  <span className="text-sm text-zinc-400">{activity.project}</span>
                </div>
                <p className="text-sm text-zinc-300">{activity.description}</p>
                <span className="text-xs text-zinc-500 mt-2 block">{activity.timestamp}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
