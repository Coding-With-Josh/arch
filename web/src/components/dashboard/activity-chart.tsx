"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface ActivityChartProps {
  data: Array<{
    timestamp: string
    value: number
  }>
}

export function ActivityChart({ data }: ActivityChartProps) {
  // If no data, generate empty state data points
  const chartData = data.length ? data : Array.from({ length: 24 }, (_, i) => ({
    timestamp: `${i}h`,
    value: Math.random() * 0.1 // Tiny random values for empty state wave
  }))

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-zinc-200">Recent Activity</CardTitle>
        <CardDescription>Activity trends across all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="timestamp" 
                stroke="#52525b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#52525b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 shadow-md">
                        <p className="text-zinc-200 text-sm font-medium">
                          {payload[0].payload.value.toFixed(2)} actions
                        </p>
                        <p className="text-zinc-400 text-xs">
                          {payload[0].payload.timestamp}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "#2563eb",
                  stroke: "#1e40af",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4 mt-4">
          {data.length > 0 ? (
            <p className="text-center text-zinc-500 text-sm">Activity items will be shown here</p>
          ) : (
            <p className="text-center text-zinc-500 text-sm">No recent activity</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
