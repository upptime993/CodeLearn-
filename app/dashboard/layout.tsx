import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Dashboard | CodeLearn",
  description: "Track your learning progress, continue courses, and achieve your coding goals.",
}

export const viewport: Viewport = {
  themeColor: "#0F1117",
  width: "device-width",
  initialScale: 1,
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
