"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { syncUser } from "@/lib/sync";
import { orgSync } from "@/lib/orgSync";
import { useUser } from "@clerk/nextjs";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const clerkOrgs = useUser()


  useEffect(() => {
    const handleSync = async () => {
      try {
        await syncUser();
        await orgSync(clerkOrgs)
      } catch (error) {
        if (error instanceof Error) {
          console.error('Sync error:', error.message);
          // Redirect to error page or show toast notification
          // router.push('/error');
        }
      }
    };

    handleSync();
  }, [router, clerkOrgs]);

  return <>{children}</>;
}
