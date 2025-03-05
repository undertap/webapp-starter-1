import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroBackground } from "@/components/ui/hero-background";
import { AnimateInView } from "@/components/ui/animate-in-view";

export const metadata = {
  title: "Meditation Categories | MeditateAI",
  description: "Explore our personalized meditation categories designed for your unique life journey",
};

// Meditation categories with descriptions and images
const categories = [
  {
    title: "Personal Growth",
    description: "Guided meditations for self-improvement and personal development",
    href: "/meditations/personal-growth",
    image: "/images/categories/personal-growth.jpg",
  },
  {
    title: "Stress Management",
    description: "Calm your mind and reduce anxiety with personalized techniques",
    href: "/meditations/stress-management",
    image: "/images/categories/stress-management.jpg",
  },
  {
    title: "Sleep Improvement",
    description: "Deep relaxation practices designed to improve sleep quality",
    href: "/meditations/sleep-improvement",
    image: "/images/categories/sleep-improvement.jpg",
  },
  {
    title: "Life Transitions",
    description: "Support during major life changes and new beginnings",
    href: "/meditations/life-transitions",
    image: "/images/categories/life-transitions.jpg",
  },
  {
    title: "Health Challenges",
    description: "Meditative approaches to support your healing journey",
    href: "/meditations/health-challenges",
    image: "/images/categories/health-challenges.jpg",
  },
  {
    title: "Work-Life Balance",
    description: "Find harmony between professional demands and personal wellbeing",
    href: "/meditations/work-life-balance",
    image: "/images/categories/work-life-balance.jpg",
  },
  {
    title: "Relationship Healing",
    description: "Practices to foster connection and emotional understanding",
    href: "/meditations/relationship-healing",
    image: "/images/categories/relationship-healing.jpg",
  },
  {
    title: "Emotional Wellness",
    description: "Develop emotional resilience and process feelings mindfully",
    href: "/meditations/emotional-wellness",
    image: "/images/categories/emotional-wellness.jpg",
  },
  {
    title: "Trauma Recovery",
    description: "Gentle approaches to support healing from past experiences",
    href: "/meditations/trauma-recovery",
    image: "/images/categories/trauma-recovery.jpg",
  },
  {
    title: "Daily Mindfulness",
    description: "Short practices to integrate awareness into everyday moments",
    href: "/meditations/daily-mindfulness",
    image: "/images/categories/daily-mindfulness.jpg",
  },
];

export default function MeditationsPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full min-h-[60vh] relative">
        <HeroBackground>
          <div className="container px-8 md:px-12 py-16 md:py-24">
            <div className="max-w-xl space-y-4">
              <AnimateInView direction="up">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3d5351]">
                  Meditation Categories
                </h1>
              </AnimateInView>
              
              <AnimateInView direction="up" delay={0.1}>
                <p className="text-xl text-[#557373]">
                  Explore personalized meditation experiences tailored to your life journey and specific needs.
                </p>
              </AnimateInView>
            </div>
          </div>
        </HeroBackground>
      </section>

      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.title} href={category.href} className="group">
              <Card className="h-full overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-teal-200 transition-all">
                <div className="relative h-48 w-full bg-slate-100">
                  <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
                    {/* Placeholder for actual images */}
                    <span className="text-lg font-medium">{category.title}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {category.title}
                  </h2>
                  <p className="text-slate-600 mt-2 mb-4">
                    {category.description}
                  </p>
                  <div className="text-teal-600 font-medium flex items-center mt-auto group-hover:text-teal-700">
                    Explore <ArrowRight className="ml-1 size-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="w-full py-16 bg-[#557373] text-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#f2efea]">
              Ready to Start Your Meditation Journey?
            </h2>
            <p className="text-[#f2efea]/90 text-lg max-w-2xl">
              Create your first personalized meditation experience today and discover the benefits of AI-tailored mindfulness.
            </p>
            <Button size="lg" className="mt-4 bg-[#f2efea] text-[#557373] hover:bg-[#dfe5f3] transition-colors shadow-lg">
              Create Your First Meditation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 