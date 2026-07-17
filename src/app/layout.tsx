import Drawer from "@/components/layout/Drawer";
import { geistMono } from "@/fonts/geist-mono";
import { inter } from "@/fonts/inter";
import { oswald } from "@/fonts/oswald";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neon Core",
  description:
    "Neon Core is a fictional Pilates studio site set in West Hollywood, built to showcase full-stack architecture and design skills — a content-driven small business site with class schedules, instructor bios, membership pricing, and a studio gallery, paired with a working admin dashboard for roster check-ins, waitlists, and billing, all built on Next.js with a Supabase backend.",
};

interface RootLayoutProps {
  children: ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      data-theme="autumn"
      className={`${inter.variable} ${oswald.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Drawer>{children}</Drawer>
      </body>
    </html>
  );
}

export default RootLayout;
