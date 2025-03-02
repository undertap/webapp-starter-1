"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MegaMenuItem {
  category: string;
  description: string;
  href: string;
}

interface MegaMenuProps {
  trigger: React.ReactNode;
  items: MegaMenuItem[];
  className?: string;
}

export function MegaMenu({ trigger, items, className }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className={cn("relative", className)} 
      ref={menuRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div 
        className="flex items-center gap-1 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
        <ChevronDown className={cn(
          "size-4 text-slate-500 transition-transform duration-200", 
          isOpen && "rotate-180"
        )} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-screen max-w-4xl bg-white/90 backdrop-blur-sm shadow-lg rounded-md border border-slate-200 overflow-hidden z-50">
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-3 rounded-md hover:bg-teal-50/80 transition-colors group"
              >
                <div className="font-medium text-teal-700 group-hover:text-teal-800 mb-1">
                  {item.category}
                </div>
                <div className="text-sm text-slate-600">
                  {item.description}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 