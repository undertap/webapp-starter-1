"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { MegaMenu } from "@/components/ui/mega-menu";

// Define meditation categories for the mega menu
const meditationCategories = [
  {
    category: "Personal Growth",
    description: "Guided meditations for self-improvement and personal development",
    href: "/meditations/personal-growth",
  },
  {
    category: "Stress Management",
    description: "Calm your mind and reduce anxiety with personalized techniques",
    href: "/meditations/stress-management",
  },
  {
    category: "Sleep Improvement",
    description: "Deep relaxation practices designed to improve sleep quality",
    href: "/meditations/sleep-improvement",
  },
  {
    category: "Life Transitions",
    description: "Support during major life changes and new beginnings",
    href: "/meditations/life-transitions",
  },
  {
    category: "Health Challenges",
    description: "Meditative approaches to support your healing journey",
    href: "/meditations/health-challenges",
  },
  {
    category: "Work-Life Balance",
    description: "Find harmony between professional demands and personal wellbeing",
    href: "/meditations/work-life-balance",
  },
  {
    category: "Relationship Healing",
    description: "Practices to foster connection and emotional understanding",
    href: "/meditations/relationship-healing",
  },
  {
    category: "Emotional Wellness",
    description: "Develop emotional resilience and process feelings mindfully",
    href: "/meditations/emotional-wellness",
  },
  {
    category: "Trauma Recovery",
    description: "Gentle approaches to support healing from past experiences",
    href: "/meditations/trauma-recovery",
  },
  {
    category: "Daily Mindfulness",
    description: "Short practices to integrate awareness into everyday moments",
    href: "/meditations/daily-mindfulness",
  },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200/30 bg-white/50 backdrop-blur-md">
      <div className="container flex h-16 items-center relative px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-lg font-bold text-slate-900">MeditateAI</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex md:gap-6 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              className={cn(
                "text-base transition-colors hover:text-teal-700",
                pathname === "/"
                  ? "text-teal-700 font-medium"
                  : "text-slate-700"
              )}
            >
              Home
            </Link>
            
            {/* Mega Menu for Meditations */}
            <MegaMenu 
              trigger={
                <span className={cn(
                  "text-base transition-colors hover:text-teal-700",
                  pathname.includes("/meditations")
                    ? "text-teal-700 font-medium"
                    : "text-slate-700"
                )}>
                  Meditations
                </span>
              } 
              items={meditationCategories}
            />
            
            <Link
              href="/about"
              className={cn(
                "text-base transition-colors hover:text-teal-700",
                pathname === "/about"
                  ? "text-teal-700 font-medium"
                  : "text-slate-700"
              )}
            >
              About
            </Link>
            <Link
              href="/pricing"
              className={cn(
                "text-base transition-colors hover:text-teal-700",
                pathname === "/pricing"
                  ? "text-teal-700 font-medium"
                  : "text-slate-700"
              )}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-base transition-colors hover:text-teal-700",
                pathname === "/contact"
                  ? "text-teal-700 font-medium"
                  : "text-slate-700"
              )}
            >
              Contact
            </Link>
          </nav>
          <div className="flex gap-2">
            <Link
              href="/login"
              className="text-base transition-colors hover:text-teal-900 text-teal-700 font-medium px-4 py-2"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-md text-base transition-colors bg-teal-600 hover:bg-teal-700 text-white"
            >
              Sign up
            </Link>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 pt-6 text-lg">
                <Link
                  href="/"
                  className="font-medium transition-colors hover:text-teal-700"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
                
                {/* Mobile menu for meditations - keeps click functionality */}
                <div className="space-y-3">
                  <Link
                    href="/meditations"
                    className="font-medium transition-colors hover:text-teal-700"
                    onClick={() => setOpen(false)}
                  >
                    Meditations
                  </Link>
                  <div className="pl-4 border-l border-slate-200 space-y-2">
                    {meditationCategories.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block text-base text-slate-700 hover:text-teal-700"
                        onClick={() => setOpen(false)}
                      >
                        {item.category}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <Link
                  href="/about"
                  className="font-medium transition-colors hover:text-teal-700"
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/pricing"
                  className="font-medium transition-colors hover:text-teal-700"
                  onClick={() => setOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  className="font-medium transition-colors hover:text-teal-700"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
                <div className="flex flex-col gap-3 pt-4">
                  <Link
                    href="/login"
                    className="w-full rounded-md px-4 py-2 text-center font-medium text-base transition-colors border border-slate-200 hover:bg-teal-50 hover:text-teal-700"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full rounded-md bg-teal-600 px-4 py-2 text-center font-medium text-base text-white transition-colors hover:bg-teal-700"
                    onClick={() => setOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
