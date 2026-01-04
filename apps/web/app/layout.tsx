import "@saas/ui/globals.css";

import { cn } from "@saas/ui/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";

import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const fontSans = localFont({
  src: [
    {
      path: "../public/fonts/Puvi_Thin.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Puvi_Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Puvi_Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Puvi_Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Puvi_Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Puvi_Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Puvi_Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
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
      <body className={cn(fontSans.className, "bg-background font-sans antialiased")}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Toaster position="bottom-center" />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
