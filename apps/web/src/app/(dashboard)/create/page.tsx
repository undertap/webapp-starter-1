"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Clock, Timer, VolumeX, Volume2, Music } from "lucide-react";

// Fix for linter error: Define a simple toast implementation
type ToastProps = {
  title: string;
  description: string;
  variant?: "default" | "destructive";
};

function useToast() {
  const toast = (props: ToastProps) => {
    console.log(`Toast: ${props.title} - ${props.description}`);
    // In a real app, this would show a toast notification
  };
  
  return { toast };
}

export default function CreateMeditationPage() {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  // Form state
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [intention, setIntention] = useState("");
  const [duration, setDuration] = useState(10); // Minutes
  const [backgroundSound, setBackgroundSound] = useState("");
  const [volume, setVolume] = useState(70); // Percentage
  
  // Available options
  const categories = [
    { id: "personal-growth", name: "Personal Growth" },
    { id: "stress-management", name: "Stress Management" },
    { id: "sleep-improvement", name: "Sleep Improvement" },
    { id: "life-transitions", name: "Life Transitions" },
    { id: "daily-mindfulness", name: "Daily Mindfulness" },
  ];
  
  const backgroundSounds = [
    { id: "nature", name: "Nature Sounds" },
    { id: "rain", name: "Gentle Rain" },
    { id: "ocean", name: "Ocean Waves" },
    { id: "forest", name: "Forest Ambience" },
    { id: "silence", name: "Silence" },
  ];
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !intention) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Meditation created!",
        description: "Your personalized meditation has been created.",
      });
      setLoading(false);
      router.push("/dashboard");
    }, 3000);
  };

  // Fix for linter error: Handle undefined values from slider
  const handleDurationChange = (value: number[]) => {
    if (value[0] !== undefined) {
      setDuration(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (value[0] !== undefined) {
      setVolume(value[0]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Meditation</h1>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Customize Your Meditation</CardTitle>
            <CardDescription>
              Create a personalized meditation based on your preferences and needs
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Intention */}
            <div className="space-y-2">
              <label className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  What's your intention? <span className="text-red-500">*</span>
                </span>
                <span className="text-xs text-gray-500">
                  {intention.length}/200 characters
                </span>
              </label>
              <Textarea
                placeholder="e.g., I want to reduce stress and find more balance in my daily life..."
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                maxLength={200}
                className="resize-none h-24 bg-white"
              />
            </div>
            
            <Separator />
            
            {/* Duration */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Duration
                </label>
                <span className="text-sm font-medium">{duration} minutes</span>
              </div>
              <Slider
                defaultValue={[10]}
                min={5}
                max={30}
                step={5}
                onValueChange={handleDurationChange}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>5 min</span>
                <span>30 min</span>
              </div>
            </div>
            
            {/* Background Sound */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Music className="h-4 w-4" />
                Background Sound
              </label>
              <Select value={backgroundSound} onValueChange={setBackgroundSound}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select background sound" />
                </SelectTrigger>
                <SelectContent>
                  {backgroundSounds.map((sound) => (
                    <SelectItem key={sound.id} value={sound.id}>
                      {sound.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Volume */}
            {backgroundSound && backgroundSound !== "silence" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium flex items-center gap-2">
                    {volume === 0 ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                    Volume
                  </label>
                  <span className="text-sm font-medium">{volume}%</span>
                </div>
                <Slider
                  defaultValue={[70]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={handleVolumeChange}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Mute</span>
                  <span>Max</span>
                </div>
              </div>
            )}
            
            {/* Info Card */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-amber-800">
                  Personalized for You
                </h4>
                <p className="text-xs text-amber-700 mt-1">
                  Our AI will generate a unique meditation based on your inputs. The meditation will be saved to your account for future access.
                </p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => router.push("/dashboard")}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-[#557373] hover:bg-[#3D5959]"
            >
              {loading ? (
                <>
                  <Timer className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Meditation"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 