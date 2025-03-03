import MeditationCreator from "@/components/meditation-creator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="container relative max-w-5xl px-4 py-10 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Create Your Personalized Meditation
        </h1>
        <MeditationCreator />
      </div>
    </main>
  )
}

