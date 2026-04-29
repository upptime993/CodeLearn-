"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { Lock, Award } from "lucide-react"

const achievements = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
    earned: true,
  },
  {
    id: 2,
    name: "Week Warrior",
    description: "7-day learning streak",
    icon: "🔥",
    earned: true,
  },
  {
    id: 3,
    name: "Code Master",
    description: "Complete 50 lessons",
    icon: "💻",
    earned: true,
  },
  {
    id: 4,
    name: "Night Owl",
    description: "Study after midnight",
    icon: "🦉",
    earned: true,
  },
  {
    id: 5,
    name: "Perfectionist",
    description: "Score 100% on 10 quizzes",
    icon: "⭐",
    earned: false,
    progress: "7/10 quizzes",
  },
  {
    id: 6,
    name: "Marathon Runner",
    description: "30-day learning streak",
    icon: "🏃",
    earned: false,
    progress: "12/30 days",
  },
  {
    id: 7,
    name: "Polyglot",
    description: "Complete courses in 5 languages",
    icon: "🌍",
    earned: false,
    progress: "2/5 languages",
  },
  {
    id: 8,
    name: "Mentor",
    description: "Help 10 community members",
    icon: "🤝",
    earned: false,
    progress: "3/10 helped",
  },
]

export function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: shouldReduce ? 0.01 : 0.5 }}
      className="rounded-xl border border-border bg-card"
    >
      <div className="flex items-center justify-between border-b border-border p-5">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {achievements.filter((a) => a.earned).length}/{achievements.length} earned
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={shouldReduce ? false : { opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{
              delay: shouldReduce ? 0 : index * 0.05,
              duration: shouldReduce ? 0.01 : 0.3,
            }}
            whileHover={
              achievement.earned && !shouldReduce
                ? { scale: 1.08, rotate: [0, -3, 3, 0] }
                : {}
            }
            className={`relative flex flex-col items-center rounded-xl border p-4 text-center transition-all ${
              achievement.earned
                ? "border-primary/30 bg-primary/5 cursor-pointer"
                : "border-border bg-card opacity-50 grayscale"
            }`}
          >
            {/* Glow ring for earned */}
            {achievement.earned && (
              <div className="absolute inset-0 rounded-xl bg-primary/5 blur-sm" />
            )}

            {/* Icon */}
            <div className="relative z-10 mb-2 text-3xl">{achievement.icon}</div>

            {/* Name */}
            <p className={`relative z-10 text-sm font-semibold ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}>
              {achievement.name}
            </p>

            {/* Description / Progress */}
            <p className="relative z-10 mt-1 text-xs text-muted-foreground">
              {achievement.earned ? achievement.description : achievement.progress}
            </p>

            {/* Lock overlay for unearned */}
            {!achievement.earned && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/50">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
