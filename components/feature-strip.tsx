import { BookOpen, Layers, Sparkles, Award } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Interactive Lessons',
    description: 'Learn by doing with hands-on exercises',
  },
  {
    icon: Layers,
    title: 'Real Projects',
    description: 'Build portfolio-worthy applications',
  },
  {
    icon: Sparkles,
    title: 'AI Code Review',
    description: 'Get instant feedback on your code',
  },
  {
    icon: Award,
    title: 'Certificate of Completion',
    description: 'Earn recognized credentials',
  },
]

export function FeatureStrip() {
  return (
    <section className="border-y border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
