import { Metadata } from "next";
import Image from "next/image";
import CategoryPage from "../[category]/page";

export const metadata: Metadata = {
  title: "Personal Growth Meditations | MeditateAI",
  description: "Guided meditations for self-improvement and personal development",
};

export default function PersonalGrowthPage() {
  return <CategoryPage params={{ category: "personal-growth" }} />;
} 