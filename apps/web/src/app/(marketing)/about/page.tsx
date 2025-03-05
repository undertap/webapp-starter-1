import { HeroBackground } from "@/components/ui/hero-background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Linkedin, Twitter, Github, Mail } from "lucide-react";
import { AnimateInView } from "@/components/ui/animate-in-view";

export const metadata = {
  title: "About Us - MeditateAI",
  description: "Meet the team behind MeditateAI and discover our story and mission."
};

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "Certified meditation instructor with over 15 years of practice. Sarah founded MeditateAI to make personalized meditation accessible to everyone.",
    image: "/images/team/sarah.jpg",
    imageAlt: "Sarah Johnson, Founder & CEO",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson",
    }
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "AI researcher and meditation enthusiast. Michael combines his technical expertise with a passion for mindfulness to build our personalized meditation platform.",
    image: "/images/team/michael.jpg",
    imageAlt: "Michael Chen, CTO",
    socialLinks: {
      linkedin: "https://linkedin.com/in/michaelchen",
      github: "https://github.com/michaelchen",
    }
  },
  {
    name: "Aisha Patel",
    role: "Head of Content",
    bio: "Mindfulness expert and former psychologist with a focus on stress management and emotional well-being. Aisha ensures our meditations are both effective and evidence-based.",
    image: "/images/team/aisha.jpg",
    imageAlt: "Aisha Patel, Head of Content",
    socialLinks: {
      linkedin: "https://linkedin.com/in/aishapatel",
      twitter: "https://twitter.com/aishapatel",
    }
  },
  {
    name: "David Rodriguez",
    role: "Lead AI Engineer",
    bio: "AI specialist with expertise in natural language processing. David develops the algorithms that create personalized meditation experiences for each user.",
    image: "/images/team/david.jpg",
    imageAlt: "David Rodriguez, Lead AI Engineer",
    socialLinks: {
      linkedin: "https://linkedin.com/in/davidrodriguez",
      github: "https://github.com/davidrodriguez",
    }
  }
];

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full min-h-[80vh] relative">
        <HeroBackground>
          <div className="container px-8 md:px-12 py-16 md:py-24 lg:py-32">
            <div className="max-w-xl space-y-6">
              <AnimateInView direction="up">
                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#3d5351]">
                  Meet the Team Behind MeditateAI
                </h1>
              </AnimateInView>
              
              <AnimateInView direction="up" delay={0.1}>
                <p className="text-xl md:text-2xl text-[#557373]">
                  We're a diverse team of meditation experts, AI specialists, and mental health professionals.
                </p>
              </AnimateInView>
            </div>
          </div>
        </HeroBackground>
      </section>

      {/* Our Story Section */}
      <section className="w-full py-16 md:py-20 bg-[#f2efea]">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateInView className="text-center mb-12">
            <h6 className="text-sm font-medium uppercase tracking-wider text-[#557373] mb-2">
              Our Journey
            </h6>
            <h2 className="text-3xl md:text-4xl font-bold text-[#272401]">
              Our Story
            </h2>
          </AnimateInView>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimateInView className="order-2 md:order-1">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg relative">
                <div className="absolute inset-0 bg-[#557373]/20" />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="text-xl font-medium text-white">Company Story Video</div>
                </div>
              </div>
            </AnimateInView>
            
            <AnimateInView className="space-y-6 order-1 md:order-2">
              <p className="text-lg text-[#557373]">
                MeditateAI began in 2021 when our founder, Sarah Johnson, a certified meditation instructor, recognized that many people struggle to find meditation practices that address their specific needs.
              </p>
              <p className="text-lg text-[#557373]">
                After partnering with AI expert Michael Chen, they developed a platform that uses artificial intelligence to create truly personalized meditation experiences that adapt to each individual's life circumstances, challenges, and goals.
              </p>
              <p className="text-lg text-[#557373]">
                Today, our team has grown to include experts in psychology, mindfulness, and technology, all working together to make meditation more accessible, personalized, and effective for people worldwide.
              </p>
              <div className="pt-4">
                <Link href="/meditate">
                  <Button size="lg" className="bg-[#557373] text-[#f2efea] hover:bg-[#557373]/90 transition-colors shadow-lg">
                    Experience Our Platform <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="w-full py-16 md:py-20 bg-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateInView className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#272401]">
              Our Mission
            </h2>
            <p className="max-w-[85%] text-[#557373] text-lg">
              We're on a journey to transform how people experience meditation
            </p>
          </AnimateInView>
          
          <div className="grid md:grid-cols-3 gap-8">
            <AnimateInView delay={0.1} className="bg-[#f2efea] p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-[#272401] mb-4">Personalization</h3>
              <p className="text-[#557373]">
                We believe that meditation should be tailored to your unique life story, challenges, and aspirations. One-size-fits-all approaches often miss the specific areas where you need support most.
              </p>
            </AnimateInView>
            
            <AnimateInView delay={0.2} className="bg-[#f2efea] p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-[#272401] mb-4">Accessibility</h3>
              <p className="text-[#557373]">
                We're committed to making effective meditation accessible to everyone. Our platform adapts to your schedule, preferences, and experience level to help you build a sustainable practice.
              </p>
            </AnimateInView>
            
            <AnimateInView delay={0.3} className="bg-[#f2efea] p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-[#272401] mb-4">Well-being</h3>
              <p className="text-[#557373]">
                Our ultimate goal is to improve your overall well-being. We combine ancient wisdom with modern technology to create meditation experiences that address the complexities of contemporary life.
              </p>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-b from-[#f2efea] to-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateInView className="text-center mb-12">
            <h6 className="text-sm font-medium uppercase tracking-wider text-[#557373] mb-2">
              The People Behind MeditateAI
            </h6>
            <h2 className="text-3xl md:text-4xl font-bold text-[#272401]">
              Meet Our Team
            </h2>
          </AnimateInView>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <AnimateInView key={member.name} delay={0.1 * index} className="flex flex-col">
                <div className="mb-4 aspect-square rounded-xl overflow-hidden bg-[#dfe5f3] relative">
                  {/* Placeholder for team member image */}
                  <div className="absolute inset-0 flex items-center justify-center text-[#557373] font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#272401]">{member.name}</h3>
                <p className="text-[#557373] font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{member.bio}</p>
                <div className="flex space-x-2 mt-auto">
                  {member.socialLinks.linkedin && (
                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`}>
                      <Linkedin className="size-5 text-[#557373] hover:text-[#557373]/80" />
                    </a>
                  )}
                  {member.socialLinks.twitter && (
                    <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Twitter`}>
                      <Twitter className="size-5 text-[#557373] hover:text-[#557373]/80" />
                    </a>
                  )}
                  {member.socialLinks.github && (
                    <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} GitHub`}>
                      <Github className="size-5 text-[#557373] hover:text-[#557373]/80" />
                    </a>
                  )}
                  <a href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@meditateai.com`} aria-label={`Email ${member.name}`}>
                    <Mail className="size-5 text-[#557373] hover:text-[#557373]/80" />
                  </a>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section className="w-full py-16 md:py-20 bg-[#557373] text-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateInView direction="up" className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#f2efea]">
              Join Us on Our Mission
            </h2>
            <p className="max-w-[85%] text-[#f2efea]/90 text-lg">
              Experience personalized meditation designed to meet you exactly where you are in your journey.
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