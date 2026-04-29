"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { Check, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"

const roadmapNodes = [
  { id: 1, name: "HTML & CSS Basics", hours: 8, status: "completed" },
  { id: 2, name: "JavaScript Fundamentals", hours: 20, status: "completed" },
  { id: 3, name: "DOM Manipulation", hours: 12, status: "completed" },
  { id: 4, name: "ES6+ Features", hours: 10, status: "current" },
  { id: 5, name: "Async JavaScript", hours: 15, status: "locked" },
  { id: 6, name: "React Basics", hours: 25, status: "locked" },
  { id: 7, name: "React Hooks", hours: 15, status: "locked" },
  { id: 8, name: "State Management", hours: 12, status: "locked" },
]

const statusConfig = {
  completed: {
    nodeClass: "bg-primary border-primary",
    iconClass: "text-primary-foreground",
    lineClass: "bg-primary",
    textClass: "text-foreground",
    badgeClass: "bg-primary/15 text-primary",
    Icon: Check,
  },
  current: {
    nodeClass: "bg-warning border-warning",
    iconClass: "text-background",
    lineClass: "bg-border",
    textClass: "text-foreground",
    badgeClass: "bg-warning/15 text-warning",
    Icon: null,
  },
  locked: {
    nodeClass: "bg-card border-border",
    iconClass: "text-muted-foreground",
    lineClass: "bg-border",
    textClass: "text-muted-foreground",
    badgeClass: "bg-muted text-muted-foreground",
    Icon: Lock,
  },
}

export function RoadmapPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: shouldReduce ? 0.01 : 0.5 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Your Roadmap</h3>
        <Link
          href="/dashboard/roadmap"
          className="flex items-center gap-1 text-sm text-primary hover:underline"
        >
          View Full Roadmap
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="overflow-x-auto pb-4 scrollbar-thin">
        <div className="flex items-start gap-4 min-w-max">
          {roadmapNodes.map((node, index) => {
            const config = statusConfig[node.status as keyof typeof statusConfig]
            const Icon = config.Icon
            const isLast = index === roadmapNodes.length - 1

            return (
              <div key={node.id} className="flex items-start">
                <motion.div
                  initial={shouldReduce ? false : { scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{
                    delay: shouldReduce ? 0 : index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="flex flex-col items-center"
                >
                  {/* Node */}
                  <div className="relative">
                    <motion.div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${config.nodeClass}`}
                      animate={
                        node.status === "current" && !shouldReduce
                          ? { scale: [1, 1.1, 1] }
                          : {}
                      }
                      transition={
                        node.status === "current"
                          ? { repeat: Infinity, duration: 2, ease: "easeInOut" }
                          : {}
                      }
                    >
                      {Icon ? (
                        <Icon className={`h-4 w-4 ${config.iconClass}`} />
                      ) : (
                        <span className="font-mono text-sm font-bold text-background">{index + 1}</span>
                      )}
                    </motion.div>

                    {/* Pulse ring for current */}
                    {node.status === "current" && !shouldReduce && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-warning"
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="mt-3 w-28 text-center">
                    <p className={`text-sm font-medium leading-tight ${config.textClass}`}>
                      {node.name}
                    </p>
                    <span className={`mt-1.5 inline-block rounded px-2 py-0.5 text-[10px] font-medium ${config.badgeClass}`}>
                      {node.hours}h
                    </span>
                  </div>
                </motion.div>

                {/* Connecting Line */}
                {!isLast && (
                  <motion.div
                    className="mt-5 h-0.5 w-8 origin-left"
                    initial={shouldReduce ? false : { scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{
                      delay: shouldReduce ? 0 : index * 0.1 + 0.05,
                      duration: shouldReduce ? 0.01 : 0.3,
                    }}
                    style={{
                      backgroundColor:
                        node.status === "completed" ? "#2DD4BF" : "#2A2D3A",
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
