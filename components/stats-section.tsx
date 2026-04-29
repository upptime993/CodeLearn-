const stats = [
  { value: '50K+', label: 'Students' },
  { value: '200+', label: 'Courses' },
  { value: '4.9★', label: 'Rating' },
  { value: '95%', label: 'Job Placement' },
]

export function StatsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                {stat.value}
              </p>
              <p className="mt-2 text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
