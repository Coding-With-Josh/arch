import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ClientLayout from "./client-layout";
import { useUser } from "@clerk/nextjs";

const font = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Arch",
  description: "Build. Ship. Scale.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkOrgs = useUser()
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ClientLayout clerkOrgs={clerkOrgs}>{children}</ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
