import { Calendar, CreditCard, Wallet, ChartLine, Users, Briefcase, Activity } from "lucide-react"
import List01 from "./list-01"
import List02 from "./list-02"
import List03 from "./list-03"
import StatsList from "./stats-list"
import TeamList from "./team-list"
import ActivityList from "./activity-list"

export default function Content() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <StatsList />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0F0F12] rounded-xl p-6 flex flex-col justify-start border border-[#1F1F23]">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <ChartLine className="w-4 h-4 text-zinc-50" />
              Financial Overview
            </h2>
            <List01 className="h-full" />
          </div>

          <div className="bg-[#0F0F12] rounded-xl p-6 flex flex-col justify-start border border-[#1F1F23]">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-zinc-50" />
              Recent Activity
            </h2>
            <ActivityList className="h-full" />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-[#0F0F12] rounded-xl p-6 flex flex-col justify-start border border-[#1F1F23]">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-zinc-50" />
              Team Members
            </h2>
            <TeamList className="h-full" />
          </div>

          <div className="bg-[#0F0F12] rounded-xl p-6 flex flex-col justify-start border border-[#1F1F23]">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-zinc-50" />
              Recent Transactions
            </h2>
            <List02 className="h-full" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0F0F12] rounded-xl p-6 flex flex-col justify-start border border-[#1F1F23]">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-zinc-50" />
            Projects Status
          </h2>
          <List03 />
        </div>

        <div className="bg-[#0F0F12] rounded-xl p-6 flex flex-col justify-start border border-[#1F1F23]">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-zinc-50" />
            Upcoming Tasks
          </h2>
          <List03 />
        </div>
      </div>
    </div>
  )
}

