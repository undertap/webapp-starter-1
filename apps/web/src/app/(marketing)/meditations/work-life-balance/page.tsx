import { Metadata } from "next";
import CategoryPage from "../[category]/page";

export const metadata: Metadata = {
  title: "Work-Life Balance Meditations | MeditateAI",
  description: "Find harmony between professional demands and personal wellbeing",
};

export default function WorkLifeBalancePage() {
  return <CategoryPage params={{ category: "work-life-balance" }} />;
} 