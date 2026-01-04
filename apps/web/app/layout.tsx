import "@saas/ui/globals.css";

import { cn } from "@saas/ui/lib/utils";
import type { Metadata } from "next";
import { Geist as FontSans } from "next/font/google";
import { Toaster } from "sonner";

import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next.js project",
  description: "Next.js project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontSans.className, "bg-background font-sans antialiased min-h-screen")}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Toaster position="bottom-center" />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
