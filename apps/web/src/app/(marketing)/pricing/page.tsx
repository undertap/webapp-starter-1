import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Pricing - Meditation App",
  description: "Choose the right plan for your meditation journey",
};

export default function PricingPage() {
  return (
    <div className="container py-10 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your meditation practice
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <div className="mt-4 flex items-baseline text-5xl font-bold">
              $0
              <span className="ml-1 text-lg font-normal text-muted-foreground">/month</span>
            </div>
            <CardDescription className="mt-4">
              Perfect for getting started with meditation
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Access to basic meditations
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Personalized recommendations
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Basic meditation profile
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/signup">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="flex flex-col border-primary">
          <CardHeader className="bg-primary/10 rounded-t-lg">
            <div className="uppercase text-xs font-bold text-primary mb-2">Most Popular</div>
            <CardTitle>Premium</CardTitle>
            <div className="mt-4 flex items-baseline text-5xl font-bold">
              $9.99
              <span className="ml-1 text-lg font-normal text-muted-foreground">/month</span>
            </div>
            <CardDescription className="mt-4">
              Enhanced features for dedicated practitioners
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                All free features
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Unlimited custom meditations
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Advanced meditation profile
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Download meditations for offline use
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/signup">Start Free Trial</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <div className="mt-4 flex items-baseline text-5xl font-bold">
              $19.99
              <span className="ml-1 text-lg font-normal text-muted-foreground">/month</span>
            </div>
            <CardDescription className="mt-4">
              Complete features for serious meditators
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                All Premium features
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                1-on-1 meditation coaching
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Expert progress analysis
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Priority support
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/signup">Contact Sales</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 