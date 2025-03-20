"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";

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
import { 
  Menu, 
  Sparkles, 
  Shield, 
  Moon, 
  Leaf, 
  Heart, 
  Scale, 
  Users, 
  SmilePlus, 
  Flower2, 
  Clock,
  Headphones,
  UserCircle
} from "lucide-react";
import { MegaMenu } from "@/components/ui/mega-menu";

// Define meditation categories for the mega menu
const meditationCategories = [
  {
    category: "Personal Growth",
    description: "Guided meditations for self-improvement and personal development",
    href: "/meditations/personal-growth",
    icon: <Sparkles className="size-5" />,
  },
  {
    category: "Stress Management",
    description: "Calm your mind and reduce anxiety with personalized techniques",
    href: "/meditations/stress-management",
    icon: <Shield className="size-5" />,
  },
  {
    category: "Sleep Improvement",
    description: "Deep relaxation practices designed to improve sleep quality",
    href: "/meditations/sleep-improvement",
    icon: <Moon className="size-5" />,
  },
  {
    category: "Life Transitions",
    description: "Support during major life changes and new beginnings",
    href: "/meditations/life-transitions",
    icon: <Leaf className="size-5" />,
  },
  {
    category: "Health Challenges",
    description: "Meditative approaches to support your healing journey",
    href: "/meditations/health-challenges",
    icon: <Heart className="size-5" />,
  },
  {
    category: "Work-Life Balance",
    description: "Find harmony between professional demands and personal wellbeing",
    href: "/meditations/work-life-balance",
    icon: <Scale className="size-5" />,
  },
  {
    category: "Relationship Healing",
    description: "Practices to foster connection and emotional understanding",
    href: "/meditations/relationship-healing",
    icon: <Users className="size-5" />,
  },
  {
    category: "Emotional Wellness",
    description: "Develop emotional resilience and process feelings mindfully",
    href: "/meditations/emotional-wellness",
    icon: <SmilePlus className="size-5" />,
  },
  {
    category: "Trauma Recovery",
    description: "Gentle approaches to support healing from past experiences",
    href: "/meditations/trauma-recovery",
    icon: <Flower2 className="size-5" />,
  },
  {
    category: "Daily Mindfulness",
    description: "Short practices to integrate awareness into everyday moments",
    href: "/meditations/daily-mindfulness",
    icon: <Clock className="size-5" />,
  },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full flex justify-center pt-4">
      <div className="bg-[#f2efea]/70 backdrop-blur-md rounded-full border border-[#557373]/20 shadow-lg max-w-7xl w-[95%] mx-auto">
        <div className="flex h-14 items-center relative px-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/metacalm-logo.svg" 
              alt="MetaCalm" 
              width={150} 
              height={32} 
              priority 
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="hidden md:flex md:gap-6 absolute left-1/2 transform -translate-x-1/2">
              <Link
                href="/"
                className={cn(
                  "text-base transition-colors hover:text-[#557373]",
                  pathname === "/"
                    ? "text-[#557373] font-medium"
                    : "text-slate-700"
                )}
              >
                Home
              </Link>
              
              {/* Mega Menu for Meditations */}
              <MegaMenu 
                trigger={
                  <div className="px-4 py-2 -mx-4 -my-2">
                    <span className={cn(
                      "flex items-center gap-1.5 text-base transition-colors hover:text-[#557373]",
                      pathname.includes("/meditation-library")
                        ? "text-[#557373] font-medium"
                        : "text-slate-700"
                    )}>
                      <Headphones className="size-4" />
                      Meditations
                    </span>
                  </div>
                } 
                items={meditationCategories}
              />
              
              <Link
                href="/about"
                className={cn(
                  "text-base transition-colors hover:text-[#557373]",
                  pathname === "/about"
                    ? "text-[#557373] font-medium"
                    : "text-slate-700"
                )}
              >
                About Us
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  "text-base transition-colors hover:text-[#557373]",
                  pathname === "/pricing"
                    ? "text-[#557373] font-medium"
                    : "text-slate-700"
                )}
              >
                Pricing
              </Link>
            </nav>
            <div className="flex gap-2">
              {isLoaded && isSignedIn ? (
                <Link
                  href="/dashboard"
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors bg-[#557373] hover:bg-[#557373]/90 text-[#f2efea] shadow-sm flex items-center gap-1.5"
                >
                  <UserCircle className="h-4 w-4" />
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium transition-colors hover:text-[#557373] text-[#557373] px-3 py-1.5"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors bg-[#557373] hover:bg-[#557373]/90 text-[#f2efea] shadow-sm"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-[#557373]/30 text-[#557373]">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#f2efea]/95 border-[#557373]/20">
                <div className="grid gap-6 pt-6 text-lg">
                  <Link
                    href="/"
                    className="font-medium transition-colors hover:text-[#557373]"
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </Link>
                  
                  {/* Mobile menu for meditations - keeps click functionality */}
                  <div className="space-y-3">
                    <Link
                      href="/meditation-library"
                      className="font-medium transition-colors hover:text-[#557373] flex items-center gap-2"
                      onClick={() => setOpen(false)}
                    >
                      <Headphones className="size-4 text-[#557373]" />
                      Meditations
                    </Link>
                    <div className="pl-4 border-l border-[#557373]/20 space-y-2">
                      {meditationCategories.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block text-base text-slate-700 hover:text-[#557373] flex items-center gap-2"
                          onClick={() => setOpen(false)}
                        >
                          <span className="text-[#557373] flex-shrink-0">{item.icon}</span>
                          <span>{item.category}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <Link
                    href="/about"
                    className="font-medium transition-colors hover:text-[#557373]"
                    onClick={() => setOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/pricing"
                    className="font-medium transition-colors hover:text-[#557373]"
                    onClick={() => setOpen(false)}
                  >
                    Pricing
                  </Link>
                  
                  <div className="flex flex-col gap-3 pt-4">
                    {isLoaded && isSignedIn ? (
                      <Link
                        href="/dashboard"
                        className="w-full rounded-md bg-[#557373] px-4 py-2 text-center font-medium text-base text-[#f2efea] transition-colors hover:bg-[#557373]/90 flex items-center justify-center gap-2"
                        onClick={() => setOpen(false)}
                      >
                        <UserCircle className="h-5 w-5" />
                        Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="w-full rounded-md px-4 py-2 text-center font-medium text-base transition-colors border border-[#557373]/30 hover:bg-[#dfe5f3] hover:text-[#557373] text-[#557373]"
                          onClick={() => setOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          href="/signup"
                          className="w-full rounded-md bg-[#557373] px-4 py-2 text-center font-medium text-base text-[#f2efea] transition-colors hover:bg-[#557373]/90"
                          onClick={() => setOpen(false)}
                        >
                          Sign up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
