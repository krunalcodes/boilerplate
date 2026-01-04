import type { Metadata } from "next";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
