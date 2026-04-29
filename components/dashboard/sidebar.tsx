"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import {
  LayoutDashboard,
  BookOpen,
  Map,
  Terminal,
  MessageSquare,
  Trophy,
  Settings,
  HelpCircle,
  Code2,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navSections = [
  {
    title: "LEARN",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "My Courses", href: "/dashboard/courses", icon: BookOpen },
      { name: "Roadmap", href: "/dashboard/roadmap", icon: Map },
      { name: "Playground", href: "/dashboard/playground", icon: Terminal },
    ],
  },
  {
    title: "COMMUNITY",
    items: [
      { name: "Discussions", href: "/dashboard/discussions", icon: MessageSquare },
      { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
      { name: "Help", href: "/dashboard/help", icon: HelpCircle },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
}

export function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard")
  const shouldReduce = useReducedMotion()

  return (
    <motion.aside
      initial={shouldReduce ? false : { x: -240, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: shouldReduce ? 0.01 : 0.4, ease: "easeOut" }}
      className="fixed left-0 top-0 z-40 h-screen w-60 border-r border-border bg-background"
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Code2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">CodeLearn</span>
        </div>

        {/* Navigation */}
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 space-y-6 overflow-y-auto px-3 py-6"
        >
          {navSections.map((section) => (
            <div key={section.title}>
              <motion.h3
                variants={itemVariants}
                className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {section.title}
              </motion.h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.name
                  return (
                    <motion.div key={item.name} variants={itemVariants} layout>
                      <Link
                        href={item.href}
                        onClick={() => setActiveItem(item.name)}
                        className={cn(
                          "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                          isActive
                            ? "border-l-2 border-primary bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4 transition-colors",
                            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </motion.nav>

        {/* User Card */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="border-t border-border p-4"
        >
          <div className="flex items-center gap-3 rounded-lg bg-card p-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-primary text-sm font-bold text-primary-foreground">
                A
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-warning text-[8px] font-bold text-background">
                8
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-foreground">Alex Chen</p>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                  Pro
                </span>
                <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  2,450 XP
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  )
}
