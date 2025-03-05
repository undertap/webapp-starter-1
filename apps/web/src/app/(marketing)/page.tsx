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
      <section className="w-full min-h-[90vh] relative overflow-hidden bg-[#f2efea]">
        <HeroBackground className="absolute inset-0">
          <div className="container px-8 md:px-12 py-16 md:py-24 lg:py-32">
            <div className="max-w-xl space-y-6">
              <AnimateInView direction="up">
                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#3d5351]">
                  Meditation Tailored to Your Journey
                </h1>
              </AnimateInView>
              
              <AnimateInView direction="up" delay={0.1}>
                <p className="text-xl md:text-2xl text-[#557373]">
                  AI-generated meditations that adapt to your life story, challenges, and health patterns.
                </p>
              </AnimateInView>
              
              <AnimateInView direction="up" delay={0.2}>
                <div className="flex pt-4">
                  <Link href="/meditate">
                    <Button size="lg" className="bg-[#557373] text-[#f2efea] hover:bg-[#557373]/90 transition-colors shadow-lg">
                      Start Your Journey <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </Link>
                </div>
              </AnimateInView>
              
              <AnimateInView direction="up" delay={0.3}>
                <p className="text-[#557373]/70 mt-6">
                  Begin your personalized meditation experience today
                </p>
              </AnimateInView>
            </div>
          </div>
        </HeroBackground>
      </section>

      {/* Categories Section */}
      <section className="w-full py-16 md:py-20 bg-[#f2efea]">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateInView className="text-center mb-12">
            <h6 className="text-sm font-medium uppercase tracking-wider text-[#557373] mb-2">
              Personalized For Your Needs
            </h6>
            <h2 className="text-3xl md:text-4xl font-bold text-[#272401]">
              Meditation For Your Life Journey
            </h2>
          </AnimateInView>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <AnimateInView 
                key={category.name} 
                delay={0.05 * index} 
                className="flex flex-col items-center w-full"
              >
                <Link href={`/meditate?category=${category.id}`} className="w-full group">
                  <Button 
                    variant="outline" 
                    className="w-full h-auto py-6 px-6 justify-start text-left rounded-xl border transition-all duration-300 group bg-white hover:bg-[#dfe5f3]/50 group-hover:border-[#557373] group-hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#dfe5f3]">
                        <span className="text-[#557373] group-hover:text-[#557373] transition-colors duration-300">{category.icon}</span>
                      </div>
                      <span className="text-[#272401] group-hover:text-[#557373] text-lg font-medium transition-colors duration-300 text-left">{category.name}</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#272401]">
              Your Meditation Journey
            </h2>
            <p className="max-w-[85%] text-[#557373] text-lg">
              Personalized meditation that evolves with you
            </p>
          </AnimateInView>
          <div className="mx-auto grid gap-8 md:grid-cols-3 md:gap-12 mt-12">
            <AnimateInView delay={0.1} className="flex flex-col items-center space-y-4 text-center">
              <div className="relative mb-4 flex size-20 items-center justify-center rounded-full bg-[#dfe5f3]">
                <Mic className="size-10 text-[#557373]" />
                <span className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-[#557373] text-[#f2efea]">
                  1
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#272401]">Share Your Story</h3>
              <p className="text-[#557373] text-base">
                Tell us about your life journey, challenges, and aspirations. The more we know, the more personalized your experience.
              </p>
            </AnimateInView>
            <AnimateInView delay={0.2} className="flex flex-col items-center space-y-4 text-center">
              <div className="relative mb-4 flex size-20 items-center justify-center rounded-full bg-[#dfe5f3]">
                <Sparkles className="size-10 text-[#557373]" />
                <span className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-[#557373] text-[#f2efea]">
                  2
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#272401]">AI Creates Your Meditation</h3>
              <p className="text-[#557373] text-base">
                Our AI crafts a custom meditation script that speaks directly to your personal situation, needs, and goals.
              </p>
            </AnimateInView>
            <AnimateInView delay={0.3} className="flex flex-col items-center space-y-4 text-center">
              <div className="relative mb-4 flex size-20 items-center justify-center rounded-full bg-[#dfe5f3]">
                <Heart className="size-10 text-[#557373]" />
                <span className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-[#557373] text-[#f2efea]">
                  3
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#272401]">Improve With Your Feedback</h3>
              <p className="text-[#557373] text-base">
                Your meditation experience improves over time as our AI learns from your feedback and health metrics.
              </p>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-b from-[#f2efea] to-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateInView className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#272401]">
              Personalized Meditation Technology
            </h2>
            <p className="max-w-[85%] text-[#557373] text-lg">
              Advanced features designed around your unique meditation journey
            </p>
          </AnimateInView>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <AnimateInView key={feature.title} delay={0.1 * index} className="h-full">
                <Card className="h-full border border-[#557373]/20 bg-white shadow-sm hover:shadow-md hover:border-[#557373]/40 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#dfe5f3]">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#272401]">{feature.title}</h3>
                        <p className="text-base text-[#557373]">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-20 bg-[#557373] text-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateInView direction="up" className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#f2efea]">
              Begin Your Personalized Meditation Journey
            </h2>
            <p className="max-w-[85%] text-[#f2efea]/90 text-lg">
              Create meditation experiences that understand your unique life story and evolve with you.
            </p>
            <Link href="/meditate">
              <Button size="lg" className="mt-6 bg-[#f2efea] text-[#557373] hover:bg-[#dfe5f3] transition-colors shadow-lg">
                Start Your Journey
              </Button>
            </Link>
          </AnimateInView>
        </div>
      </section>
    </div>
  );
}

const categories = [
  { id: "personal-growth", name: "Personal Growth", icon: <Sparkles className="size-5" /> },
  { id: "stress-management", name: "Stress Management", icon: <Shield className="size-5" /> },
  { id: "sleep-improvement", name: "Sleep Improvement", icon: <Moon className="size-5" /> },
  { id: "life-transitions", name: "Life Transitions", icon: <Leaf className="size-5" /> },
  { id: "health-challenges", name: "Health Challenges", icon: <Heart className="size-5" /> },
  { id: "work-life-balance", name: "Work-Life Balance", icon: <Scale className="size-5" /> },
  { id: "relationship-healing", name: "Relationship Healing", icon: <Users className="size-5" /> },
  { id: "emotional-wellness", name: "Emotional Wellness", icon: <SmilePlus className="size-5" /> },
  { id: "trauma-recovery", name: "Trauma Recovery", icon: <Flower2 className="size-5" /> },
  { id: "daily-mindfulness", name: "Daily Mindfulness", icon: <Clock className="size-5" /> }
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
