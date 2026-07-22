import Drawer from "@/components/layout/Drawer";
import Providers from "@/context/Providers";
import { fraunces } from "@/fonts/fraunces";
import { geistMono } from "@/fonts/geist-mono";
import { nunito } from "@/fonts/nunito-sans";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Fernwood Pilates Studio",
    default: "Fernwood Pilates Studio",
  },
  authors: [
    {
      url: "https://narcisolobo.com",
      name: "Narciso Lobo",
    },
  ],
  robots: {
    index: false,
    follow: false,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      data-theme="autumn"
      className={`${nunito.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <Drawer>{children}</Drawer>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
