"use client";

import { useMeditationProfile } from "@/hooks/use-meditation-profile";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Music, Brain, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

export function MeditationProfileCard() {
  const { profile, recommendation, isLoading, error, hasProfile } = useMeditationProfile();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full mb-4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Something went wrong</CardTitle>
          <CardDescription>We couldn't load your meditation profile</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">{error}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">
            <Link href="/create-meditation-form">Create Your Profile</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!hasProfile) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Personalize Your Meditation Experience</CardTitle>
          <CardDescription>Create your meditation profile to get personalized recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Take a short questionnaire to help us understand your meditation needs and preferences.
            We'll create a personalized meditation experience just for you.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600">
            <Link href="/create-meditation-form">Create Your Profile</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <div className="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 h-2" />
      <CardHeader>
        <CardTitle>Your Meditation Profile</CardTitle>
        <CardDescription>Personalized recommendations based on your profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendation && (
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-violet-500" />
              Recommended Meditation
            </h3>
            <p className="text-gray-700 mb-3">
              <span className="font-medium">{recommendation.type}:</span> {recommendation.description}
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-violet-500" />
                <span>{recommendation.duration} minutes</span>
              </div>
              <div className="flex items-center">
                <Music className="h-4 w-4 mr-1 text-violet-500" />
                <span>{recommendation.hasMusic ? "With" : "Without"} background music</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Brain className="h-4 w-4 mr-1 text-violet-500" />
              Attachment Style
            </h3>
            <p className="text-gray-800 capitalize">{profile?.style || "Unknown"}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Heart className="h-4 w-4 mr-1 text-violet-500" />
              Primary Emotion
            </h3>
            <p className="text-gray-800 capitalize">{profile?.primaryEmotion || "Unknown"}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Link href="/create-meditation-form">Update Profile</Link>
        </Button>
        <Button className="bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600">
          <Link href="/meditations">Start Meditation</Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 