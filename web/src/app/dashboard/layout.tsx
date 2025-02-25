import { Suspense } from "react"
import { DashboardShell } from "./shell"
import { MainContentLoader } from "@/components/dashboard/main-content-loader"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardShell>
      <Suspense 
        fallback={
          <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
          </div>
        }
      >
        {children}
      </Suspense>
    </DashboardShell>
  )
}