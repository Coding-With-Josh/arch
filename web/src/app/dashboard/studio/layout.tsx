import { Suspense } from "react";
import { MainContentLoader } from "@/components/dashboard/main-content-loader";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="w-screen min-h-screen">
      <Suspense fallback={<MainContentLoader />}>{children}</Suspense>
    </div>
  );
}
