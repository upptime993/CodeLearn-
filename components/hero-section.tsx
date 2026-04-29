'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Rocket, Play, Star, ArrowRight } from 'lucide-react'

const codeLines = [
  { content: 'function', type: 'keyword' },
  { content: ' greet', type: 'function' },
  { content: '(name) {', type: 'variable' },
  { content: '\n  ', type: 'variable' },
  { content: 'const', type: 'keyword' },
  { content: ' message = ', type: 'variable' },
  { content: '`Hello, ${name}!`', type: 'string' },
  { content: ';\n  ', type: 'variable' },
  { content: 'return', type: 'keyword' },
  { content: ' message;\n}', type: 'variable' },
  { content: '\n\n', type: 'variable' },
  { content: 'console', type: 'variable' },
  { content: '.', type: 'variable' },
  { content: 'log', type: 'function' },
  { content: '(', type: 'variable' },
  { content: 'greet', type: 'function' },
  { content: '(', type: 'variable' },
  { content: '"Developer"', type: 'string' },
  { content: '));', type: 'variable' },
]

const avatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
]

export function HeroSection() {
  const [typedCode, setTypedCode] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showOutput, setShowOutput] = useState(false)

  useEffect(() => {
    const fullCode = codeLines.map((l) => l.content).join('')
    let index = 0
    const interval = setInterval(() => {
      if (index < fullCode.length) {
        setTypedCode(fullCode.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(interval)
        setTimeout(() => setShowOutput(true), 500)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [])

  const renderCode = () => {
    let charIndex = 0
    return codeLines.map((line, lineIdx) => {
      const start = charIndex
      charIndex += line.content.length
      const visiblePart = typedCode.slice(start, charIndex)
      if (!visiblePart) return null
      return (
        <span key={lineIdx} className={`code-${line.type}`}>
          {visiblePart}
        </span>
      )
    })
  }

  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1D27_1px,transparent_1px),linear-gradient(to_bottom,#1A1D27_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content - 60% */}
          <div className="lg:col-span-3 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">200+ Coding Courses</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] tracking-tight text-balance">
                Learn to Code.{' '}
                <span className="text-primary">Build Real Projects.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Master web development, data structures, and algorithms through interactive 
                lessons and real-world challenges.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] transition-all h-12 px-6 text-base font-medium"
              >
                Start Learning Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border text-foreground hover:bg-card h-12 px-6 text-base font-medium"
              >
                View Roadmap
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {avatars.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-10 h-10 rounded-full border-2 border-background object-cover"
                    />
                  ))}
                </div>
                <span className="ml-3 text-sm text-muted-foreground">
                  Trusted by <span className="text-foreground font-medium">50,000+</span> developers
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
                <span className="ml-1 text-sm text-muted-foreground">4.9/5</span>
              </div>
            </div>
          </div>

          {/* Right Content - 40% */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Code Editor Card */}
              <div className="rounded-xl bg-card border border-border overflow-hidden shadow-2xl shadow-black/20">
                {/* Editor Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-warning/60" />
                    <div className="w-3 h-3 rounded-full bg-success/60" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">main.js</span>
                  <div className="w-16" />
                </div>

                {/* Code Content */}
                <div className="p-4 bg-code-bg min-h-[200px]">
                  <pre className="font-mono text-sm leading-relaxed">
                    <code>{renderCode()}</code>
                    {isTyping && (
                      <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />
                    )}
                  </pre>
                </div>

                {/* Run Button */}
                <div className="px-4 py-3 border-t border-border bg-card flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">JavaScript</span>
                  <Button 
                    size="sm" 
                    className="bg-success/90 text-white hover:bg-success h-8 text-xs font-medium"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Run Code
                  </Button>
                </div>

                {/* Terminal Output */}
                <div className="border-t border-border bg-code-bg px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted-foreground font-mono">Output</span>
                  </div>
                  <div className={`font-mono text-sm text-success transition-opacity duration-300 ${showOutput ? 'opacity-100' : 'opacity-0'}`}>
                    {">"} Hello, Developer!
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-xl bg-primary/5 border border-primary/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
