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
    <div className="relative max-w-4xl mx-auto p-6">
      <FloatingParticles />
      <BackgroundGradient className="overflow-hidden">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100/50">
          <ProgressBar progress={progress} className="bg-violet-500" />
        </div>

        {/* Progress Summary Bar */}
        <div className="p-4 bg-white/90 backdrop-blur-sm border-b">
          <p className="text-sm font-medium text-gray-700">Your meditation choices:</p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {selectedCategory && (
              <button
                onClick={() => setStep(1)}
                className="px-3 py-1 text-sm font-medium rounded-full bg-violet-50 text-violet-700 hover:bg-violet-100 transition-colors duration-200 flex items-center gap-1"
              >
                {selectedCategoryName}
                <span className="text-xs text-violet-700">&times;</span>
              </button>
            )}
            {selectedDuration && (
              <button
                onClick={() => setStep(2)}
                className="px-3 py-1 text-sm font-medium rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors duration-200 flex items-center gap-1"
              >
                {selectedDuration} min
                <span className="text-xs text-indigo-700">&times;</span>
              </button>
            )}
            {selectedVoice && (
              <button
                onClick={() => setStep(3)}
                className="px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200 flex items-center gap-1"
              >
                {selectedVoice} voice
                <span className="text-xs text-blue-700">&times;</span>
              </button>
            )}
          </div>
        </div>

        {/* Steps Container */}
        <div className="p-6 bg-white/90 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
              >
                <motion.h2 variants={itemVariants} className="mb-6 text-2xl font-bold text-gray-800">
                  Choose a meditation category:
                </motion.h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {categories.map((category) => (
                    <motion.div
                      key={category.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-auto py-3 px-4 justify-start text-left rounded-lg border transition-all duration-300 group bg-white hover:bg-gray-50",
                          selectedCategory === category.id
                            ? "border-violet-500 ring-1 ring-violet-500/20"
                            : "border-gray-200 hover:border-violet-300",
                        )}
                        onClick={() => handleCategorySelect(category.id, category.name)}
                      >
                        <div className="flex items-center w-full">
                          <span className="flex items-center justify-center w-8 h-8 mr-3 text-lg bg-violet-50 text-violet-600 rounded-lg shadow-sm">
                            {category.icon}
                          </span>
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-sm font-medium text-gray-900 truncate">{category.name}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-violet-500 transition-all duration-300 transform group-hover:translate-x-0.5" />
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
                <motion.h2 variants={itemVariants} className="mb-6 text-2xl font-bold text-gray-800">
                  Select meditation length:
                </motion.h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {durations.map((duration) => (
                    <motion.div
                      key={duration.value}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-auto py-8 px-4 flex flex-col items-center rounded-xl border-2 bg-white hover:bg-gray-50 transition-all duration-300",
                          selectedDuration === duration.value
                            ? "border-violet-500 bg-violet-50/50 shadow-md ring-1 ring-violet-500/20"
                            : "hover:border-violet-300 hover:shadow-sm"
                        )}
                        onClick={() => handleDurationSelect(duration.value)}
                      >
                        <span className="text-4xl font-bold text-violet-600 mb-2">
                          {duration.value}
                        </span>
                        <span className="text-base font-medium text-gray-900">{duration.label}</span>
                        <span className="mt-1 text-sm text-gray-500">{duration.description}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 text-right">
                  <Button
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className="text-violet-600 hover:text-violet-700 hover:bg-violet-50"
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
                <motion.h2 variants={itemVariants} className="mb-6 text-2xl font-bold text-gray-800">
                  Choose a voice:
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
                          "p-6 border-2 rounded-xl flex flex-col items-center transition-all duration-300 bg-white/90 backdrop-blur-sm hover:shadow-lg",
                          selectedVoice === voice.id
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "hover:border-blue-300 hover:bg-blue-50/50",
                        )}
                      >
                        <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center shadow-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-blue-600"
                            onClick={() => togglePlayVoice(voice.id)}
                          >
                            {playingVoice === voice.id ? (
                              <Pause className="w-6 h-6" />
                            ) : (
                              <Play className="w-6 h-6 ml-0.5" />
                            )}
                          </Button>
                        </div>
                        <h3 className="mb-1 text-lg font-bold text-gray-700">{voice.label}</h3>
                        <p className="mb-4 text-sm text-gray-600">{voice.description}</p>
                        <Button
                          variant="default"
                          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md"
                          onClick={() => handleVoiceSelect(voice.id)}
                        >
                          Select
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 text-right">
                  <Button
                    variant="ghost"
                    onClick={() => setStep(2)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
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
                className="max-w-3xl mx-auto"
              >
                <motion.h2 variants={itemVariants} className="mb-8 text-2xl font-bold text-gray-800">
                  Personalize your meditation:
                </motion.h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <motion.div variants={itemVariants} className="space-y-3">
                    <Label htmlFor="intention" className="text-lg font-medium text-gray-800">
                      What is your intention for this meditation?
                    </Label>
                    <Textarea
                      id="intention"
                      name="intention"
                      placeholder="e.g., To find inner peace, to reduce anxiety..."
                      value={formData.intention}
                      onChange={handleInputChange}
                      required
                      className="min-h-[120px] bg-white border border-gray-200 hover:border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 rounded-2xl resize-none transition-all duration-200 text-base text-gray-800 placeholder:text-gray-400 p-4"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-3">
                    <Label htmlFor="challenges" className="text-lg font-medium text-gray-800">
                      What challenges would you like to address?
                    </Label>
                    <Textarea
                      id="challenges"
                      name="challenges"
                      placeholder="e.g., Work stress, sleep issues, relationship difficulties..."
                      value={formData.challenges}
                      onChange={handleInputChange}
                      required
                      className="min-h-[120px] bg-white border border-gray-200 hover:border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 rounded-2xl resize-none transition-all duration-200 text-base text-gray-800 placeholder:text-gray-400 p-4"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-3">
                    <Label htmlFor="affirmation" className="text-lg font-medium text-gray-800">
                      Is there a specific affirmation you'd like to include?
                    </Label>
                    <Input
                      id="affirmation"
                      name="affirmation"
                      placeholder="e.g., I am calm and centered"
                      value={formData.affirmation}
                      onChange={handleInputChange}
                      className="h-14 bg-white border border-gray-200 hover:border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 rounded-xl transition-all duration-200 text-base text-gray-800 placeholder:text-gray-400 px-4"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex justify-between items-center pt-6">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(3)}
                      className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 text-base font-medium"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white shadow-lg rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                    >
                      <Sparkles className="w-5 h-5 mr-2 text-violet-100" />
                      Create Your Meditation
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                className="py-10 text-center"
              >
                <AnimatePresence mode="wait">
                  {!meditationReady ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <Loader2 className="w-16 h-16 mb-4 text-indigo-600 animate-spin" />
                      <h2 className="mb-2 text-2xl font-bold text-gray-700">
                        Crafting Your Meditation
                      </h2>
                      <p className="text-gray-600">
                        Our AI is personalizing your meditation experience...
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        className="relative inline-flex items-center justify-center w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 opacity-50 blur-md"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-16 h-16 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-3 text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
                      >
                        Your meditation is ready!
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8 text-lg text-gray-600"
                      >
                        Your personalized {selectedCategoryName} meditation has been created.
                        <br />
                        Take a deep breath and prepare for your journey.
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Button
                          onClick={() => {
                            setStep(1)
                            setSelectedCategory("")
                            setSelectedCategoryName("")
                            setSelectedDuration(null)
                            setSelectedVoice("")
                            setFormData({
                              intention: "",
                              challenges: "",
                              affirmation: "",
                            })
                            setMeditationReady(false)
                          }}
                          className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white shadow-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                        >
                          Start Meditation
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </BackgroundGradient>
    </div>
  )
} 