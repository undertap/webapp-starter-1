import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className={cn("relative flex min-h-screen flex-col")}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
