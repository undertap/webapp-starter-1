import { Metadata } from "next";
import CategoryPage from "../[category]/page";

export const metadata: Metadata = {
  title: "Life Transitions Meditations | MeditateAI",
  description: "Support during major life changes and new beginnings",
};

export default function LifeTransitionsPage() {
  return <CategoryPage params={{ category: "life-transitions" }} />;
} 