import { Check, Lock, Circle } from 'lucide-react'

const roadmapSteps = [
  {
    id: 1,
    title: 'HTML & CSS Basics',
    duration: '2 weeks',
    status: 'completed',
  },
  {
    id: 2,
    title: 'JavaScript Fundamentals',
    duration: '4 weeks',
    status: 'completed',
  },
  {
    id: 3,
    title: 'React & State Management',
    duration: '6 weeks',
    status: 'current',
  },
  {
    id: 4,
    title: 'Backend with Node.js',
    duration: '4 weeks',
    status: 'locked',
  },
  {
    id: 5,
    title: 'Databases & APIs',
    duration: '3 weeks',
    status: 'locked',
  },
  {
    id: 6,
    title: 'Full-Stack Projects',
    duration: '5 weeks',
    status: 'locked',
  },
]

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Your Personalized Roadmap
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow a structured learning path designed to take you from beginner to job-ready developer
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border sm:-translate-x-0.5" />

          {/* Steps */}
          <div className="space-y-8 sm:space-y-12">
            {roadmapSteps.map((step, index) => (
              <div
                key={step.id}
                className={`relative flex items-start gap-6 sm:gap-0 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      step.status === 'completed'
                        ? 'bg-primary border-primary'
                        : step.status === 'current'
                        ? 'bg-warning/20 border-warning'
                        : 'bg-card border-border'
                    }`}
                  >
                    {step.status === 'completed' ? (
                      <Check className="w-5 h-5 text-primary-foreground" />
                    ) : step.status === 'current' ? (
                      <Circle className="w-5 h-5 text-warning fill-warning" />
                    ) : (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`ml-20 sm:ml-0 sm:w-[calc(50%-40px)] ${
                    index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8 sm:text-left'
                  }`}
                >
                  <div
                    className={`p-5 rounded-xl border transition-all duration-200 ${
                      step.status === 'completed'
                        ? 'bg-primary/5 border-primary/20'
                        : step.status === 'current'
                        ? 'bg-warning/5 border-warning/30 shadow-lg shadow-warning/5'
                        : 'bg-card border-border opacity-60'
                    }`}
                  >
                    <div className={`flex items-center gap-3 mb-2 ${
                      index % 2 === 0 ? 'sm:flex-row-reverse' : ''
                    }`}>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          step.status === 'completed'
                            ? 'bg-primary/20 text-primary'
                            : step.status === 'current'
                            ? 'bg-warning/20 text-warning'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {step.status === 'completed'
                          ? 'Completed'
                          : step.status === 'current'
                          ? 'In Progress'
                          : 'Upcoming'}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Est. {step.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
