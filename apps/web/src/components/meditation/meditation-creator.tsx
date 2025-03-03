"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Play, Pause, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { ProgressBar } from "@/components/ui/progress-bar"
import { FloatingParticles } from "@/components/ui/floating-particles"

const categories = [
  { id: "personal-growth", name: "Personal Growth", icon: "✨" },
  { id: "stress-management", name: "Stress Management", icon: "🧘" },
  { id: "sleep-improvement", name: "Sleep Improvement", icon: "😴" },
  { id: "life-transitions", name: "Life Transitions", icon: "🔄" },
  { id: "health-challenges", name: "Health Challenges", icon: "❤️" },
  { id: "work-life-balance", name: "Work-Life Balance", icon: "⚖️" },
  { id: "relationship-healing", name: "Relationship Healing", icon: "🤝" },
  { id: "emotional-wellness", name: "Emotional Wellness", icon: "🌈" },
  { id: "trauma-recovery", name: "Trauma Recovery", icon: "🌱" },
  { id: "daily-mindfulness", name: "Daily Mindfulness", icon: "🌿" },
]

const durations = [
  { value: 5, label: "5 minutes", description: "Quick reset" },
  { value: 10, label: "10 minutes", description: "Deep breath" },
  { value: 15, label: "15 minutes", description: "Full immersion" },
]

const voices = [
  { id: "male", label: "Male Voice", sample: "/male-voice-sample.mp3", description: "Deep & calming" },
  { id: "female", label: "Female Voice", sample: "/female-voice-sample.mp3", description: "Soft & soothing" },
]

export default function MeditationCreator() {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCategoryName, setSelectedCategoryName] = useState("")
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null)
  const [selectedVoice, setSelectedVoice] = useState("")
  const [playingVoice, setPlayingVoice] = useState("")
  const [formData, setFormData] = useState({
    intention: "",
    challenges: "",
    affirmation: "",
  })
  const [progress, setProgress] = useState(0)
  const [meditationReady, setMeditationReady] = useState(false)

  useEffect(() => {
    // Calculate progress based on completed steps
    const totalSteps = 4
    const completedSteps = step - 1
    setProgress((completedSteps / totalSteps) * 100)
  }, [step])

  const handleCategorySelect = (categoryId: string, categoryName: string) => {
    setSelectedCategory(categoryId)
    setSelectedCategoryName(categoryName)
    setTimeout(() => setStep(2), 300)
  }

  const handleDurationSelect = (duration: number) => {
    setSelectedDuration(duration)
    setTimeout(() => setStep(3), 300)
  }

  const handleVoiceSelect = (voice: string) => {
    setSelectedVoice(voice)
    setTimeout(() => setStep(4), 300)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(5)
    // Simulate AI processing time
    setTimeout(() => {
      setMeditationReady(true)
    }, 3000) // 3 seconds delay
  }

  const togglePlayVoice = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice("")
    } else {
      setPlayingVoice(voiceId)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <div className="relative">
      <FloatingParticles />
      <BackgroundGradient className="overflow-hidden rounded-2xl">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700">
          <ProgressBar progress={progress} />
        </div>

        {/* Progress Summary Bar */}
        <div className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Your meditation choices:</p>
          <div className="flex flex-wrap items-center gap-2">
            {selectedCategory && (
              <button
                onClick={() => setStep(1)}
                className="px-3 py-1 text-sm font-medium rounded-full bg-violet-100 text-violet-800 hover:bg-violet-200 dark:bg-violet-900/50 dark:text-violet-100 dark:hover:bg-violet-800/70 transition-colors duration-200 flex items-center gap-1"
              >
                {selectedCategoryName}
                <span className="text-xs">&times;</span>
              </button>
            )}
            {selectedDuration && (
              <button
                onClick={() => setStep(2)}
                className="px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-100 dark:hover:bg-indigo-800/70 transition-colors duration-200 flex items-center gap-1"
              >
                {selectedDuration} min
                <span className="text-xs">&times;</span>
              </button>
            )}
            {selectedVoice && (
              <button
                onClick={() => setStep(3)}
                className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-100 dark:hover:bg-blue-800/70 transition-colors duration-200 flex items-center gap-1"
              >
                {selectedVoice} voice
                <span className="text-xs">&times;</span>
              </button>
            )}
          </div>
        </div>

        {/* Steps Container */}
        <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
              >
                <motion.h2 variants={itemVariants} className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Choose a meditation category:
                </motion.h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {categories.map((category) => (
                    <motion.div
                      key={category.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-auto py-4 px-4 justify-start text-left rounded-xl border-2 transition-all duration-300 group",
                          selectedCategory === category.id
                            ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 shadow-md"
                            : "hover:border-violet-300 hover:bg-violet-50/50 dark:hover:bg-violet-900/10",
                        )}
                        onClick={() => handleCategorySelect(category.id, category.name)}
                      >
                        <div className="flex items-center w-full">
                          <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-violet-100 dark:bg-violet-800 rounded-full">
                            {category.icon}
                          </span>
                          <span className="flex-1 font-medium">{category.name}</span>
                          <ChevronRight className="w-5 h-5 ml-2 text-violet-400 group-hover:text-violet-600 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
              >
                <motion.h2 variants={itemVariants} className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Select meditation length:
                </motion.h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {durations.map((duration) => (
                    <motion.div
                      key={duration.value}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-auto py-6 px-4 flex flex-col items-center rounded-xl border-2 transition-all duration-300",
                          selectedDuration === duration.value
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-md"
                            : "hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10",
                        )}
                        onClick={() => handleDurationSelect(duration.value)}
                      >
                        <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                          {duration.value}
                        </span>
                        <span className="mt-1 text-lg font-medium">{duration.label}</span>
                        <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">{duration.description}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 text-right">
                  <Button
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Back
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
              >
                <motion.h2 variants={itemVariants} className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Choose your meditation voice:
                </motion.h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {voices.map((voice) => (
                    <motion.div
                      key={voice.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={cn(
                          "w-full h-auto py-4 px-6 flex items-center justify-between rounded-xl border-2 transition-all duration-300 cursor-pointer",
                          selectedVoice === voice.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                            : "hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/10",
                        )}
                        onClick={() => handleVoiceSelect(voice.id)}
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{voice.label}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{voice.description}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation()
                              togglePlayVoice(voice.id)
                            }}
                          >
                            {playingVoice === voice.id ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <ChevronRight className="w-5 h-5 text-blue-400" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 text-right">
                  <Button
                    variant="ghost"
                    onClick={() => setStep(2)}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Back
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
              >
                <motion.h2 variants={itemVariants} className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Personalize your meditation:
                </motion.h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="intention">What is your intention for this meditation?</Label>
                    <Input
                      id="intention"
                      name="intention"
                      placeholder="e.g., Find inner peace, Improve focus, Release stress..."
                      value={formData.intention}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="challenges">What challenges are you currently facing?</Label>
                    <Textarea
                      id="challenges"
                      name="challenges"
                      placeholder="Share any specific challenges or concerns you'd like to address..."
                      value={formData.challenges}
                      onChange={handleInputChange}
                      className="w-full min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="affirmation">Choose a personal affirmation:</Label>
                    <Input
                      id="affirmation"
                      name="affirmation"
                      placeholder="e.g., I am capable of great things, I choose peace over worry..."
                      value={formData.affirmation}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(3)}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                      Back
                    </Button>
                    <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white">
                      Create Meditation
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                className="text-center py-12"
              >
                {!meditationReady ? (
                  <div className="space-y-4">
                    <Loader2 className="w-12 h-12 mx-auto animate-spin text-violet-600" />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      Creating your personalized meditation...
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our AI is crafting a unique meditation experience just for you.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-violet-600" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      Your meditation is ready!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      We've created a personalized meditation experience based on your preferences and needs.
                    </p>
                    <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                      Start Meditation
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </BackgroundGradient>
    </div>
  )
} 