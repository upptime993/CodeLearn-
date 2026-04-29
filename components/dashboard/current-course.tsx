"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, Check, Circle, Lock, Clock } from "lucide-react"

const lessons = [
  { id: 1, name: "Introduction to Objects", duration: "8 min", status: "completed" },
  { id: 2, name: "Object Properties & Methods", duration: "12 min", status: "completed" },
  { id: 3, name: "Array Basics", duration: "10 min", status: "completed" },
  { id: 4, name: "Destructuring Assignment", duration: "15 min", status: "current" },
  { id: 5, name: "Spread & Rest Operators", duration: "12 min", status: "locked" },
  { id: 6, name: "Array Methods Deep Dive", duration: "20 min", status: "locked" },
]

const statusConfig = {
  completed: {
    icon: Check,
    bgClass: "bg-primary/15",
    iconClass: "text-primary",
    textClass: "text-foreground",
  },
  current: {
    icon: Circle,
    bgClass: "bg-warning/15",
    iconClass: "text-warning fill-warning",
    textClass: "text-foreground",
  },
  locked: {
    icon: Lock,
    bgClass: "bg-muted",
    iconClass: "text-muted-foreground",
    textClass: "text-muted-foreground",
  },
}

function AnimatedProgressBar({ percentage, delay = 0.4 }: { percentage: number; delay?: number }) {
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
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: shouldReduce ? 0.01 : 0.8, ease: "easeOut" }}
      />
    </div>
  )
}

export function CurrentCourse() {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: shouldReduce ? 0 : 0.4, duration: shouldReduce ? 0.01 : 0.5 }}
      className="rounded-xl border border-border bg-card"
    >
      {/* Header */}
      <div className="border-b border-border p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Continue Learning
        </h3>
      </div>

      {/* Course Info */}
      <div className="p-5">
        {/* Course Banner */}
        <div className="mb-4 h-32 rounded-lg bg-gradient-to-br from-[#1a1d27] via-[#1e2535] to-[#141821] flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/20">
              <span className="text-2xl">📘</span>
            </div>
            <span className="text-lg font-semibold text-foreground">JavaScript</span>
          </div>
        </div>

        <h4 className="text-lg font-bold text-foreground">JavaScript: Arrays & Objects</h4>
        <p className="mt-1 text-sm text-muted-foreground">
          Lesson 14 of 32 — Destructuring Assignment
        </p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">43%</span>
          </div>
          <AnimatedProgressBar percentage={43} />
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          Last accessed 2 hours ago
        </div>

        <motion.button
          whileHover={shouldReduce ? {} : { scale: 1.02 }}
          whileTap={shouldReduce ? {} : { scale: 0.97 }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Resume Lesson
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>

      {/* Chapter List */}
      <div className="border-t border-border p-5">
        <h5 className="mb-3 text-sm font-semibold text-foreground">Up Next</h5>
        <div className="space-y-2">
          {lessons.map((lesson, index) => {
            const config = statusConfig[lesson.status as keyof typeof statusConfig]
            const Icon = config.icon

            return (
              <motion.div
                key={lesson.id}
                initial={shouldReduce ? false : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: shouldReduce ? 0 : 0.6 + index * 0.05,
                  duration: shouldReduce ? 0.01 : 0.3,
                }}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-border/50"
              >
                <div className={`flex h-6 w-6 items-center justify-center rounded-full ${config.bgClass}`}>
                  <Icon className={`h-3.5 w-3.5 ${config.iconClass}`} />
                </div>
                <span className={`flex-1 text-sm ${config.textClass}`}>{lesson.name}</span>
                <span className="text-xs text-muted-foreground">{lesson.duration}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
