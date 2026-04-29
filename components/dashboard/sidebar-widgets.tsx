"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion, useInView } from "motion/react"
import { useRef } from "react"
import { Lock, ArrowRight, Star, Plus } from "lucide-react"

const upNextCourses = [
  { id: 1, name: "React Fundamentals", level: "Beginner", icon: "⚛️", locked: false },
  { id: 2, name: "TypeScript Basics", level: "Intermediate", icon: "📘", locked: false },
  { id: 3, name: "Node.js Backend", level: "Intermediate", icon: "🟢", locked: true },
]

const recentXP = [
  { id: 1, text: "Completed lesson", xp: 50, time: "2 hours ago" },
  { id: 2, text: "Streak bonus", xp: 25, time: "Yesterday" },
  { id: 3, text: "Quiz perfect score", xp: 100, time: "Yesterday" },
]

function DailyGoalCircle({ current, total }: { current: number; total: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const shouldReduce = useReducedMotion()
  const percentage = (current / total) * 100
  const size = 100
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div ref={ref} className="relative flex items-center justify-center" style={{ width: size, height: size }}>
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
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
          transition={{ duration: shouldReduce ? 0.01 : 1, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-lg font-bold text-foreground">
          {current}/{total}
        </span>
      </div>
    </div>
  )
}

function XPProgressBar({ current, target }: { current: number; target: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const shouldReduce = useReducedMotion()
  const percentage = (current / target) * 100

  return (
    <div ref={ref} className="h-2 w-full overflow-hidden rounded-full bg-border">
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={{ width: 0 }}
        animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
        transition={{ duration: shouldReduce ? 0.01 : 0.8, ease: "easeOut" }}
      />
    </div>
  )
}

export function UpNextWidget() {
  const shouldReduce = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: shouldReduce ? 0.01 : 0.5 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <h3 className="mb-4 text-sm font-semibold text-foreground">Up Next</h3>
      <div className="space-y-3">
        {upNextCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={shouldReduce ? false : { opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: shouldReduce ? 0 : index * 0.1, duration: shouldReduce ? 0.01 : 0.3 }}
            className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-border/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card text-xl">
              {course.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{course.name}</p>
              <span
                className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-medium ${
                  course.level === "Beginner"
                    ? "bg-success/15 text-success"
                    : "bg-warning/15 text-warning"
                }`}
              >
                {course.level}
              </span>
            </div>
            {course.locked ? (
              <Lock className="h-4 w-4 text-muted-foreground" />
            ) : (
              <motion.button
                whileHover={shouldReduce ? {} : { scale: 1.05 }}
                whileTap={shouldReduce ? {} : { scale: 0.95 }}
                className="rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export function DailyGoalWidget() {
  const shouldReduce = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: shouldReduce ? 0 : 0.1, duration: shouldReduce ? 0.01 : 0.5 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <h3 className="mb-4 text-sm font-semibold text-foreground">Daily Goal</h3>
      <div className="flex flex-col items-center">
        <DailyGoalCircle current={3} total={5} />
        <p className="mt-3 text-sm text-muted-foreground">lessons completed</p>
        <p className="mt-1 text-xs text-success">2 more to reach your goal!</p>
      </div>
    </motion.div>
  )
}

export function XPProgressWidget() {
  const shouldReduce = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: shouldReduce ? 0 : 0.2, duration: shouldReduce ? 0.01 : 0.5 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">XP Progress</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-warning text-warning" />
          Level 8
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Level 8</span>
          <span className="text-muted-foreground">Level 9</span>
        </div>
        <XPProgressBar current={2000} target={2450} />
        <p className="text-center text-xs text-muted-foreground">450 XP to next level</p>
      </div>

      <div className="mt-4 space-y-2 border-t border-border pt-4">
        <h4 className="text-xs font-medium text-muted-foreground">Recent XP</h4>
        {recentXP.map((item, index) => (
          <motion.div
            key={item.id}
            initial={shouldReduce ? false : { opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: shouldReduce ? 0 : 0.3 + index * 0.1, duration: shouldReduce ? 0.01 : 0.3 }}
            className="flex items-center justify-between text-xs"
          >
            <span className="text-muted-foreground">{item.text}</span>
            <span className="flex items-center gap-1 font-mono text-success">
              <Plus className="h-3 w-3" />
              {item.xp} XP
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
