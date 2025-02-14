import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins, Space_Mono, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { ThemeProvider } from "next-themes";

const font = Inter({
  subsets: ["latin"],
  // weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  weight: ["400", "700"],
});
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

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
    <ClerkProvider>
        {/* <ThemeProvider> */}
        <html lang="en">
          <body className={font.className}>{children}</body>
        </html>
    {/* </ThemeProvider> */}
      </ClerkProvider>
  );
}
