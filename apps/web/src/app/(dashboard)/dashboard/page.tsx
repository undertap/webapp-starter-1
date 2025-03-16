"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, Clock, Calendar, TrendingUp, Play, CalendarDays, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();
  
  // Placeholder data for dashboard stats
  const stats = [
    { 
      name: "Total Meditations", 
      value: "12", 
      description: "Across all categories", 
      icon: Headphones,
      color: "text-indigo-500" 
    },
    { 
      name: "Meditation Time", 
      value: "3.5 hrs", 
      description: "Total time spent", 
      icon: Clock,
      color: "text-cyan-500" 
    },
    { 
      name: "Current Streak", 
      value: "4 days", 
      description: "Keep it going!", 
      icon: TrendingUp,
      color: "text-emerald-500" 
    },
    { 
      name: "Last Session", 
      value: "Yesterday", 
      description: "Personal Growth", 
      icon: Calendar,
      color: "text-amber-500" 
    },
  ];

  // Placeholder recent meditations
  const recentMeditations = [
    {
      id: "1",
      title: "Stress Relief",
      duration: "10 min",
      date: "Today",
      category: "Stress Management",
    },
    {
      id: "2",
      title: "Better Sleep",
      duration: "15 min",
      date: "Yesterday",
      category: "Sleep Improvement",
    },
    {
      id: "3",
      title: "Mindful Focus",
      duration: "5 min",
      date: "3 days ago",
      category: "Work-Life Balance",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {user?.firstName || "Meditator"}
          </h1>
          <p className="text-gray-600">
            Your personalized meditation dashboard
          </p>
        </div>
        <Button 
          className="bg-[#557373] hover:bg-[#557373]/90"
          onClick={() => router.push('/create')}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Meditation
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.name}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Meditations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Recent Meditations</h2>
          <Link href="/meditations" className="text-[#557373] text-sm hover:underline">
            View all
          </Link>
        </div>
        
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-slate-200">
          {recentMeditations.length > 0 ? (
            <div className="divide-y">
              {recentMeditations.map((meditation) => (
                <div 
                  key={meditation.id}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
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
                      <CalendarDays className="mr-1 h-4 w-4 text-gray-400" />
                      {meditation.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-4">You haven't created any meditations yet</p>
              <Button 
                className="bg-[#557373] hover:bg-[#557373]/90"
                onClick={() => router.push('/create')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Meditation
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Headphones className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Browse Categories</h3>
                  <p className="text-sm text-gray-500">Explore meditation types</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Plus className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">New Meditation</h3>
                  <p className="text-sm text-gray-500">Create a personalized session</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Play className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Resume Last</h3>
                  <p className="text-sm text-gray-500">Continue where you left off</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 