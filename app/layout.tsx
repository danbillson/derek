import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Derek",
  description: "A recreational sports booking platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            GeistMono.variable
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
