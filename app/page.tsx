'use client'
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

      {/* hero section */}
      <section className="container mx-auto px-4 py-32 flex flex-col items-center">
        <motion.div 
          className="max-w-4xl text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-gray-900 mb-8"
            variants={fadeInUp}
          >
            Learn anything.
            <motion.span 
              className="block mt-2 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600"
              variants={fadeInUp}
            >
              Your way.
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Upload your content. Let AI make it interactive.
            Learn at your own pace.
          </motion.p>
          <motion.div 
            className="flex gap-6 justify-center"
            variants={fadeInUp}
          >
            <Link href="/learn">
              <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:opacity-90 text-white px-12 py-8 text-xl rounded-2xl">
                Start Now
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="outline" className="px-12 py-8 text-xl rounded-2xl border-2">
                Leaderboard
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features grid */}
      <section className="container mx-auto px-8 md:px-12 lg:px-16 py-24 bg-white rounded-[2.5rem] my-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div 
            className="space-y-4"
            variants={scaleIn}
          >
            <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-2xl font-semibold">Drop Any Content</h3>
            <p className="text-gray-600 text-lg">
              Lecture slides, research papers, notes - we&apos;ll make them interactive.
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4"
            variants={scaleIn}
          >
            <div className="h-16 w-16 bg-violet-100 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-2xl font-semibold">Learn Your Way</h3>
            <p className="text-gray-600 text-lg">
              Content adapts to how you learn best.
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4"
            variants={scaleIn}
          >
            <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="text-2xl font-semibold">Make It Stick</h3>
            <p className="text-gray-600 text-lg">
              Quizzes, flashcards, and visual maps that work.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* User journey breakdown */}
      <section className="container mx-auto px-4 py-24">
        <motion.div 
          className="max-w-3xl mx-auto space-y-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div 
            className="flex gap-8 items-start"
            variants={fadeInUp}
          >
            <div className="h-12 w-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3">Drop Your Content</h3>
              <p className="text-gray-600 text-lg">
                Drag and drop any learning material. That&apos;s it.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex gap-8 items-start"
            variants={fadeInUp}
          >
            <div className="h-12 w-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3">AI Does Its Thing</h3>
              <p className="text-gray-600 text-lg">
                We turn it into bite-sized, interactive pieces.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex gap-8 items-start"
            variants={fadeInUp}
          >
            <div className="h-12 w-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3">Start Learning</h3>
              <p className="text-gray-600 text-lg">
                Jump in and learn. We&apos;ll adapt to your style.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-32">
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-[2.5rem] p-16 text-center"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8"
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
          >
            <Link href="/learn">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-8 text-xl rounded-2xl font-semibold">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}