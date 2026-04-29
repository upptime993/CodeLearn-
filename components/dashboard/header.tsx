"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Search, Flame, Star, Bell, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

function AnimatedNumber({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) {
      setDisplayValue(value)
      return
    }

    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(startValue + (value - startValue) * eased))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration, shouldReduce])

  return <>{displayValue.toLocaleString()}</>
}

export function DashboardHeader() {
  const shouldReduce = useReducedMotion()

  return (
    <motion.header
      initial={shouldReduce ? false : { y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: shouldReduce ? 0.01 : 0.35 }}
      className="fixed left-60 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-6"
    >
      {/* Page Title */}
      <h1 className="text-xl font-bold text-foreground">Dashboard</h1>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search courses, topics..."
          className="h-10 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Streak Counter */}
        <motion.div
          animate={shouldReduce ? {} : { scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-1.5 rounded-full bg-warning/15 px-3 py-1.5"
        >
          <Flame className="h-4 w-4 text-warning" />
          <span className="text-sm font-semibold text-warning">12 day streak</span>
        </motion.div>

        {/* XP Badge */}
        <div className="flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1.5">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="font-mono text-sm font-semibold text-primary">
            <AnimatedNumber value={2450} /> XP
          </span>
        </div>

        {/* Notification Bell */}
        <motion.button
          whileTap={shouldReduce ? {} : { rotate: [0, -15, 15, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
          className="relative rounded-lg p-2 text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive"></span>
          </span>
        </motion.button>

        {/* Avatar Dropdown */}
        <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-card transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-primary text-sm font-bold text-primary-foreground">
            A
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </motion.header>
  )
}
