import type { Metadata, Viewport } from "next";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";
import { VercelAnalytics } from "@/lib/analytics/vercel";
import { geistMono, geistSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers/providers";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

export const metadata = {
  title: {
    default: "MeditateAI - Custom Meditation Audio Generated with AI",
    template: "%s | MeditateAI",
  },
  description: "Transform your meditation scripts into professional audio experiences with AI voice technology and background music.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo-light.svg",
        href: "/logo-light.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <head>{/* <GoogleAnalytics gaId="G-2L23D2FV55" /> */}</head>

        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            geistMono.variable,
            geistSans.variable,
          )}
        >
          <Providers attribute="class" defaultTheme="system" enableSystem>
            {children}
            <TailwindIndicator />
            <Toaster />
          </Providers>
          <VercelAnalytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
