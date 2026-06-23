import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bill Splitter",
  description: "Built during the Agent Harness 101 workshop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
