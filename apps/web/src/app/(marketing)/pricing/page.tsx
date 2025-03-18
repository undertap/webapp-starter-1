import { Metadata } from "next";
import { PricingContent } from "./pricing-content";

export const metadata: Metadata = {
  title: "Pricing - Meditation App",
  description: "Choose the right plan for your meditation journey",
};

export default function PricingPage() {
  return <PricingContent />;
} 