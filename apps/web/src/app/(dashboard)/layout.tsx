"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Home, 
  Plus, 
  Library, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Headphones, 
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  
  // Handle auth redirect
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/signin');
    }
  }, [isLoaded, isSignedIn, router]);
  
  // Show loading state or return null while checking auth status
  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f2efea]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#557373] border-r-transparent align-[-0.125em]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Create Meditation", href: "/create", icon: Plus },
    { name: "My Meditations", href: "/meditations", icon: Library },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#f2efea]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-1 flex-col border-r bg-white">
          <div className="flex h-16 flex-shrink-0 items-center px-4">
            <Link href="/dashboard" className="flex items-center">
              <Headphones className="h-8 w-8 text-[#557373]" />
              <span className="ml-2 text-lg font-semibold text-[#557373]">MeditateAI</span>
            </Link>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    pathname === item.href
                      ? "bg-[#557373]/10 text-[#557373]"
                      : "text-gray-600 hover:bg-[#557373]/5 hover:text-[#557373]",
                    "group flex items-center rounded-md px-3 py-3 text-sm font-medium"
                  )}
                >
                  <item.icon
                    className={cn(
                      pathname === item.href
                        ? "text-[#557373]"
                        : "text-gray-400 group-hover:text-[#557373]",
                      "mr-3 h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t p-4">
            <div className="flex items-center">
              <div className="ml-3 flex w-full justify-between items-center">
                <div className="flex gap-3 items-center">
                  <UserButton afterSignOutUrl="/" />
                  <div className="text-sm font-medium text-gray-700">My Account</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => signOut({ redirectUrl: "/" })}
                  className="text-gray-400 hover:text-[#557373]"
                  aria-label="Sign out"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu */}
      <div className="md:hidden flex items-center h-16 px-4 bg-white border-b w-full">
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="flex justify-between w-full items-center">
            <Link href="/dashboard" className="flex items-center">
              <Headphones className="h-7 w-7 text-[#557373]" />
              <span className="ml-2 text-lg font-semibold text-[#557373]">MeditateAI</span>
            </Link>
            <div className="flex items-center gap-2">
              <UserButton afterSignOutUrl="/" />
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
            </div>
          </div>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b px-4 py-6">
                <Link href="/dashboard" className="flex items-center" onClick={() => setOpen(false)}>
                  <Headphones className="h-6 w-6 text-[#557373]" />
                  <span className="ml-2 text-lg font-semibold text-[#557373]">MeditateAI</span>
                </Link>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetTrigger>
              </div>
              <nav className="mt-6 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? "bg-[#557373]/10 text-[#557373]"
                        : "text-gray-600 hover:bg-[#557373]/5 hover:text-[#557373]",
                      "group flex items-center rounded-md px-3 py-3 text-sm font-medium"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        pathname === item.href
                          ? "text-[#557373]"
                          : "text-gray-400 group-hover:text-[#557373]",
                        "mr-3 h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto border-t p-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setOpen(false);
                    signOut({ redirectUrl: "/" });
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-[#f2efea]">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
} 