import { Activity, FileCode, GitBranch, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
    return (
        <div className="min-h-[calc(100vh-80px)] space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
                <p className="text-sm text-zinc-400">Welcome to your dashboard</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-zinc-200">Total Projects</CardTitle>
                        <FileCode className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">12</div>
                        <p className="text-xs text-zinc-500">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-zinc-200">Active Deployments</CardTitle>
                        <Activity className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">8</div>
                        <p className="text-xs text-zinc-500">+1 from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-zinc-200">Team Members</CardTitle>
                        <Users className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">5</div>
                        <p className="text-xs text-zinc-500">+3 this week</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-zinc-200">Git Commits</CardTitle>
                        <GitBranch className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">132</div>
                        <p className="text-xs text-zinc-500">+22 from last week</p>
                    </CardContent>
                </Card>
            </div>

            {/* Activity Feed */}
            <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-zinc-200">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Activity Items */}
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 text-sm text-zinc-400">
                                <div className="size-2 rounded-full bg-zinc-700" />
                                <div className="flex-1">Updated project settings</div>
                                <div className="text-zinc-500">2h ago</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}