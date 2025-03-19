import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import ClientLayout from "./client-layout";
import { SonicProvider } from "./sonic-provider";

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
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={font.className}>
          <SonicProvider>
            <ClientLayout>{children}</ClientLayout>
          </SonicProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
