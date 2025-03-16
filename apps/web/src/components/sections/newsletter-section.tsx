import { ArrowUpRight } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="bg-[#f2efea] py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="rounded-xl bg-[#dfe5f3]/30 p-6 md:p-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-[#272401]">Join our meditation journey</h3>
            <p className="mt-2 max-w-md text-[#557373]">
              Sign up for our newsletter to receive meditation tips, new features, and exclusive content.
            </p>
            <div className="mt-4 flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-[#557373]/20 bg-white px-4 py-2 text-sm focus:border-[#557373] focus:outline-none"
              />
              <button className="rounded-md bg-[#557373] px-4 py-2 text-sm font-medium text-white hover:bg-[#557373]/90 transition-colors whitespace-nowrap flex items-center">
                Subscribe <ArrowUpRight className="ml-1 size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 