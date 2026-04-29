"use client"

import { motion, useReducedMotion } from "motion/react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { WelcomeBanner } from "@/components/dashboard/welcome-banner"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { CurrentCourse } from "@/components/dashboard/current-course"
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap"
import { UpNextWidget, DailyGoalWidget, XPProgressWidget } from "@/components/dashboard/sidebar-widgets"
import { RoadmapPreview } from "@/components/dashboard/roadmap-preview"
import { Leaderboard } from "@/components/dashboard/leaderboard"
import { Achievements } from "@/components/dashboard/achievements"

export default function DashboardPage() {
  const shouldReduce = useReducedMotion()

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <DashboardHeader />

      {/* Main Content */}
      <main className="ml-60 pt-16">
        <div className="p-6">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduce ? 0.01 : 0.3 }}
            className="mx-auto max-w-7xl space-y-6"
          >
            {/* Welcome Banner */}
            <WelcomeBanner />

            {/* Stats Cards */}
            <StatsCards />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left Column - 2/3 width */}
              <div className="space-y-6 lg:col-span-2">
                <CurrentCourse />
                <ActivityHeatmap />
              </div>

              {/* Right Column - 1/3 width */}
              <div className="space-y-6">
                <UpNextWidget />
                <DailyGoalWidget />
                <XPProgressWidget />
              </div>
            </div>

            {/* Roadmap Preview */}
            <RoadmapPreview />

            {/* Bottom Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Leaderboard />
              <Achievements />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
