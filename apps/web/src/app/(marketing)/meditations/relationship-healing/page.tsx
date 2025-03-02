import { Metadata } from "next";
import CategoryPage from "../[category]/page";

export const metadata: Metadata = {
  title: "Relationship Healing Meditations | MeditateAI",
  description: "Practices to foster connection and emotional understanding",
};

export default function RelationshipHealingPage() {
  return <CategoryPage params={{ category: "relationship-healing" }} />;
} 