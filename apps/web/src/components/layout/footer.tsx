import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-[#f2efea] border-t border-[#557373]/10">
      <div className="container mx-auto px-6 py-12 md:py-16">
        {/* Top section with logo and links */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Logo and description */}
          <div className="md:col-span-4 lg:col-span-5">
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#557373]">
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">M</div>
                </div>
                <span className="text-xl font-bold text-[#272401]">MeditateAI</span>
              </Link>
              <p className="text-[#557373] max-w-sm">
                AI-generated meditations that adapt to your life story, challenges, and health patterns for a truly personalized experience.
              </p>
            </div>
          </div>

          {/* Navigation links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-8 lg:col-span-7 lg:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#557373]">Platform</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/meditations" className="text-sm text-[#272401]/80 hover:text-[#557373] transition-colors">
                    Meditations
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-[#272401]/80 hover:text-[#557373] transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-[#272401]/80 hover:text-[#557373] transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#557373]">Resources</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/blog" className="text-sm text-[#272401]/80 hover:text-[#557373] transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-sm text-[#272401]/80 hover:text-[#557373] transition-colors">
                    Meditation Guides
                  </Link>
                </li>
                <li>
                  <Link href="/research" className="text-sm text-[#272401]/80 hover:text-[#557373] transition-colors">
                    Research
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#557373]">Company</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/careers" className="text-sm text-[#272401]/80 hover:text-[#557373] transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-sm text-[#272401]/80 hover:text-[#557373] transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-[#272401]/80 hover:text-[#557373] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#557373]">Legal</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/privacy" className="text-sm text-[#272401]/80 hover:text-[#557373] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-[#272401]/80 hover:text-[#557373] transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-sm text-[#272401]/80 hover:text-[#557373] transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-[#557373]/10" />

        {/* Bottom section with social links and copyright */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex space-x-6">
            <Link href="https://twitter.com" aria-label="Twitter" className="text-[#557373] hover:text-[#557373]/80 transition-colors">
              <Twitter className="size-5" />
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram" className="text-[#557373] hover:text-[#557373]/80 transition-colors">
              <Instagram className="size-5" />
            </Link>
            <Link href="https://facebook.com" aria-label="Facebook" className="text-[#557373] hover:text-[#557373]/80 transition-colors">
              <Facebook className="size-5" />
            </Link>
            <Link href="https://youtube.com" aria-label="YouTube" className="text-[#557373] hover:text-[#557373]/80 transition-colors">
              <Youtube className="size-5" />
            </Link>
          </div>
          <p className="text-sm text-[#272401]/60">
            &copy; {new Date().getFullYear()} MeditateAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 