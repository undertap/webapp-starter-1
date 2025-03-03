import type { Metadata } from "next";
import MeditationCreator from "@/components/meditation/meditation-creator";

export const metadata: Metadata = {
  title: "Create Your Personal Meditation | MeditateAI",
  description: "Create a personalized meditation experience tailored to your unique needs and preferences.",
};

export default function MeditatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
            Create Your Personal Meditation
          </h1>
          <p className="text-slate-600 text-lg text-center mb-12">
            Follow the steps below to create a meditation experience tailored just for you.
          </p>
          <MeditationCreator />
        </div>
      </div>
    </div>
  );
} 