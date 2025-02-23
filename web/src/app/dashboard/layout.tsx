import { Suspense } from "react"
import { DashboardShell } from "./shell"
import { MainContentLoader } from "@/components/dashboard/main-content-loader"
import type { ReactNode } from "react"
import { CommandCenter } from "@/components/dashboard/command"

interface LayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({ children }: LayoutProps) {
  return (
    <DashboardShell>
      <CommandCenter />
      <Suspense fallback={<MainContentLoader />}>
        {children}
      </Suspense>
    </DashboardShell>
  )
}