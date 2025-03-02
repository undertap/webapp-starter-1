import { Metadata } from "next";
import CategoryPage from "../[category]/page";

export const metadata: Metadata = {
  title: "Emotional Wellness Meditations | MeditateAI",
  description: "Develop emotional resilience and process feelings mindfully",
};

export default function EmotionalWellnessPage() {
  return <CategoryPage params={{ category: "emotional-wellness" }} />;
} 