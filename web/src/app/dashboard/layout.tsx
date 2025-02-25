import { Suspense } from "react"
import { DashboardShell } from "./shell"
import { MainContentLoader } from "@/components/dashboard/main-content-loader"
import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <DashboardShell>
        <Suspense fallback={<MainContentLoader />}>
          {children}
        </Suspense>
      </DashboardShell>
    </div>
  )
}