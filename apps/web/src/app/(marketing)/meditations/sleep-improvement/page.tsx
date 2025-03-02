import { Metadata } from "next";
import CategoryPage from "../[category]/page";

export const metadata: Metadata = {
  title: "Sleep Improvement Meditations | MeditateAI",
  description: "Deep relaxation practices designed to improve sleep quality",
};

export default function SleepImprovementPage() {
  return <CategoryPage params={{ category: "sleep-improvement" }} />;
} 