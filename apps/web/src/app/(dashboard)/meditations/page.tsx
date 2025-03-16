"use client";

import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Clock, Calendar, Filter, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MeditationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Placeholder data - in a real app, this would come from an API
  const categories = [
    { id: "personal-growth", name: "Personal Growth" },
    { id: "stress-management", name: "Stress Management" },
    { id: "sleep-improvement", name: "Sleep Improvement" },
    { id: "life-transitions", name: "Life Transitions" },
    { id: "daily-mindfulness", name: "Daily Mindfulness" },
  ];
  
  const meditations = [
    {
      id: "1",
      title: "Daily Calm",
      duration: "10 min",
      date: "Today",
      category: "Daily Mindfulness",
    },
    {
      id: "2",
      title: "Stress Relief",
      duration: "15 min",
      date: "Yesterday",
      category: "Stress Management",
    },
    {
      id: "3",
      title: "Better Sleep",
      duration: "20 min",
      date: "2 days ago",
      category: "Sleep Improvement",
    },
    {
      id: "4",
      title: "Career Transition",
      duration: "15 min",
      date: "3 days ago",
      category: "Life Transitions",
    },
    {
      id: "5",
      title: "Inner Growth",
      duration: "10 min",
      date: "5 days ago",
      category: "Personal Growth",
    },
    {
      id: "6",
      title: "Morning Mindfulness",
      duration: "5 min",
      date: "1 week ago",
      category: "Daily Mindfulness",
    },
  ];
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  // Filter meditations based on search term and selected categories
  const filteredMeditations = meditations.filter(meditation => {
    const matchesSearch = meditation.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.some(cat => 
        categories.find(c => c.id === cat)?.name === meditation.category
      );
    
    return matchesSearch && matchesCategory;
  });
  
  // Group meditations by time period
  const groupedMeditations = {
    recent: filteredMeditations.slice(0, 3),
    older: filteredMeditations.slice(3),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <h1 className="text-2xl font-bold text-gray-800">My Meditations</h1>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search meditations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64 bg-white"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <p className="font-medium text-sm">Categories</p>
              </div>
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                >
                  {category.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-white">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="recent">Recently Played</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-8">
          {/* Recent Meditations */}
          {groupedMeditations.recent.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-700">Recent</h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="divide-y">
                  {groupedMeditations.recent.map((meditation) => (
                    <MeditationItem key={meditation.id} meditation={meditation} />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Older Meditations */}
          {groupedMeditations.older.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-700">Older</h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="divide-y">
                  {groupedMeditations.older.map((meditation) => (
                    <MeditationItem key={meditation.id} meditation={meditation} />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Empty State */}
          {filteredMeditations.length === 0 && (
            <div className="py-12 text-center bg-white rounded-xl shadow-md">
              <p className="text-gray-500 mb-2">No meditations found</p>
              <p className="text-sm text-gray-400">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="favorites">
          <div className="py-12 text-center bg-white rounded-xl shadow-md">
            <p className="text-gray-500 mb-2">No favorite meditations yet</p>
            <p className="text-sm text-gray-400">
              Mark meditations as favorites to see them here
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="recent">
          <div className="py-12 text-center bg-white rounded-xl shadow-md">
            <p className="text-gray-500 mb-2">No recently played meditations</p>
            <p className="text-sm text-gray-400">
              Meditations you've played will appear here
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Meditation Item Component
type MeditationItemProps = {
  meditation: {
    id: string;
    title: string;
    duration: string;
    date: string;
    category: string;
  };
};

function MeditationItem({ meditation }: MeditationItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
      <Button 
        size="icon" 
        variant="outline" 
        className="h-10 w-10 rounded-full border-[#557373]/30 text-[#557373]"
      >
        <Play className="h-5 w-5" />
      </Button>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{meditation.title}</h3>
        <p className="text-sm text-gray-500">{meditation.category}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600 flex items-center">
          <Clock className="mr-1 h-4 w-4 text-gray-400" />
          {meditation.duration}
        </div>
        <div className="text-sm text-gray-600 flex items-center">
          <Calendar className="mr-1 h-4 w-4 text-gray-400" />
          {meditation.date}
        </div>
      </div>
    </div>
  );
} 