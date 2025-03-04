import type { ReactNode } from "react";
import { Suspense } from "react";

import { MainContentLoader } from "@/components/dashboard/main-content-loader";

interface LayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: LayoutProps) {
  return (
      <Suspense fallback={<MainContentLoader />}>{children}</Suspense>
  );
}
