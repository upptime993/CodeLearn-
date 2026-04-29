import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'CodeLearn | Learn to Code. Build Real Projects.',
  description: 'Master web development, data structures, and algorithms through interactive lessons and real-world challenges. Join 50,000+ developers learning to code.',
  keywords: ['coding', 'programming', 'web development', 'learn to code', 'javascript', 'python', 'react', 'online courses'],
  authors: [{ name: 'CodeLearn' }],
  openGraph: {
    title: 'CodeLearn | Learn to Code. Build Real Projects.',
    description: 'Master web development, data structures, and algorithms through interactive lessons and real-world challenges.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeLearn | Learn to Code. Build Real Projects.',
    description: 'Master web development, data structures, and algorithms through interactive lessons and real-world challenges.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0F1117',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
