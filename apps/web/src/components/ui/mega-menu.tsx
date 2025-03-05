"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MegaMenuItem {
  category: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
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
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-screen max-w-4xl bg-[#f2efea]/90 backdrop-blur-sm shadow-xl rounded-xl border border-[#557373]/20 overflow-hidden z-50">
          <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-4 rounded-lg hover:bg-[#dfe5f3]/80 transition-colors group"
              >
                <div className="flex items-center gap-2 font-medium text-[#557373] group-hover:text-[#557373]/80 mb-2">
                  {item.icon && <div className="text-[#557373] flex-shrink-0">{item.icon}</div>}
                  {item.category}
                </div>
                <div className="text-sm text-[#272401]/80">
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