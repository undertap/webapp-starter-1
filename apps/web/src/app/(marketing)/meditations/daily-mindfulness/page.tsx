import { Metadata } from "next";
import CategoryPage from "../[category]/page";

export const metadata: Metadata = {
  title: "Daily Mindfulness Meditations | MeditateAI",
  description: "Short practices to integrate awareness into everyday moments",
};

export default function DailyMindfulnessPage() {
  return <CategoryPage params={{ category: "daily-mindfulness" }} />;
} 