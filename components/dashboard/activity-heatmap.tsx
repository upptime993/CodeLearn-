"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"

// Generate sample activity data
const generateActivityData = () => {
  const data: { date: string; lessons: number; level: number }[] = []
  const today = new Date()
  
  for (let week = 0; week < 16; week++) {
    for (let day = 0; day < 7; day++) {
      const date = new Date(today)
      date.setDate(date.getDate() - (16 - week) * 7 - (6 - day))
      
      const lessons = Math.random() > 0.3 ? Math.floor(Math.random() * 6) : 0
      let level = 0
      if (lessons > 0) level = 1
      if (lessons >= 2) level = 2
      if (lessons >= 4) level = 3
      if (lessons >= 5) level = 4
      
      data.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        lessons,
        level,
      })
    }
  }
  return data
}

const activityData = generateActivityData()

const levelColors = {
  0: "bg-[#1A1D27]",
  1: "bg-[#1A4A45]",
  2: "bg-primary/40",
  3: "bg-primary/70",
  4: "bg-primary",
}

export function ActivityHeatmap() {
  const [hoveredCell, setHoveredCell] = useState<{ index: number; x: number; y: number } | null>(null)
  const shouldReduce = useReducedMotion()

  const weeks: typeof activityData[] = []
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7))
  }

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: shouldReduce ? 0 : 0.5, duration: shouldReduce ? 0.01 : 0.5 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <h3 className="mb-4 text-sm font-semibold text-foreground">Your Learning Activity</h3>

      <div className="overflow-x-auto">
        <div className="flex gap-1 pb-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => {
                const globalIndex = weekIndex * 7 + dayIndex
                const colorClass = levelColors[day.level as keyof typeof levelColors]

                return (
                  <motion.div
                    key={dayIndex}
                    initial={shouldReduce ? false : { opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: shouldReduce ? 0 : (weekIndex * 7 + dayIndex) * 0.005,
                      duration: shouldReduce ? 0.01 : 0.2,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    whileHover={shouldReduce ? {} : { scale: 1.3 }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      setHoveredCell({
                        index: globalIndex,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      })
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`h-3 w-3 rounded-sm ${colorClass} cursor-pointer transition-colors`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-3 w-3 rounded-sm ${levelColors[level as keyof typeof levelColors]}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
        <span className="text-xs text-muted-foreground">16 weeks of activity</span>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredCell && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 -translate-x-1/2 -translate-y-full rounded-md bg-foreground px-2 py-1 text-xs text-background"
            style={{
              left: hoveredCell.x,
              top: hoveredCell.y - 8,
            }}
          >
            {activityData[hoveredCell.index].lessons} lessons on {activityData[hoveredCell.index].date}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
