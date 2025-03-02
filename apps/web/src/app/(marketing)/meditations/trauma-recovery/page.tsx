import { Metadata } from "next";
import CategoryPage from "../[category]/page";

export const metadata: Metadata = {
  title: "Trauma Recovery Meditations | MeditateAI",
  description: "Gentle approaches to support healing from past experiences",
};

export default function TraumaRecoveryPage() {
  return <CategoryPage params={{ category: "trauma-recovery" }} />;
} 