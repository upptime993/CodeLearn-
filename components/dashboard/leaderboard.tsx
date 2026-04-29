"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { ArrowUp, ArrowDown, Minus, Trophy } from "lucide-react"

const leaderboardData = [
  {
    rank: 1,
    name: "Sarah Kim",
    course: "React Advanced",
    xp: 4820,
    change: "up",
    avatar: "S",
    avatarColor: "from-amber-400 to-amber-500",
  },
  {
    rank: 2,
    name: "Marcus Chen",
    course: "TypeScript Mastery",
    xp: 4650,
    change: "up",
    avatar: "M",
    avatarColor: "from-slate-400 to-slate-500",
  },
  {
    rank: 3,
    name: "Elena Rodriguez",
    course: "Node.js Backend",
    xp: 4480,
    change: "down",
    avatar: "E",
    avatarColor: "from-orange-400 to-orange-500",
  },
  {
    rank: 4,
    name: "Alex Chen",
    course: "JavaScript Arrays",
    xp: 2450,
    change: "same",
    avatar: "A",
    avatarColor: "from-primary to-primary/80",
    isCurrentUser: true,
  },
  {
    rank: 5,
    name: "Jordan Park",
    course: "Python Basics",
    xp: 2280,
    change: "up",
    avatar: "J",
    avatarColor: "from-violet-400 to-violet-500",
  },
]

const rankBadges = {
  1: { bg: "bg-amber-500/20", text: "text-amber-400", icon: "🥇" },
  2: { bg: "bg-slate-400/20", text: "text-slate-400", icon: "🥈" },
  3: { bg: "bg-orange-500/20", text: "text-orange-400", icon: "🥉" },
}

const changeConfig = {
  up: { Icon: ArrowUp, color: "text-success" },
  down: { Icon: ArrowDown, color: "text-destructive" },
  same: { Icon: Minus, color: "text-muted-foreground" },
}

export function Leaderboard() {
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
          <Trophy className="h-5 w-5 text-warning" />
          <h3 className="text-lg font-semibold text-foreground">This Week&apos;s Top Learners</h3>
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-3">
          {leaderboardData.map((user, index) => {
            const rankStyle = rankBadges[user.rank as keyof typeof rankBadges]
            const changeStyle = changeConfig[user.change as keyof typeof changeConfig]
            const ChangeIcon = changeStyle.Icon

            return (
              <motion.div
                key={user.rank}
                initial={shouldReduce ? false : { opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{
                  delay: shouldReduce ? 0 : index * 0.1,
                  duration: shouldReduce ? 0.01 : 0.3,
                }}
                className={`flex items-center gap-4 rounded-lg p-3 transition-colors ${
                  user.isCurrentUser
                    ? "border-l-2 border-primary bg-primary/5"
                    : "hover:bg-border/30"
                }`}
              >
                {/* Rank Badge */}
                <motion.div
                  initial={shouldReduce ? false : { scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    delay: shouldReduce ? 0 : index * 0.1 + 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
                    rankStyle
                      ? `${rankStyle.bg} ${rankStyle.text}`
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {rankStyle ? rankStyle.icon : user.rank}
                </motion.div>

                {/* Avatar */}
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${user.avatarColor} text-sm font-bold text-white`}
                >
                  {user.avatar}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {user.name}
                    {user.isCurrentUser && (
                      <span className="ml-2 text-xs text-primary">(You)</span>
                    )}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{user.course}</p>
                </div>

                {/* XP */}
                <div className="text-right">
                  <p className="font-mono text-sm font-semibold text-foreground">
                    {user.xp.toLocaleString()} XP
                  </p>
                </div>

                {/* Change Indicator */}
                <div className={`flex items-center ${changeStyle.color}`}>
                  <ChangeIcon className="h-4 w-4" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
