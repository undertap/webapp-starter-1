import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Headphones, Music, Sparkles, Mic, Volume2, Heart, LineChart, Bell, Clock, Star, Shield, Moon, Leaf, Scale, Users, SmilePlus, Flower2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateInView } from "@/components/ui/animate-in-view";
import { HeroBackground } from "@/components/ui/hero-background";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full min-h-[90vh] relative flex items-center justify-center py-16 md:py-24 lg:py-32">
        {/* Background Image with Fallback Gradient */}
        <HeroBackground />
        <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimateInView direction="up" className="space-y-6">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Meditation Tailored to  
                <span className="block mt-2">Your Personal Journey</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-[800px] mx-auto">
                AI-generated meditations that adapt to your life story, challenges, and health patterns for a truly transformative experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-white text-teal-700 hover:bg-white/90 transition-colors">
                  Try For Free <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Premium Features
                </Button>
              </div>
              <p className="text-base text-white/70 pt-2">
                Start with one free personalized meditation. Unlock unlimited with premium.
              </p>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-16 md:py-20 bg-slate-50">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateInView className="text-center mb-12">
            <h6 className="text-sm font-medium uppercase tracking-wider text-teal-600 mb-2">
              Personalized For Your Needs
            </h6>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Meditation For Your Life Journey
            </h2>
          </AnimateInView>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <AnimateInView 
                key={category.name} 
                delay={0.05 * index} 
                className="flex flex-col items-center w-full"
              >
                <Link href={category.href} className="w-full group">
                  <Button 
                    variant="outline" 
                    className="w-full h-auto py-4 px-3 rounded-md border border-slate-200 bg-white hover:bg-white group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-teal-50/60 group-hover:border-teal-200 group-hover:shadow-md transition-all duration-300 ease-in-out"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-teal-600 group-hover:text-teal-700 transition-colors duration-300">{category.icon}</span>
                      <span className="text-slate-700 group-hover:text-teal-700 text-base font-medium transition-colors duration-300">{category.name}</span>
                    </div>
                  </Button>
                </Link>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 md:py-20 bg-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateInView className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Your Meditation Journey
            </h2>
            <p className="max-w-[85%] text-slate-600 text-lg">
              Personalized meditation that evolves with you
            </p>
          </AnimateInView>
          <div className="mx-auto grid gap-8 md:grid-cols-3 md:gap-12 mt-12">
            <AnimateInView delay={0.1} className="flex flex-col items-center space-y-4 text-center">
              <div className="relative mb-4 flex size-20 items-center justify-center rounded-full bg-teal-50">
                <Mic className="size-10 text-teal-600" />
                <span className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-teal-600 text-white">
                  1
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Share Your Story</h3>
              <p className="text-slate-600 text-base">
                Tell us about your life journey, challenges, and aspirations. The more we know, the more personalized your experience.
              </p>
            </AnimateInView>
            <AnimateInView delay={0.2} className="flex flex-col items-center space-y-4 text-center">
              <div className="relative mb-4 flex size-20 items-center justify-center rounded-full bg-teal-50">
                <Sparkles className="size-10 text-teal-600" />
                <span className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-teal-600 text-white">
                  2
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">AI Creates Your Meditation</h3>
              <p className="text-slate-600 text-base">
                Our AI crafts a custom meditation script that speaks directly to your personal situation, needs, and goals.
              </p>
            </AnimateInView>
            <AnimateInView delay={0.3} className="flex flex-col items-center space-y-4 text-center">
              <div className="relative mb-4 flex size-20 items-center justify-center rounded-full bg-teal-50">
                <Heart className="size-10 text-teal-600" />
                <span className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-teal-600 text-white">
                  3
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Improve With Your Feedback</h3>
              <p className="text-slate-600 text-base">
                Your meditation experience improves over time as our AI learns from your feedback and health metrics.
              </p>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateInView className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Personalized Meditation Technology
            </h2>
            <p className="max-w-[85%] text-slate-600 text-lg">
              Advanced features designed around your unique meditation journey
            </p>
          </AnimateInView>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <AnimateInView key={feature.title} delay={0.1 * index} className="h-full">
                <Card className="h-full border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-teal-200 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-50">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{feature.title}</h3>
                        <p className="text-base text-slate-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-16 md:py-20 bg-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateInView className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Simple Pricing
            </h2>
            <p className="max-w-[85%] text-slate-600 text-lg">
              Start your personalized meditation journey today
            </p>
          </AnimateInView>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12 max-w-4xl mx-auto">
            <AnimateInView delay={0.1} className="h-full">
              <Card className="h-full border border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900">Free</h3>
                    <p className="text-slate-600 mt-1">Begin your journey</p>
                  </div>
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-slate-900">$0</p>
                  </div>
                  <ul className="space-y-3 mb-6 flex-grow">
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 size-5 text-teal-500" />
                      <span className="text-slate-600 text-base">1 personalized meditation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 size-5 text-teal-500" />
                      <span className="text-slate-600">Basic health metrics integration</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 size-5 text-teal-500" />
                      <span className="text-slate-600">Save and replay your meditation</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </AnimateInView>

            <AnimateInView delay={0.2} className="h-full">
              <Card className="h-full border-2 border-teal-500 bg-white shadow-md">
                <div className="bg-teal-500 py-1.5 text-center text-white text-sm font-medium">
                  RECOMMENDED
                </div>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900">Premium</h3>
                    <p className="text-slate-600 mt-1">Full personalized experience</p>
                  </div>
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-slate-900">$9.99<span className="text-lg font-normal text-slate-600">/month</span></p>
                  </div>
                  <ul className="space-y-3 mb-6 flex-grow">
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 size-5 text-teal-500" />
                      <span className="text-slate-600">Unlimited personalized meditations</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 size-5 text-teal-500" />
                      <span className="text-slate-600">Advanced health tracking integration</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 size-5 text-teal-500" />
                      <span className="text-slate-600">Progress tracking and insights</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 size-5 text-teal-500" />
                      <span className="text-slate-600">Personalized reminders</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 size-5 text-teal-500" />
                      <span className="text-slate-600">Priority AI improvements</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                    Upgrade to Premium
                  </Button>
                </CardContent>
              </Card>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateInView direction="up" className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Begin Your Personalized Meditation Journey
            </h2>
            <p className="max-w-[85%] text-white/90 text-lg">
              Create meditation experiences that understand your unique life story and evolve with you.
            </p>
            <Button size="lg" className="mt-6 bg-white text-teal-600 hover:bg-white/90">
              Start Your Free Meditation
            </Button>
          </AnimateInView>
        </div>
      </section>
    </div>
  );
}

const categories = [
  { name: "Personal Growth", href: "/meditations/personal-growth", icon: <Sparkles className="size-5" /> },
  { name: "Stress Management", href: "/meditations/stress-management", icon: <Shield className="size-5" /> },
  { name: "Sleep Improvement", href: "/meditations/sleep-improvement", icon: <Moon className="size-5" /> },
  { name: "Life Transitions", href: "/meditations/life-transitions", icon: <Leaf className="size-5" /> },
  { name: "Health Challenges", href: "/meditations/health-challenges", icon: <Heart className="size-5" /> },
  { name: "Work-Life Balance", href: "/meditations/work-life-balance", icon: <Scale className="size-5" /> },
  { name: "Relationship Healing", href: "/meditations/relationship-healing", icon: <Users className="size-5" /> },
  { name: "Emotional Wellness", href: "/meditations/emotional-wellness", icon: <SmilePlus className="size-5" /> },
  { name: "Trauma Recovery", href: "/meditations/trauma-recovery", icon: <Flower2 className="size-5" /> },
  { name: "Daily Mindfulness", href: "/meditations/daily-mindfulness", icon: <Clock className="size-5" /> }
];

const features = [
  {
    title: "Hyper-Personalized Content",
    description: "AI-generated meditations based on your unique life story and challenges.",
    icon: <Sparkles className="size-6 text-teal-500" />,
  },
  {
    title: "Health Metrics Integration",
    description: "Connects with Apple Watch and other wearables to monitor your body's response.",
    icon: <Heart className="size-6 text-teal-500" />,
  },
  {
    title: "Adaptive AI Learning",
    description: "Meditations improve over time based on your feedback and measured results.",
    icon: <LineChart className="size-6 text-teal-500" />,
  },
  {
    title: "Smart Reminders",
    description: "Gentle nudges to maintain your practice at times that work best for you.",
    icon: <Bell className="size-6 text-teal-500" />,
  },
  {
    title: "Progress Tracking",
    description: "Visualize your meditation journey and wellness improvements over time.",
    icon: <Clock className="size-6 text-teal-500" />,
  },
  {
    title: "Privacy-Focused",
    description: "Your personal information is securely protected while creating personalized experiences.",
    icon: <Shield className="size-6 text-teal-500" />,
  }
];

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
