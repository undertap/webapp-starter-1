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
    <div className="relative max-w-4xl mx-auto p-6">
      <FloatingParticles />
      <BackgroundGradient className="overflow-hidden">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100/50">
          <ProgressBar progress={progress} className="bg-violet-500" />
        </div>

        {/* Progress Summary Bar */}
        <div className="p-4 bg-white/90 backdrop-blur-sm border-b">
          <p className="text-sm font-medium text-gray-700">Your personal meditation profile:</p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-sm text-gray-600">
              {step > 1 ? `${step - 1} of 5 questions completed` : "Getting started..."}
            </span>
          </div>
        </div>

        {/* Steps Container */}
        <div className="p-6 bg-white/90 backdrop-blur-sm">
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
                <motion.h2 variants={itemVariants} className="mb-4 text-2xl font-bold text-gray-800">
                  Attachment Tendencies
                </motion.h2>
                <motion.p variants={itemVariants} className="mb-6 text-gray-600">
                  Understanding how you connect with others helps us create a meditation that addresses your unique needs.
                </motion.p>
                
                <motion.div variants={itemVariants} className="space-y-4 mb-8">
                  <Label htmlFor="attachmentTendencies" className="text-lg font-medium text-gray-800">
                    Do you often seek reassurance in relationships?
                  </Label>
                  <RadioGroup
                    value={formData.attachmentTendencies}
                    onValueChange={(value) => handleInputChange("attachmentTendencies", value)}
                    className="grid gap-4 pt-2"
                  >
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="frequently" id="frequently" />
                      <Label htmlFor="frequently" className="flex-1 font-medium text-gray-700">
                        Yes, frequently - I often need reassurance that others care about me
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="sometimes" id="sometimes" />
                      <Label htmlFor="sometimes" className="flex-1 font-medium text-gray-700">
                        Sometimes - I occasionally need reassurance but not always
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="rarely" id="rarely" />
                      <Label htmlFor="rarely" className="flex-1 font-medium text-gray-700">
                        Rarely - I generally prefer self-reliance and independence
                      </Label>
                    </div>
                  </RadioGroup>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-between items-center pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSkip(2)}
                    className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-base font-medium"
                  >
                    Skip this question
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!formData.attachmentTendencies}
                    className="px-6 py-2 text-base font-medium bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white shadow-md rounded-lg transition-all duration-300"
                  >
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
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
                <motion.h2 variants={itemVariants} className="mb-4 text-2xl font-bold text-gray-800">
                  Emotional Check-In
                </motion.h2>
                <motion.p variants={itemVariants} className="mb-6 text-gray-600">
                  Let's explore your emotional landscape to better support your meditation journey.
                </motion.p>
                
                <motion.div variants={itemVariants} className="space-y-4 mb-8">
                  <Label htmlFor="emotionalCheckIn" className="text-lg font-medium text-gray-800">
                    What emotion do you struggle with the most?
                  </Label>
                  <RadioGroup
                    value={formData.emotionalCheckIn}
                    onValueChange={(value) => handleInputChange("emotionalCheckIn", value)}
                    className="grid gap-4 pt-2"
                  >
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="anxiety" id="anxiety" />
                      <Label htmlFor="anxiety" className="flex-1 font-medium text-gray-700">
                        Anxiety/Worry - I often feel tense or nervous about the future
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="sadness" id="sadness" />
                      <Label htmlFor="sadness" className="flex-1 font-medium text-gray-700">
                        Sadness/Depression - I frequently feel down or experience low mood
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="anger" id="anger" />
                      <Label htmlFor="anger" className="flex-1 font-medium text-gray-700">
                        Anger/Irritability - I get frustrated or annoyed easily
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="fear" id="fear" />
                      <Label htmlFor="fear" className="flex-1 font-medium text-gray-700">
                        Fear/Insecurity - I struggle with feeling safe or secure
                      </Label>
                    </div>
                  </RadioGroup>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-between items-center pt-6">
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(1)}
                      className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 text-base font-medium"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSkip(3)}
                      className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-base font-medium"
                    >
                      Skip
                    </Button>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!formData.emotionalCheckIn}
                    className="px-6 py-2 text-base font-medium bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white shadow-md rounded-lg transition-all duration-300"
                  >
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
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
                <motion.h2 variants={itemVariants} className="mb-4 text-2xl font-bold text-gray-800">
                  Meditation Preference
                </motion.h2>
                <motion.p variants={itemVariants} className="mb-6 text-gray-600">
                  Everyone's meditation journey is unique. Let's discover what resonates with you.
                </motion.p>
                
                <motion.div variants={itemVariants} className="space-y-4 mb-8">
                  <Label htmlFor="meditationPreference" className="text-lg font-medium text-gray-800">
                    What do you prefer during meditation?
                  </Label>
                  <RadioGroup
                    value={formData.meditationPreference}
                    onValueChange={(value) => handleInputChange("meditationPreference", value)}
                    className="grid gap-4 pt-2"
                  >
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="visualImagery" id="visualImagery" />
                      <Label htmlFor="visualImagery" className="flex-1 font-medium text-gray-700">
                        Visual imagery - I like to visualize peaceful scenes or situations
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="soothing" id="soothing" />
                      <Label htmlFor="soothing" className="flex-1 font-medium text-gray-700">
                        Soothing sounds - I find ambient sounds or music help me focus
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="guidance" id="guidance" />
                      <Label htmlFor="guidance" className="flex-1 font-medium text-gray-700">
                        Spoken guidance - I prefer clear verbal instructions throughout
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="breathwork" id="breathwork" />
                      <Label htmlFor="breathwork" className="flex-1 font-medium text-gray-700">
                        Breathwork - I connect most with focusing on my breathing
                      </Label>
                    </div>
                  </RadioGroup>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-between items-center pt-6">
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(2)}
                      className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 text-base font-medium"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSkip(4)}
                      className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-base font-medium"
                    >
                      Skip
                    </Button>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setStep(4)}
                    disabled={!formData.meditationPreference}
                    className="px-6 py-2 text-base font-medium bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white shadow-md rounded-lg transition-all duration-300"
                  >
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
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
                <motion.h2 variants={itemVariants} className="mb-4 text-2xl font-bold text-gray-800">
                  Stress Response
                </motion.h2>
                <motion.p variants={itemVariants} className="mb-6 text-gray-600">
                  Understanding how you respond to stress helps us tailor your meditation experience.
                </motion.p>
                
                <motion.div variants={itemVariants} className="space-y-4 mb-8">
                  <Label htmlFor="stressResponse" className="text-lg font-medium text-gray-800">
                    When you feel stressed, are you more likely to:
                  </Label>
                  <RadioGroup
                    value={formData.stressResponse}
                    onValueChange={(value) => handleInputChange("stressResponse", value)}
                    className="grid gap-4 pt-2"
                  >
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="seekOthers" id="seekOthers" />
                      <Label htmlFor="seekOthers" className="flex-1 font-medium text-gray-700">
                        Seek comfort from others - I reach out to friends or family
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="withdraw" id="withdraw" />
                      <Label htmlFor="withdraw" className="flex-1 font-medium text-gray-700">
                        Withdraw and be alone - I need space to process my feelings
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="distract" id="distract" />
                      <Label htmlFor="distract" className="flex-1 font-medium text-gray-700">
                        Distract myself - I engage in activities to avoid thinking about it
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="problemSolve" id="problemSolve" />
                      <Label htmlFor="problemSolve" className="flex-1 font-medium text-gray-700">
                        Problem-solve immediately - I focus on fixing the situation
                      </Label>
                    </div>
                  </RadioGroup>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-between items-center pt-6">
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(3)}
                      className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 text-base font-medium"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSkip(5)}
                      className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-base font-medium"
                    >
                      Skip
                    </Button>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setStep(5)}
                    disabled={!formData.stressResponse}
                    className="px-6 py-2 text-base font-medium bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white shadow-md rounded-lg transition-all duration-300"
                  >
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
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
                <motion.h2 variants={itemVariants} className="mb-4 text-2xl font-bold text-gray-800">
                  Personal Goal
                </motion.h2>
                <motion.p variants={itemVariants} className="mb-6 text-gray-600">
                  Let's focus your meditation on what matters most to you right now.
                </motion.p>
                
                <motion.div variants={itemVariants} className="space-y-4 mb-8">
                  <Label htmlFor="personalGoal" className="text-lg font-medium text-gray-800">
                    What do you hope meditation will help you with?
                  </Label>
                  <RadioGroup
                    value={formData.personalGoal}
                    onValueChange={(value) => handleInputChange("personalGoal", value)}
                    className="grid gap-4 pt-2"
                  >
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="reduceAnxiety" id="reduceAnxiety" />
                      <Label htmlFor="reduceAnxiety" className="flex-1 font-medium text-gray-700">
                        Reduce anxiety and worry
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="betterSleep" id="betterSleep" />
                      <Label htmlFor="betterSleep" className="flex-1 font-medium text-gray-700">
                        Improve sleep quality
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="emotionalHealing" id="emotionalHealing" />
                      <Label htmlFor="emotionalHealing" className="flex-1 font-medium text-gray-700">
                        Process difficult emotions or past experiences
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="selfAcceptance" id="selfAcceptance" />
                      <Label htmlFor="selfAcceptance" className="flex-1 font-medium text-gray-700">
                        Develop greater self-compassion and acceptance
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm hover:border-violet-200 transition-all">
                      <RadioGroupItem value="focus" id="focus" />
                      <Label htmlFor="focus" className="flex-1 font-medium text-gray-700">
                        Enhance focus and mental clarity
                      </Label>
                    </div>
                  </RadioGroup>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-between items-center pt-6">
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(4)}
                      className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 text-base font-medium"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSubmit}
                      className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-base font-medium"
                    >
                      Skip
                    </Button>
                  </div>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white shadow-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
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
                        Analyzing Your Profile
                      </h2>
                      <p className="text-gray-600">
                        Our AI is personalizing your meditation experience based on your unique profile...
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
                        Your personalized meditation is ready!
                      </motion.h2>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8 max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 border border-violet-200"
                      >
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Your Meditation Recommendation</h3>
                        <p className="text-gray-700 mb-4">
                          {recommendation ? (
                            <>
                              Based on your profile, we recommend a <strong>{recommendation.type}</strong> meditation 
                              focused on {recommendation.focus}.
                            </>
                          ) : (
                            <>
                              Based on your profile, we recommend a <strong>Grounding & Acceptance</strong> meditation 
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
                        <div className="flex items-center gap-2 text-violet-800 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>{recommendation?.duration || 10} minute session</span>
                          <span className="mx-2">•</span>
                          <Music className="h-4 w-4" />
                          <span>{recommendation?.hasMusic ? "With" : "Without"} gentle background music</span>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Button
                          onClick={() => {
                            // Redirect to sign-up page to save profile and get meditation
                            window.location.href = "/signup"
                          }}
                          className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white shadow-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                        >
                          Sign Up & Get My Personal Meditation
                          <ArrowRight className="ml-2 h-5 w-5" />
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