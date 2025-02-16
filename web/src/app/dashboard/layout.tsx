import type { ReactNode } from "react"
import { DashboardShell } from "./shell"

interface LayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({ children }: LayoutProps) {
  return <DashboardShell>{children}</DashboardShell>
}