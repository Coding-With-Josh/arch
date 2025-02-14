import { create } from 'zustand'
import { useQuery } from '@tanstack/react-query'

interface DashboardStore {
  data: any | null
  error: Error | null
  isLoading: boolean
  refetch: () => Promise<void>
}

export const useDashboard = create<DashboardStore>((set) => ({
  data: null,
  error: null,
  isLoading: true,
  refetch: async () => {
    try {
      const res = await fetch('/api/dashboard')
      if (!res.ok) throw new Error('Failed to fetch dashboard data')
      const data = await res.json()
      set({ data, error: null, isLoading: false })
    } catch (error) {
      set({ error: error as Error, isLoading: false })
    }
  }
}))

export const useRealTimeDashboard = () => {
  const { data: dashboardData, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard')
      if (!res.ok) throw new Error('Failed to fetch dashboard data')
      return res.json()
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  return { dashboardData, refetch }
}
