import { Metadata } from "next";
import CategoryPage from "../[category]/page";

export const metadata: Metadata = {
  title: "Stress Management Meditations | MeditateAI",
  description: "Calm your mind and reduce anxiety with personalized techniques",
};

export default function StressManagementPage() {
  return <CategoryPage params={{ category: "stress-management" }} />;
} 