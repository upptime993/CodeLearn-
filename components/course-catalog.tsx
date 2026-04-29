'use client'

import { Button } from '@/components/ui/button'
import { Clock, BookOpen, ArrowRight } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: 'JavaScript Fundamentals',
    icon: 'JS',
    iconBg: 'bg-yellow-500/20',
    iconColor: 'text-yellow-500',
    difficulty: 'Beginner',
    difficultyColor: 'bg-success/20 text-success',
    lessons: 45,
    hours: 12,
    progress: 0,
    description: 'Master the basics of JavaScript programming',
  },
  {
    id: 2,
    title: 'React & Next.js',
    icon: '⚛️',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    difficulty: 'Intermediate',
    difficultyColor: 'bg-warning/20 text-warning',
    lessons: 60,
    hours: 18,
    progress: 35,
    description: 'Build modern web apps with React',
  },
  {
    id: 3,
    title: 'Python for Data Science',
    icon: '🐍',
    iconBg: 'bg-green-500/20',
    iconColor: 'text-green-400',
    difficulty: 'Beginner',
    difficultyColor: 'bg-success/20 text-success',
    lessons: 55,
    hours: 15,
    progress: 0,
    description: 'Analyze data and build ML models',
  },
  {
    id: 4,
    title: 'TypeScript Mastery',
    icon: 'TS',
    iconBg: 'bg-blue-600/20',
    iconColor: 'text-blue-500',
    difficulty: 'Intermediate',
    difficultyColor: 'bg-warning/20 text-warning',
    lessons: 40,
    hours: 10,
    progress: 78,
    description: 'Add type safety to your JavaScript',
  },
  {
    id: 5,
    title: 'System Design',
    icon: '🏗️',
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
    difficulty: 'Advanced',
    difficultyColor: 'bg-destructive/20 text-destructive',
    lessons: 35,
    hours: 20,
    progress: 0,
    description: 'Design scalable distributed systems',
  },
  {
    id: 6,
    title: 'DSA Interview Prep',
    icon: '🧮',
    iconBg: 'bg-primary/20',
    iconColor: 'text-primary',
    difficulty: 'Advanced',
    difficultyColor: 'bg-destructive/20 text-destructive',
    lessons: 80,
    hours: 25,
    progress: 12,
    description: 'Crack coding interviews at FAANG',
  },
]

export function CourseCatalog() {
  return (
    <section id="courses" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Start Your Learning Path
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Pick a track and go from zero to job-ready
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group relative bg-card border border-border rounded-xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 transition-all duration-200"
            >
              {/* Course Icon */}
              <div className={`w-12 h-12 rounded-lg ${course.iconBg} flex items-center justify-center mb-4`}>
                {course.icon.length <= 2 ? (
                  <span className={`font-bold text-sm ${course.iconColor}`}>{course.icon}</span>
                ) : (
                  <span className="text-xl">{course.icon}</span>
                )}
              </div>

              {/* Course Info */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>

              {/* Difficulty Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${course.difficultyColor}`}>
                  {course.difficulty}
                </span>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {course.lessons} lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {course.hours}h
                </span>
              </div>

              {/* Progress Bar (if enrolled) */}
              {course.progress > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-primary font-medium">{course.progress}%</span>
                  </div>
                  <div className="h-1 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full border-border text-foreground hover:bg-card hover:border-primary/50 group/btn"
              >
                {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-card">
            View All Courses
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
