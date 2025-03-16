"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Mail, Moon, Sliders } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  
  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    newFeatures: true,
    completedMeditations: true,
  });
  
  const [preferences, setPreferences] = useState({
    darkMode: false,
    soundEffects: true,
    autoPlay: false,
  });
  
  // Toggle function for notification settings
  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Toggle function for preferences
  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Handle saving changes
  const handleSaveChanges = () => {
    console.log("Saving changes...");
    // In a real app, this would call an API to save user settings
  };
  
  if (!isLoaded) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Sliders className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your profile information and manage your account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                  <AvatarFallback>
                    {user?.firstName?.charAt(0) || "U"}
                    {user?.lastName?.charAt(0) || ""}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-gray-900">Profile Photo</h3>
                  <p className="text-sm text-gray-500">
                    This will be displayed on your profile
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">Change</Button>
                    <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Personal Details */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    defaultValue={user?.firstName || ""} 
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    defaultValue={user?.lastName || ""} 
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={user?.primaryEmailAddress?.emailAddress || ""} 
                    className="bg-white"
                    disabled
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveChanges} className="bg-[#557373] hover:bg-[#3D5959]">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage your email and app notifications
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Notifications
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-gray-500">
                        Receive emails about your meditation activity
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.email} 
                      onCheckedChange={() => toggleNotification("email")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Marketing Emails</Label>
                      <p className="text-sm text-gray-500">
                        Receive emails about new features and promotions
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.marketing} 
                      onCheckedChange={() => toggleNotification("marketing")} 
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  App Notifications
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">New Features</Label>
                      <p className="text-sm text-gray-500">
                        Get notified when we release new features
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.newFeatures} 
                      onCheckedChange={() => toggleNotification("newFeatures")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Completed Meditations</Label>
                      <p className="text-sm text-gray-500">
                        Get notified when your meditation is ready
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.completedMeditations} 
                      onCheckedChange={() => toggleNotification("completedMeditations")} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveChanges} className="bg-[#557373] hover:bg-[#3D5959]">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Application Preferences */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your meditation experience
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      Dark Mode
                    </Label>
                    <p className="text-sm text-gray-500">
                      Use dark theme across the application
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.darkMode} 
                    onCheckedChange={() => togglePreference("darkMode")} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Sound Effects</Label>
                    <p className="text-sm text-gray-500">
                      Play sound effects during navigation
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.soundEffects} 
                    onCheckedChange={() => togglePreference("soundEffects")} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-Play Meditations</Label>
                    <p className="text-sm text-gray-500">
                      Automatically start meditation playback when opened
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.autoPlay} 
                    onCheckedChange={() => togglePreference("autoPlay")} 
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveChanges} className="bg-[#557373] hover:bg-[#3D5959]">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 