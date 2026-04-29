"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { BookOpen, Clock, Flame, Award, TrendingUp } from "lucide-react"

const stats = [
  {
    label: "Lessons Completed",
    value: 47,
    icon: BookOpen,
    color: "primary",
    trend: "+12%",
    trendLabel: "this week",
  },
  {
    label: "Hours Learned",
    value: 23.5,
    suffix: "h",
    icon: Clock,
    color: "warning",
    trend: "+8%",
    trendLabel: "this week",
  },
  {
    label: "Current Streak",
    value: 12,
    suffix: " Days",
    icon: Flame,
    color: "orange",
    trend: "+4",
    trendLabel: "from last week",
  },
  {
    label: "Certificates",
    value: 2,
    icon: Award,
    color: "success",
    trend: "+1",
    trendLabel: "this month",
  },
]

const colorClasses = {
  primary: {
    bg: "bg-primary/15",
    text: "text-primary",
  },
  warning: {
    bg: "bg-warning/15",
    text: "text-warning",
  },
  orange: {
    bg: "bg-orange-500/15",
    text: "text-orange-500",
  },
  success: {
    bg: "bg-success/15",
    text: "text-success",
  },
}

function AnimatedStatNumber({ value, suffix = "", duration = 1.5 }: { value: number; suffix?: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) {
      setDisplayValue(value)
      return
    }

    const startTime = Date.now()
    const isFloat = !Number.isInteger(value)

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = value * eased
      setDisplayValue(isFloat ? Math.round(current * 10) / 10 : Math.floor(current))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    const timer = setTimeout(() => {
      requestAnimationFrame(animate)
    }, 300)

    return () => clearTimeout(timer)
  }, [value, duration, shouldReduce])

  return (
    <>
      {displayValue}
      {suffix}
    </>
  )
}

export function StatsCards() {
  const shouldReduce = useReducedMotion()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const colors = colorClasses[stat.color as keyof typeof colorClasses]

        return (
          <motion.div
            key={stat.label}
            initial={shouldReduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: shouldReduce ? 0 : index * 0.1 + 0.3,
              duration: shouldReduce ? 0.01 : 0.4,
              ease: "easeOut",
            }}
            whileHover={shouldReduce ? {} : { y: -3, transition: { duration: 0.2 } }}
            className="group rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-lg hover:shadow-black/20"
          >
            <div className="flex items-start justify-between">
              <div className={`rounded-lg p-2 ${colors.bg}`}>
                <Icon className={`h-5 w-5 ${colors.text}`} />
              </div>
              <div className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="h-3 w-3" />
                <span>{stat.trend}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-mono text-3xl font-bold text-foreground">
                <AnimatedStatNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
