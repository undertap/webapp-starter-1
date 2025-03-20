"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Play, Pause, Sparkles, Loader2, ArrowRight, Music, Clock, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { ProgressBar } from "@/components/ui/progress-bar"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  ShortFormData, 
  AttachmentProfile, 
  MeditationRecommendation,
  saveFormData, 
  loadFormData, 
  analyzeFormData, 
  generateRecommendation 
} from "@/lib/meditation-profile"

// Create a custom SkipButton component to standardize all skip buttons
const SkipButton = ({ onClick, children = "Skip" }: { onClick: () => void, children?: React.ReactNode }) => (
  <Button
    type="button"
    variant="link"
    onClick={onClick}
    className="text-gray-500 hover:text-violet-600 text-sm font-medium flex items-center group"
  >
    {children}
    <ChevronsRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
  </Button>
);

// Create a custom ContinueButton component for all continue buttons
const ContinueButton = ({ onClick, disabled = false }: { onClick: () => void, disabled?: boolean }) => (
  <Button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "px-6 py-3 text-base font-medium shadow-lg rounded-xl transition-all duration-300",
      "bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white",
      "transform hover:translate-y-[-2px] hover:shadow-violet-200/50 disabled:opacity-50 disabled:pointer-events-none"
    )}
  >
    Continue
    <ChevronRight className="ml-2 h-5 w-5 text-violet-200" />
  </Button>
);

// Create a custom BackButton component
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    type="button"
    variant="ghost"
    onClick={onClick}
    className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 font-medium flex items-center"
  >
    <ChevronRight className="mr-1 h-4 w-4 rotate-180" />
    Back
  </Button>
);

export default function MeditationCreator() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [meditationReady, setMeditationReady] = useState(false)
  const [formData, setFormData] = useState<ShortFormData>({
    attachmentTendencies: "",
    emotionalCheckIn: "",
    meditationPreference: "",
    stressResponse: "",
    personalGoal: "",
  })
  const [userProfile, setUserProfile] = useState<AttachmentProfile | null>(null)
  const [recommendation, setRecommendation] = useState<MeditationRecommendation | null>(null)

  // Load saved form data on component mount
  useEffect(() => {
    const savedData = loadFormData()
    if (savedData) {
      setFormData(savedData)
    }
  }, [])

  // Update progress bar based on current step
  useEffect(() => {
    // Calculate progress based on completed steps
    const totalSteps = 6 // 5 questions + results
    const completedSteps = step - 1
    setProgress((completedSteps / totalSteps) * 100)
  }, [step])

  // Save form data whenever it changes
  useEffect(() => {
    saveFormData(formData)
  }, [formData])

  const handleInputChange = (name: keyof ShortFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSkip = (nextStep: number) => {
    setStep(nextStep)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(6)
    
    // Simulate AI processing time
    setTimeout(() => {
      // Analyze form data to generate profile
      const profile = analyzeFormData(formData)
      setUserProfile(profile)
      
      // Generate meditation recommendation based on profile
      const meditationRecommendation = generateRecommendation(profile)
      setRecommendation(meditationRecommendation)
      
      setMeditationReady(true)
    }, 6000)
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
    <div className="relative max-w-4xl mx-auto">
      <div className="opacity-40">
        <FloatingParticles />
      </div>
      <BackgroundGradient className="overflow-hidden rounded-2xl shadow-xl border border-white/20">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-violet-100/30 relative overflow-hidden">
          <div 
            className="absolute inset-0 left-0 bg-gradient-to-r from-violet-500 to-violet-400 transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMEgxNlYxNkgwVjBaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+Cjwvc3ZnPg==')]" />
          </div>
        </div>

        {/* Progress Summary Bar */}
        <div className="p-4 bg-white/95 backdrop-blur-md border-b border-violet-100">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-700">Your personal meditation profile</p>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                {Array.from({length: Math.min(step - 1, 5)}).map((_, i) => (
                  <div key={i} className="size-6 rounded-full bg-violet-500 flex items-center justify-center ring-2 ring-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                ))}
                {Array.from({length: Math.max(6 - step, 0)}).map((_, i) => (
                  <div key={i + step - 1} className="size-6 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-white">
                    <span className="text-[9px] font-medium text-gray-500">{i + step}</span>
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-500">
                {step > 1 ? `${step - 1}/5 completed` : "Getting started"}
              </span>
            </div>
          </div>
        </div>

        {/* Steps Container */}
        <div className="p-8 bg-white/95 backdrop-blur-md min-h-[500px] flex items-stretch">
          <AnimatePresence mode="wait">
            {/* Step 1: Attachment Tendencies */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                className="max-w-3xl mx-auto"
              >
                <motion.div variants={itemVariants} className="mb-8">
                  <div className="inline-flex items-center mb-2 bg-violet-100/50 px-3 py-1 rounded-full">
                    <span className="text-violet-700 text-xs font-medium uppercase tracking-wider">Question 1 of 5</span>
                  </div>
                  <h2 className="mb-2 text-2xl font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">
                    <span className="mr-2 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    Attachment Tendencies
                  </h2>
                  <p className="text-gray-600 leading-relaxed max-w-2xl">
                    Understanding how you <span className="font-medium text-violet-700">connect with others</span> helps us create a meditation that addresses your unique needs.
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-5 mb-8">
                  <div className="mb-5">
                    <Label htmlFor="attachmentTendencies" className="text-lg font-medium text-gray-800 flex items-center">
                      <span className="mr-2 flex-shrink-0 text-violet-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Do you often seek reassurance in relationships?
                    </Label>
                    <div className="bg-violet-50/50 mt-2 p-2 rounded text-sm text-violet-700 italic border-l-2 border-violet-200">
                      This helps us understand your attachment style, which influences how you process emotions and connect with yourself.
                    </div>
                  </div>
                  <RadioGroup
                    value={formData.attachmentTendencies}
                    onValueChange={(value) => handleInputChange("attachmentTendencies", value)}
                    className="grid gap-4 pt-2"
                  >
                    <div 
                      onClick={() => handleInputChange("attachmentTendencies", "frequently")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.attachmentTendencies === "frequently" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="frequently" id="frequently" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="frequently" className={cn(
                          "flex-1 font-medium", 
                          formData.attachmentTendencies === "frequently" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Yes, frequently
                        </Label>
                        <p className="text-gray-500 text-sm mt-1">I often need reassurance that others care about me</p>
                      </div>
                      {formData.attachmentTendencies === "frequently" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div 
                      onClick={() => handleInputChange("attachmentTendencies", "sometimes")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.attachmentTendencies === "sometimes" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="sometimes" id="sometimes" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="sometimes" className={cn(
                          "flex-1 font-medium", 
                          formData.attachmentTendencies === "sometimes" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Sometimes
                        </Label>
                        <p className="text-gray-500 text-sm mt-1">I occasionally need reassurance but not always</p>
                      </div>
                      {formData.attachmentTendencies === "sometimes" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div 
                      onClick={() => handleInputChange("attachmentTendencies", "rarely")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.attachmentTendencies === "rarely" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="rarely" id="rarely" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="rarely" className={cn(
                          "flex-1 font-medium", 
                          formData.attachmentTendencies === "rarely" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Rarely
                        </Label>
                        <p className="text-gray-500 text-sm mt-1">I generally prefer self-reliance and independence</p>
                      </div>
                      {formData.attachmentTendencies === "rarely" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </RadioGroup>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-between items-center pt-6">
                  <SkipButton onClick={() => handleSkip(2)}>Skip this question</SkipButton>
                  <ContinueButton 
                    onClick={() => setStep(2)} 
                    disabled={!formData.attachmentTendencies} 
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Emotional Check-In */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                className="max-w-3xl mx-auto"
              >
                <motion.div variants={itemVariants} className="mb-8">
                  <div className="inline-flex items-center mb-2 bg-violet-100/50 px-3 py-1 rounded-full">
                    <span className="text-violet-700 text-xs font-medium uppercase tracking-wider">Question 2 of 5</span>
                  </div>
                  <h2 className="mb-2 text-2xl font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">
                    <span className="mr-2 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Emotional Check-In
                  </h2>
                  <p className="text-gray-600 leading-relaxed max-w-2xl">
                    Let's explore your <span className="font-medium text-violet-700">emotional landscape</span> to better support your meditation journey.
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-5 mb-8">
                  <div className="mb-5">
                    <Label htmlFor="emotionalCheckIn" className="text-lg font-medium text-gray-800 flex items-center">
                      <span className="mr-2 flex-shrink-0 text-violet-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </span>
                      What emotion do you struggle with the most?
                    </Label>
                  </div>
                  <RadioGroup
                    value={formData.emotionalCheckIn}
                    onValueChange={(value) => handleInputChange("emotionalCheckIn", value)}
                    className="grid gap-4 pt-2"
                  >
                    <div 
                      onClick={() => handleInputChange("emotionalCheckIn", "anxiety")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.emotionalCheckIn === "anxiety" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="anxiety" id="anxiety" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="anxiety" className={cn(
                          "flex-1 font-medium", 
                          formData.emotionalCheckIn === "anxiety" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Anxiety/Worry
                        </Label>
                        <p className="text-gray-500 text-sm mt-1">I often feel tense or nervous about the future</p>
                      </div>
                      {formData.emotionalCheckIn === "anxiety" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div 
                      onClick={() => handleInputChange("emotionalCheckIn", "sadness")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.emotionalCheckIn === "sadness" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="sadness" id="sadness" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="sadness" className={cn(
                          "flex-1 font-medium", 
                          formData.emotionalCheckIn === "sadness" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Sadness/Depression
                        </Label>
                        <p className="text-gray-500 text-sm mt-1">I frequently feel down or experience low mood</p>
                      </div>
                      {formData.emotionalCheckIn === "sadness" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div 
                      onClick={() => handleInputChange("emotionalCheckIn", "anger")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.emotionalCheckIn === "anger" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="anger" id="anger" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="anger" className={cn(
                          "flex-1 font-medium", 
                          formData.emotionalCheckIn === "anger" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Anger/Irritability
                        </Label>
                        <p className="text-gray-500 text-sm mt-1">I get frustrated or annoyed easily</p>
                      </div>
                      {formData.emotionalCheckIn === "anger" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div 
                      onClick={() => handleInputChange("emotionalCheckIn", "fear")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.emotionalCheckIn === "fear" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="fear" id="fear" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="fear" className={cn(
                          "flex-1 font-medium", 
                          formData.emotionalCheckIn === "fear" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Fear/Insecurity
                        </Label>
                        <p className="text-gray-500 text-sm mt-1">I struggle with feeling safe or secure</p>
                      </div>
                      {formData.emotionalCheckIn === "fear" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </RadioGroup>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-between items-center pt-6">
                  <div className="flex gap-4">
                    <BackButton onClick={() => setStep(1)} />
                    <SkipButton onClick={() => handleSkip(3)} />
                  </div>
                  <ContinueButton 
                    onClick={() => setStep(3)} 
                    disabled={!formData.emotionalCheckIn} 
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Step 3: Meditation Preference */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                className="max-w-3xl mx-auto"
              >
                <motion.div variants={itemVariants} className="mb-8">
                  <div className="inline-flex items-center mb-2 bg-violet-100/50 px-3 py-1 rounded-full">
                    <span className="text-violet-700 text-xs font-medium uppercase tracking-wider">Question 3 of 5</span>
                  </div>
                  <h2 className="mb-2 text-2xl font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">
                    <span className="mr-2 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </span>
                    Meditation Preference
                  </h2>
                  <p className="text-gray-600 leading-relaxed max-w-2xl">
                    Everyone's meditation journey is <span className="font-medium text-violet-700">unique</span>. Let's discover what resonates with you.
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-5 mb-8">
                  <div className="mb-5">
                    <Label htmlFor="meditationPreference" className="text-lg font-medium text-gray-800 flex items-center">
                      <span className="mr-2 flex-shrink-0 text-violet-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </span>
                      What do you prefer during meditation?
                    </Label>
                  </div>
                  <RadioGroup
                    value={formData.meditationPreference}
                    onValueChange={(value) => handleInputChange("meditationPreference", value)}
                    className="grid gap-4 pt-2"
                  >
                    <div 
                      onClick={() => handleInputChange("meditationPreference", "visualImagery")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.meditationPreference === "visualImagery" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="visualImagery" id="visualImagery" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="visualImagery" className={cn(
                          "flex-1 font-medium", 
                          formData.meditationPreference === "visualImagery" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Visual imagery
                        </Label>
                        <p className="text-gray-500 text-sm mt-1">I like to visualize peaceful scenes or situations</p>
                      </div>
                      {formData.meditationPreference === "visualImagery" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div 
                      onClick={() => handleInputChange("meditationPreference", "soothing")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.meditationPreference === "soothing" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="soothing" id="soothing" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="soothing" className={cn(
                          "flex-1 font-medium", 
                          formData.meditationPreference === "soothing" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Soothing sounds
                        </Label>
                        <p className="text-gray-500 text-sm mt-1">I find ambient sounds or music help me focus</p>
                      </div>
                      {formData.meditationPreference === "soothing" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div 
                      onClick={() => handleInputChange("meditationPreference", "guidance")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.meditationPreference === "guidance" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="guidance" id="guidance" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="guidance" className={cn(
                          "flex-1 font-medium", 
                          formData.meditationPreference === "guidance" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Spoken guidance
                        </Label>
                        <p className="text-gray-500 text-sm mt-1">I prefer clear verbal instructions throughout</p>
                      </div>
                      {formData.meditationPreference === "guidance" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div 
                      onClick={() => handleInputChange("meditationPreference", "breathwork")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.meditationPreference === "breathwork" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="breathwork" id="breathwork" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="breathwork" className={cn(
                          "flex-1 font-medium", 
                          formData.meditationPreference === "breathwork" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Breathwork
                        </Label>
                        <p className="text-gray-500 text-sm mt-1">I connect most with focusing on my breathing</p>
                      </div>
                      {formData.meditationPreference === "breathwork" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </RadioGroup>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-between items-center pt-6">
                  <div className="flex gap-4">
                    <BackButton onClick={() => setStep(2)} />
                    <SkipButton onClick={() => handleSkip(4)} />
                  </div>
                  <ContinueButton 
                    onClick={() => setStep(4)} 
                    disabled={!formData.meditationPreference} 
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Step 4: Stress Response */}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                className="max-w-3xl mx-auto"
              >
                <motion.div variants={itemVariants} className="mb-8">
                  <div className="inline-flex items-center mb-2 bg-violet-100/50 px-3 py-1 rounded-full">
                    <span className="text-violet-700 text-xs font-medium uppercase tracking-wider">Question 4 of 5</span>
                  </div>
                  <h2 className="mb-2 text-2xl font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">
                    <span className="mr-2 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                    Stress Response
                  </h2>
                  <p className="text-gray-600 leading-relaxed max-w-2xl">
                    Understanding how you <span className="font-medium text-violet-700">respond to stress</span> helps us tailor your meditation experience.
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-5 mb-8">
                  <div className="mb-5">
                    <Label htmlFor="stressResponse" className="text-lg font-medium text-gray-800 flex items-center">
                      <span className="mr-2 flex-shrink-0 text-violet-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </span>
                      When you feel stressed, are you more likely to:
                    </Label>
                  </div>
                  <RadioGroup
                    value={formData.stressResponse}
                    onValueChange={(value) => handleInputChange("stressResponse", value)}
                    className="grid gap-4 pt-2"
                  >
                    <div 
                      onClick={() => handleInputChange("stressResponse", "seekOthers")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.stressResponse === "seekOthers" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="seekOthers" id="seekOthers" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="seekOthers" className={cn(
                          "flex-1 font-medium", 
                          formData.stressResponse === "seekOthers" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Seek comfort from others
                        </Label>
                        <p className="text-gray-500 text-sm mt-1">I reach out to friends or family</p>
                      </div>
                      {formData.stressResponse === "seekOthers" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div 
                      onClick={() => handleInputChange("stressResponse", "withdraw")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.stressResponse === "withdraw" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="withdraw" id="withdraw" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="withdraw" className={cn(
                          "flex-1 font-medium", 
                          formData.stressResponse === "withdraw" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Withdraw and be alone
                        </Label>
                        <p className="text-gray-500 text-sm mt-1">I need space to process my feelings</p>
                      </div>
                      {formData.stressResponse === "withdraw" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div 
                      onClick={() => handleInputChange("stressResponse", "distract")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.stressResponse === "distract" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="distract" id="distract" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="distract" className={cn(
                          "flex-1 font-medium", 
                          formData.stressResponse === "distract" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Distract myself
                        </Label>
                        <p className="text-gray-500 text-sm mt-1">I engage in activities to avoid thinking about it</p>
                      </div>
                      {formData.stressResponse === "distract" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div 
                      onClick={() => handleInputChange("stressResponse", "problemSolve")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.stressResponse === "problemSolve" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="problemSolve" id="problemSolve" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="problemSolve" className={cn(
                          "flex-1 font-medium", 
                          formData.stressResponse === "problemSolve" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Problem-solve immediately
                        </Label>
                        <p className="text-gray-500 text-sm mt-1">I focus on fixing the situation</p>
                      </div>
                      {formData.stressResponse === "problemSolve" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </RadioGroup>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-between items-center pt-6">
                  <div className="flex gap-4">
                    <BackButton onClick={() => setStep(3)} />
                    <SkipButton onClick={() => handleSkip(5)} />
                  </div>
                  <ContinueButton 
                    onClick={() => setStep(5)} 
                    disabled={!formData.stressResponse} 
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Step 5: Personal Goal */}
            {step === 5 && (
              <motion.div
                key="step5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                className="max-w-3xl mx-auto"
              >
                <motion.div variants={itemVariants} className="mb-8">
                  <div className="inline-flex items-center mb-2 bg-violet-100/50 px-3 py-1 rounded-full">
                    <span className="text-violet-700 text-xs font-medium uppercase tracking-wider">Question 5 of 5</span>
                  </div>
                  <h2 className="mb-2 text-2xl font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">
                    <span className="mr-2 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </span>
                    Personal Goal
                  </h2>
                  <p className="text-gray-600 leading-relaxed max-w-2xl">
                    Let's focus your meditation on what <span className="font-medium text-violet-700">matters most</span> to you right now.
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-5 mb-8">
                  <div className="mb-5">
                    <Label htmlFor="personalGoal" className="text-lg font-medium text-gray-800 flex items-center">
                      <span className="mr-2 flex-shrink-0 text-violet-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </span>
                      What do you hope meditation will help you with?
                    </Label>
                  </div>
                  <RadioGroup
                    value={formData.personalGoal}
                    onValueChange={(value) => handleInputChange("personalGoal", value)}
                    className="grid gap-4 pt-2"
                  >
                    <div 
                      onClick={() => handleInputChange("personalGoal", "reduceAnxiety")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.personalGoal === "reduceAnxiety" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="reduceAnxiety" id="reduceAnxiety" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="reduceAnxiety" className={cn(
                          "flex-1 font-medium", 
                          formData.personalGoal === "reduceAnxiety" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Reduce anxiety and worry
                        </Label>
                      </div>
                      {formData.personalGoal === "reduceAnxiety" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div 
                      onClick={() => handleInputChange("personalGoal", "betterSleep")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.personalGoal === "betterSleep" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="betterSleep" id="betterSleep" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="betterSleep" className={cn(
                          "flex-1 font-medium", 
                          formData.personalGoal === "betterSleep" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Improve sleep quality
                        </Label>
                      </div>
                      {formData.personalGoal === "betterSleep" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div 
                      onClick={() => handleInputChange("personalGoal", "emotionalHealing")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.personalGoal === "emotionalHealing" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="emotionalHealing" id="emotionalHealing" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="emotionalHealing" className={cn(
                          "flex-1 font-medium", 
                          formData.personalGoal === "emotionalHealing" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Process difficult emotions or past experiences
                        </Label>
                      </div>
                      {formData.personalGoal === "emotionalHealing" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div 
                      onClick={() => handleInputChange("personalGoal", "selfAcceptance")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.personalGoal === "selfAcceptance" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="selfAcceptance" id="selfAcceptance" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="selfAcceptance" className={cn(
                          "flex-1 font-medium", 
                          formData.personalGoal === "selfAcceptance" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Develop greater self-compassion and acceptance
                        </Label>
                      </div>
                      {formData.personalGoal === "selfAcceptance" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div 
                      onClick={() => handleInputChange("personalGoal", "focus")}
                      className={cn(
                        "flex items-center space-x-3 bg-white p-5 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer",
                        "hover:border-violet-300 hover:shadow-md",
                        formData.personalGoal === "focus" 
                          ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white scale-[1.02]" 
                          : "border-gray-200 hover:border-l-violet-200 hover:border-l-4"
                      )}
                    >
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="focus" id="focus" className="text-violet-600" />
                      </div>
                      <div className="ml-2 flex-1">
                        <Label htmlFor="focus" className={cn(
                          "flex-1 font-medium", 
                          formData.personalGoal === "focus" ? "text-violet-900" : "text-gray-700"
                        )}>
                          Enhance focus and mental clarity
                        </Label>
                      </div>
                      {formData.personalGoal === "focus" && (
                        <div className="flex-shrink-0 text-violet-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </RadioGroup>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-between items-center pt-6">
                  <div className="flex gap-4">
                    <BackButton onClick={() => setStep(4)} />
                    <SkipButton onClick={() => handleSubmit(new Event('click') as any)} />
                  </div>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!formData.personalGoal}
                    className={cn(
                      "px-8 py-3 text-lg font-semibold shadow-lg rounded-xl transition-all duration-300",
                      "bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white",
                      "transform hover:translate-y-[-2px] hover:shadow-violet-200/50 disabled:opacity-50 disabled:pointer-events-none"
                    )}
                  >
                    <Sparkles className="w-5 h-5 mr-2 text-violet-100" />
                    Create My Meditation
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Step 6: Results */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className="py-10 text-center w-full"
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
                      <div className="relative w-24 h-24 mb-8">
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-400 to-indigo-500 opacity-25 blur-xl"
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        />
                        <Loader2 className="w-24 h-24 text-violet-600 animate-spin relative" />
                      </div>
                      <h2 className="mb-4 text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                        Creating Your Meditation
                      </h2>
                      <div className="max-w-sm mx-auto">
                        <p className="text-gray-600 mb-6">
                          Our AI is analyzing your responses and crafting a personalized meditation experience just for you...
                        </p>
                        <motion.div
                          className="h-1 w-full bg-gray-200 rounded-full overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <motion.div
                            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5.5, ease: "easeInOut" }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="success" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.2,
                        }}
                        className="relative mb-8"
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400/30 to-indigo-600/30 blur-xl" />
                        <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg">
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                            className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 opacity-70 blur-sm"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-14 h-14 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </motion.div>
                      
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-6 text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
                      >
                        Your Meditation is Ready!
                      </motion.h2>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mb-8 max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-violet-100"
                      >
                        <div className="flex flex-col md:flex-row gap-6 text-left">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                              <Sparkles className="mr-2 h-5 w-5 text-violet-500" />
                              Your Personal Meditation
                            </h3>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                              {recommendation ? (
                                <>
                                  Based on your profile, we've created a <span className="font-medium text-violet-700">{recommendation.type}</span> meditation 
                                  focused on {recommendation.focus}.
                                </>
                              ) : (
                                <>
                                  Based on your profile, we've created a <span className="font-medium text-violet-700">Grounding & Acceptance</span> meditation 
                                  focused on {formData.personalGoal === "reduceAnxiety" 
                                    ? "calming anxiety and finding inner peace" 
                                    : formData.personalGoal === "betterSleep" 
                                    ? "releasing tension and preparing for restful sleep"
                                    : formData.personalGoal === "emotionalHealing"
                                    ? "gentle emotional processing and healing"
                                    : formData.personalGoal === "selfAcceptance"
                                    ? "self-compassion and inner acceptance"
                                    : "enhancing mental clarity and focus"}.
                                </>
                              )}
                            </p>
                            <div className="grid grid-cols-2 gap-4 mt-6">
                              <div className="bg-violet-50 p-3 rounded-lg">
                                <div className="flex items-center text-violet-800 text-sm font-medium mb-1">
                                  <Clock className="h-4 w-4 mr-2" />
                                  Duration
                                </div>
                                <span className="text-gray-700 font-semibold">
                                  {recommendation?.duration || 10} minutes
                                </span>
                              </div>
                              <div className="bg-violet-50 p-3 rounded-lg">
                                <div className="flex items-center text-violet-800 text-sm font-medium mb-1">
                                  <Music className="h-4 w-4 mr-2" />
                                  Sound
                                </div>
                                <span className="text-gray-700 font-semibold">
                                  {recommendation?.hasMusic ? "With" : "Without"} music
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-1/3 flex items-center justify-center">
                            <div className="w-full max-w-[180px] aspect-square rounded-2xl overflow-hidden bg-violet-100 flex items-center justify-center shadow-md relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-indigo-600/20" />
                              <Play className="w-16 h-16 text-violet-700 group-hover:scale-110 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-2"
                      >
                        <Button
                          onClick={() => {
                            // Store the return URL in localStorage so we can redirect after sign-up
                            if (typeof window !== 'undefined') {
                              localStorage.setItem("redirectAfterSignup", "/dashboard");
                            }
                            // Redirect to sign-up page to save profile and get meditation
                            window.location.href = "/signup";
                          }}
                          className={cn(
                            "px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300",
                            "bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white",
                            "shadow-lg transform hover:translate-y-[-3px] hover:shadow-violet-500/25"
                          )}
                        >
                          <span className="mr-2">Create Account & Access Your Meditation</span>
                          <ArrowRight className="h-5 w-5" />
                        </Button>
                        <p className="text-gray-500 text-sm mt-4">
                          Your meditation profile will be saved when you create an account
                        </p>
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