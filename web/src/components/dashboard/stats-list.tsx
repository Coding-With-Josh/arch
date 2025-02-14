import { ArrowUpRight, ArrowDownRight, DollarSign, Users, Briefcase, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export default function StatsList(stats: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat: any) => (
        <div
          key={stat.title}
          className="bg-[#0F0F12] rounded-xl p-6 border border-[#1F1F23]"
        >
          <div className="flex items-center justify-between">
            <stat.icon className="w-5 h-5 text-zinc-400" />
            {stat.trend === "up" ? (
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            )}
          </div>
          <div className="mt-4">
            <p className="text-sm text-zinc-400">{stat.title}</p>
            <p className="text-2xl font-semibold text-zinc-100 mt-1">{stat.value}</p>
            <p className={cn(
              "text-sm mt-2",
              stat.trend === "up" ? "text-emerald-500" : "text-red-500"
            )}>
              {stat.change} from last month
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
