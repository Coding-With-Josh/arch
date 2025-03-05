"use client";

import { useEffect, useState } from "react";
import { Paddle } from "@paddle/paddle-js";
import { useRouter } from "next/navigation";
import { syncUser } from "@/lib/sync";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();



  useEffect(() => {

    const handleSync = async () => {
      try {
        await syncUser();
      } catch (error) {
        if (error instanceof Error) {
          console.error('Sync error:', error.message);
          // Redirect to error page or show toast notification
          // router.push('/error');
        }
      }
    };

    handleSync();
  }, [router]);

  return <>{children}</>;
}
