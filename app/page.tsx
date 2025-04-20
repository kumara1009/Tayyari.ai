'use client'
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/custom/navbar"

const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1]
  }
}

const staggerContainer = {
  animate: { 
    transition: { 
      staggerChildren: 0.3,
      delayChildren: 0.2,
      ease: [0.22, 1, 0.36, 1]
    } 
  }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function Home() {
  
  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Navbar */}
      <Navbar loggedIn={false} />

      {/* hero section with gradient bg + glassy text box */}
      <section className="relative w-full py-32 px-6 flex justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden">

      {/* Abstract Blobs */}
      <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0"></div>
      <div className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-ping z-0"></div>

      {/* Glass Card with shimmer border */}
      <motion.div
        className="relative z-10 max-w-4xl w-full text-center px-8 py-14 rounded-3xl shadow-2xl bg-white/20 backdrop-blur-xl border border-white/10 overflow-hidden"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Shimmer border using pseudo div */}
        <div className="absolute inset-0 rounded-3xl border-[3px] border-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-40 animate-borderShine pointer-events-none z-[-1]"></div>

        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight"
          variants={fadeInUp}
        >
          Learn anything.
          <motion.span
            className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 mt-2"
            variants={fadeInUp}
          >
            Your way.
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-800 mb-10 max-w-2xl mx-auto font-medium"
          variants={fadeInUp}
        >
          Upload your content. Let AI make it interactive. Learn at your own pace — smarter, not harder.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center"
          variants={fadeInUp}
        >
          <Link href="/learn">
            <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:scale-105 transition-all text-white px-10 py-5 text-lg md:text-xl rounded-xl shadow-lg">
              🚀 Start Now
            </Button>
          </Link>
          <Link href="/leaderboard">
            <Button variant="outline" className="border-2 px-10 py-5 text-lg md:text-xl rounded-xl hover:bg-gray-100 transition-all">
              🏆 Leaderboard
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      </section>


     {/* Features grid */}
      <section className="container mx-auto px-8 md:px-12 lg:px-16 py-24 my-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Card 1 */}
          <motion.div
            className="space-y-4 p-8 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-400 to-white-400 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-500"
            variants={scaleIn}
          >
            <div className="h-16 w-16 bg-gradient-to-br from-pink-400 via-lime-200 to-white rounded-2xl flex items-center justify-center text-3xl shadow-inner">
              📚
            </div>
            <h3 className="text-2xl font-semibold">Drop Any Content</h3>
            <p className="text-white/90 text-lg">
              Lecture slides, research papers, notes — we&apos;ll make them interactive.
            </p>
          </motion.div>


          {/* Card 2 */}
          <motion.div
            className="space-y-4 p-8 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-400 to-white-400 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-500"
            variants={scaleIn}
          >
            <div className="h-16 w-16 bg-gradient-to-br from-violet-500 via-pink-300 to-white rounded-2xl flex items-center justify-center text-3xl shadow-inner">
              🎯
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">Learn Your Way</h3>
            <p className="text-gray-700 text-lg">
              Content adapts to how you learn best.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="space-y-4 p-8 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-400 to-white-400 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-500"
            variants={scaleIn}
          >
            <div className="h-16 w-16 bg-gradient-to-br from-green-400 via-lime-200 to-white rounded-2xl flex items-center justify-center text-3xl shadow-inner">
              ✨
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">Make It Stick</h3>
            <p className="text-gray-700 text-lg">
              Quizzes, flashcards, and visual maps that work.
            </p>
          </motion.div>
        </motion.div>
      </section>


      {/* User journey breakdown */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          className="max-w-3xl mx-auto space-y-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Step 1 */}
          <motion.div className="flex gap-8 items-start" variants={fadeInUp}>
            <div className="h-12 w-12 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg">
              1
            </div>
            <div>
              <h3 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 mb-3">
                Drop Your Content
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed italic">
                Drag and drop any learning material into the platform — that’s all it takes to get started.
              </p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div className="flex gap-8 items-start" variants={fadeInUp}>
            <div className="h-12 w-12 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg">
              2
            </div>
            <div>
              <h3 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-red-400 to-yellow-400 mb-3">
                AI Does Its Thing
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed italic">
                Our system slices it up into interactive nuggets — personalized just for how your brain works.
              </p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div className="flex gap-8 items-start" variants={fadeInUp}>
            <div className="h-12 w-12 bg-gradient-to-br from-green-400 via-lime-400 to-emerald-500 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg">
              3
            </div>
            <div>
              <h3 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-400 to-lime-300 mb-3">
                Start Learning
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed italic">
                Dive in at your pace. Your journey — your rhythm — your mastery.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>



      {/* CTA */}
<section className="container mx-auto px-4 py-32">
  <motion.div
    className="relative p-16 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-4 border-transparent bg-clip-padding shadow-[0_20px_60px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.4)] transition-all duration-700 group"
    style={{
      borderImage: "linear-gradient(to right, #60a5fa, #c084fc, #ec4899) 1",
      WebkitBackdropFilter: "blur(20px)"
    }}
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }}
  >
    {/* Optional rotating gradient behind */}
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 rounded-[2.5rem] blur-xl animate-spin-slow z-0 pointer-events-none"></div>

    <div className="relative z-10 text-center">
      <motion.h2
        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-purple-500 drop-shadow-md"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.2,
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        Ready to learn differently?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.4,
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="mt-10"
      >
        <Link href="/learn">
          <Button className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-6 text-xl rounded-2xl font-semibold transition-all duration-300 shadow-md">
            Get Started
          </Button>
        </Link>
      </motion.div>
    </div>
  </motion.div>
</section>



    </main>
  )
}