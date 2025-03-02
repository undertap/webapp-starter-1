import { Metadata } from "next";
import CategoryPage from "../[category]/page";

export const metadata: Metadata = {
  title: "Health Challenges Meditations | MeditateAI",
  description: "Meditative approaches to support your healing journey",
};

export default function HealthChallengesPage() {
  return <CategoryPage params={{ category: "health-challenges" }} />;
} 