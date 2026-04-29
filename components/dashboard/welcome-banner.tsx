"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, Map } from "lucide-react"

function CircularProgress({ percentage, size = 120, strokeWidth = 8 }: { percentage: number; size?: number; strokeWidth?: number }) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const shouldReduce = useReducedMotion()
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (animatedPercentage / 100) * circumference

  useEffect(() => {
    if (shouldReduce) {
      setAnimatedPercentage(percentage)
      return
    }

    const timer = setTimeout(() => {
      const duration = 1200
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setAnimatedPercentage(Math.floor(percentage * eased))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, 500)

    return () => clearTimeout(timer)
  }, [percentage, shouldReduce])

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2A2D3A"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2DD4BF"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: shouldReduce ? 0.01 : 1.2, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-2xl font-bold text-foreground">{animatedPercentage}%</span>
        <span className="text-xs text-muted-foreground">Complete</span>
      </div>
    </div>
  )
}

function AnimatedProgressBar({ percentage, delay = 0.6 }: { percentage: number; delay?: number }) {
  const [width, setWidth] = useState(0)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) {
      setWidth(percentage)
      return
    }

    const timer = setTimeout(() => {
      setWidth(percentage)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [percentage, delay, shouldReduce])

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-border">
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: shouldReduce ? 0.01 : 0.8, ease: "easeOut" }}
      />
    </div>
  )
}

export function WelcomeBanner() {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: shouldReduce ? 0 : 0.2, duration: shouldReduce ? 0.01 : 0.5 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex items-center justify-between gap-8">
        {/* Left Content */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Welcome back, Alex</h2>
            <p className="mt-1 text-muted-foreground">
              Pick up where you left off. You&apos;re on a 12-day streak!
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Daily goal progress</span>
              <span className="font-medium text-foreground">3/5 lessons today</span>
            </div>
            <AnimatedProgressBar percentage={60} />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <motion.button
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Continue Learning
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-card"
            >
              <Map className="h-4 w-4" />
              View Roadmap
            </motion.button>
          </div>
        </div>

        {/* Right Content - Circular Progress */}
        <div className="hidden flex-col items-center gap-2 md:flex">
          <CircularProgress percentage={68} size={140} strokeWidth={10} />
          <span className="text-sm font-medium text-foreground">JavaScript Fundamentals</span>
        </div>
      </div>
    </motion.div>
  )
}
