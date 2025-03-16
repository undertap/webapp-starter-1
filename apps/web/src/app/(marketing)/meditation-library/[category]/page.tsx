import { Metadata } from "next/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import { HeroBackground } from "@/components/ui/hero-background";
import { AnimateInView } from "@/components/ui/animate-in-view";

// Define the categories metadata for lookup
const categoriesData = {
  "personal-growth": {
    title: "Personal Growth",
    description: "Guided meditations for self-improvement and personal development",
    heroDescription: "Embark on a journey of self-discovery and transformation with AI-powered meditations designed specifically for your growth goals.",
    benefits: [
      "Cultivate self-awareness and insight",
      "Build emotional intelligence and resilience",
      "Develop clarity about your life purpose",
      "Enhance creativity and problem-solving abilities",
      "Strengthen your ability to manifest positive change",
    ],
    features: [
      {
        title: "Personalized Growth Journey",
        description: "Our AI analyzes your goals and creates a progressive meditation path tailored to your development needs."
      },
      {
        title: "Emotional Blockage Detection",
        description: "Identify and work through subconscious barriers that may be limiting your personal growth."
      },
      {
        title: "Evolving Practice",
        description: "As you advance, your meditations automatically adapt to address new growth opportunities."
      }
    ]
  },
  "stress-management": {
    title: "Stress Management",
    description: "Calm your mind and reduce anxiety with personalized techniques",
    heroDescription: "Discover AI-tailored meditation practices designed to help you manage stress and find calm in your unique life circumstances.",
    benefits: [
      "Reduce cortisol levels and physical tension",
      "Develop personalized coping mechanisms",
      "Improve focus and mental clarity during stressful periods",
      "Enhance emotional regulation",
      "Build resilience to future stressors",
    ],
    features: [
      {
        title: "Stress Pattern Analysis",
        description: "Our AI identifies your unique stress triggers and response patterns to create targeted interventions."
      },
      {
        title: "Real-time Adaptation",
        description: "Practices adjust based on your stress levels and immediate needs for in-the-moment relief."
      },
      {
        title: "Progressive Relaxation",
        description: "Systematic techniques that build upon each other to create lasting stress reduction skills."
      }
    ]
  },
  "sleep-improvement": {
    title: "Sleep Improvement",
    description: "Deep relaxation practices designed to improve sleep quality",
    heroDescription: "Transform your sleep experience with AI-customized meditations that address your specific sleep challenges and patterns.",
    benefits: [
      "Reduce time to fall asleep",
      "Improve sleep quality and depth",
      "Minimize night waking",
      "Establish healthy sleep routines",
      "Wake feeling more refreshed and energized",
    ],
    features: [
      {
        title: "Sleep Cycle Optimization",
        description: "Meditations timed to your natural sleep rhythm for maximum effectiveness."
      },
      {
        title: "Thought Quieting Technology",
        description: "Advanced techniques to calm racing thoughts that often prevent quality sleep."
      },
      {
        title: "Binaural Audio Engineering",
        description: "Optional sound frequencies that entrain your brain to optimal sleep states."
      }
    ]
  },
  "life-transitions": {
    title: "Life Transitions",
    description: "Support during major life changes and new beginnings",
    heroDescription: "Navigate periods of change and transformation with meditations specifically designed for your current life transition.",
    benefits: [
      "Develop emotional stability during uncertainty",
      "Process grief and loss associated with change",
      "Cultivate openness to new possibilities",
      "Build confidence in unfamiliar situations",
      "Find meaning and purpose in transitional periods",
    ],
    features: [
      {
        title: "Transition Type Analysis",
        description: "AI assessment of your specific transition type and personalized support strategy."
      },
      {
        title: "Emotional Processing Suite",
        description: "Specialized techniques for working through the complex emotions of major life changes."
      },
      {
        title: "Future Visualization",
        description: "Guided practices to help you envision and create your desired post-transition reality."
      }
    ]
  },
  "health-challenges": {
    title: "Health Challenges",
    description: "Meditative approaches to support your healing journey",
    heroDescription: "Complement your healthcare with meditation practices designed to support your specific health journey and wellness goals.",
    benefits: [
      "Reduce stress impact on your health condition",
      "Develop a positive mindset during recovery",
      "Improve adherence to treatment plans",
      "Enhance body awareness and connection",
      "Build mental resilience through health challenges",
    ],
    features: [
      {
        title: "Symptom-Specific Support",
        description: "Targeted practices that address the mental and emotional aspects of your specific health condition."
      },
      {
        title: "Treatment Complementation",
        description: "Meditations designed to work alongside conventional medical treatments to enhance overall outcomes."
      },
      {
        title: "Pain and Discomfort Management",
        description: "Evidence-based techniques for reducing perception of pain and increasing comfort."
      }
    ]
  },
  "work-life-balance": {
    title: "Work-Life Balance",
    description: "Find harmony between professional demands and personal wellbeing",
    heroDescription: "Create a sustainable relationship with work through customized meditations that address your unique professional challenges.",
    benefits: [
      "Establish clear boundaries between work and personal life",
      "Reduce workplace stress and burnout risk",
      "Improve focus and productivity during work hours",
      "Enhance job satisfaction and engagement",
      "Develop presence and enjoyment in leisure time",
    ],
    features: [
      {
        title: "Workplace Pattern Analysis",
        description: "AI assessment of your specific work habits and stressors to create targeted interventions."
      },
      {
        title: "Micro-Meditation Toolkit",
        description: "Brief practices you can implement throughout your workday for in-the-moment balance."
      },
      {
        title: "Transition Rituals",
        description: "Specialized techniques to help you mentally disconnect from work at the end of the day."
      }
    ]
  },
  "relationship-healing": {
    title: "Relationship Healing",
    description: "Practices to foster connection and emotional understanding",
    heroDescription: "Transform your relationships through meditation practices designed to enhance communication, empathy, and authentic connection.",
    benefits: [
      "Develop deeper empathy and understanding",
      "Improve communication patterns",
      "Heal past relationship wounds",
      "Create healthier attachment patterns",
      "Build capacity for authentic intimacy",
    ],
    features: [
      {
        title: "Relationship Pattern Recognition",
        description: "AI analysis of your relationship dynamics to identify growth opportunities."
      },
      {
        title: "Emotional Regulation Practices",
        description: "Techniques to stay centered and responsive (rather than reactive) during challenging interactions."
      },
      {
        title: "Connection Enhancement",
        description: "Meditations specifically designed to increase feelings of bonding and closeness."
      }
    ]
  },
  "emotional-wellness": {
    title: "Emotional Wellness",
    description: "Develop emotional resilience and process feelings mindfully",
    heroDescription: "Build a healthier relationship with your emotions through personalized meditation practices tailored to your emotional patterns.",
    benefits: [
      "Increase emotional awareness and literacy",
      "Develop skills for processing difficult feelings",
      "Reduce emotional reactivity",
      "Cultivate positive emotional states",
      "Build long-term emotional resilience",
    ],
    features: [
      {
        title: "Emotional Pattern Mapping",
        description: "AI analysis of your emotional tendencies to create targeted intervention strategies."
      },
      {
        title: "Feeling-Specific Techniques",
        description: "Specialized practices for working with particular emotions like anger, fear, or sadness."
      },
      {
        title: "Emotional Expansion",
        description: "Meditations designed to increase your capacity to experience the full spectrum of emotions."
      }
    ]
  },
  "trauma-recovery": {
    title: "Trauma Recovery",
    description: "Gentle approaches to support healing from past experiences",
    heroDescription: "Support your healing journey with trauma-sensitive meditation practices designed for safety, empowerment, and gradual integration.",
    benefits: [
      "Develop greater sense of safety in your body",
      "Build resources for processing traumatic memories",
      "Reduce hypervigilance and anxiety",
      "Reclaim sense of choice and agency",
      "Create new, positive neural pathways",
    ],
    features: [
      {
        title: "Trauma-Sensitive Approach",
        description: "All practices are designed with an understanding of trauma's impact on the nervous system."
      },
      {
        title: "Resource Building",
        description: "Focus on establishing safety and stability before addressing traumatic material."
      },
      {
        title: "Titration Control",
        description: "You control the pace and intensity of your practice, with AI guidance that respects your boundaries."
      }
    ]
  },
  "daily-mindfulness": {
    title: "Daily Mindfulness",
    description: "Short practices to integrate awareness into everyday moments",
    heroDescription: "Transform ordinary moments into opportunities for presence and awareness with brief, potent mindfulness practices for daily life.",
    benefits: [
      "Increase overall present-moment awareness",
      "Reduce autopilot behavior",
      "Find joy in ordinary experiences",
      "Create mindful transitions between activities",
      "Build consistency in your meditation practice",
    ],
    features: [
      {
        title: "Schedule Integration",
        description: "AI analyzes your daily routine to suggest optimal mindfulness moments."
      },
      {
        title: "Activity-Specific Practices",
        description: "Custom mindfulness techniques for everyday activities like eating, walking, or working."
      },
      {
        title: "Micro-Practice Library",
        description: "A collection of 1-3 minute practices you can implement throughout your day."
      }
    ]
  }
};

// Generate metadata based on the category slug
export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = categoriesData[params.category as keyof typeof categoriesData];
  
  if (!category) {
    return {
      title: "Meditation Category | MeditateAI",
      description: "Explore our personalized meditation categories",
    };
  }
  
  return {
    title: `${category.title} Meditations | MeditateAI`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categorySlug = params.category;
  const categoryData = categoriesData[categorySlug as keyof typeof categoriesData];
  
  // If category doesn't exist, show a fallback UI
  if (!categoryData) {
    return (
      <div className="flex flex-col items-center py-24">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-[#3d5351] mb-6">Category Not Found</h1>
          <p className="text-xl text-slate-600 mb-8">We couldn't find the meditation category you're looking for.</p>
          <Link href="/meditation-library">
            <Button>View All Meditation Categories</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full min-h-[60vh] relative">
        <HeroBackground>
          <div className="container px-8 md:px-12 py-16 md:py-24">
            <div className="max-w-xl space-y-4">
              <AnimateInView direction="up">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3d5351]">
                  {categoryData.title} Meditations
                </h1>
              </AnimateInView>
              
              <AnimateInView direction="up" delay={0.1}>
                <p className="text-xl text-[#557373]">
                  {categoryData.heroDescription}
                </p>
              </AnimateInView>
              
              <AnimateInView direction="up" delay={0.2}>
                <div className="pt-4">
                  <Button size="lg" className="bg-[#557373] hover:bg-[#557373]/90 text-[#f2efea]">
                    Create Your Personalized Meditation
                  </Button>
                </div>
              </AnimateInView>
            </div>
          </div>
        </HeroBackground>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-16 bg-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Benefits of {categoryData.title} Meditation
              </h2>
              <ul className="space-y-4">
                {categoryData.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-teal-600 size-6 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-base text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 bg-white text-teal-600 border border-teal-200 hover:bg-teal-50">
                Learn More About Benefits
              </Button>
            </div>
            <div className="bg-slate-100 rounded-lg h-80 flex items-center justify-center">
              <p className="text-slate-400 text-lg font-medium">Illustration or image here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-slate-50">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              How Our {categoryData.title} Meditations Work
            </h2>
            <p className="text-lg text-slate-600 mt-3 max-w-2xl mx-auto">
              Our AI-powered platform creates personalized meditation experiences designed specifically for your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {categoryData.features.map((feature, index) => (
              <Card key={index} className="border border-slate-200 bg-white h-full">
                <CardContent className="p-6">
                  <div className="size-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold">
              Ready to Start Your {categoryData.title} Meditation Journey?
            </h2>
            <p className="text-white/90 text-lg">
              Create your first personalized {categoryData.title.toLowerCase()} meditation experience and discover the power of AI-tailored mindfulness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-white/90">
                Create Your First Meditation
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                View Sample Meditation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Categories */}
      <section className="w-full py-16 bg-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Explore Related Categories
            </h2>
            <p className="text-lg text-slate-600 mt-3">
              Discover other meditation types that complement your {categoryData.title.toLowerCase()} practice.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(categoriesData)
              .filter(([slug]) => slug !== categorySlug)
              .slice(0, 4)
              .map(([slug, data]) => (
                <Link key={slug} href={`/meditations/${slug}`} className="group">
                  <Card className="h-full overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-teal-200 transition-all">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {data.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                        {data.description}
                      </p>
                      <div className="text-teal-600 text-sm font-medium flex items-center mt-2 group-hover:text-teal-700">
                        Explore <ArrowRight className="ml-1 size-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
} 