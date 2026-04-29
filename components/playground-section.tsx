import { Check } from 'lucide-react'

const features = [
  'Write code in browser',
  'See live output instantly',
  '40+ language support',
  'Save and share snippets',
]

const codeExample = `import pandas as pd
import matplotlib.pyplot as plt

# Load the dataset
df = pd.read_csv('sales_data.csv')

# Calculate monthly revenue
monthly = df.groupby('month')['revenue'].sum()

# Visualize the results
plt.figure(figsize=(10, 6))
plt.bar(monthly.index, monthly.values)
plt.title('Monthly Revenue Analysis')
plt.show()`

export function PlaygroundSection() {
  return (
    <section id="playground" className="py-20 sm:py-28 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Feature List */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Interactive Code Playground
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-lg">
                Practice coding in a real development environment, right in your browser.
              </p>
            </div>

            <div className="space-y-4 border-l-2 border-primary pl-6">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Code Editor Mockup */}
          <div className="relative">
            <div className="rounded-xl bg-background border border-border overflow-hidden shadow-2xl shadow-black/20">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono">Python</span>
                  <span className="font-mono">analysis.py</span>
                </div>
                <div className="w-16" />
              </div>

              {/* Line Numbers + Code */}
              <div className="flex bg-code-bg">
                {/* Line Numbers */}
                <div className="py-4 px-3 text-right text-muted-foreground/50 font-mono text-sm select-none border-r border-border/50">
                  {codeExample.split('\n').map((_, i) => (
                    <div key={i} className="leading-6">
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Code Content */}
                <div className="p-4 overflow-x-auto flex-1">
                  <pre className="font-mono text-sm leading-6">
                    <code>
                      {codeExample.split('\n').map((line, i) => (
                        <div key={i}>
                          {line.startsWith('import') || line.startsWith('from') ? (
                            <>
                              <span className="code-keyword">{line.split(' ')[0]}</span>
                              <span className="code-variable">{' ' + line.split(' ').slice(1).join(' ')}</span>
                            </>
                          ) : line.startsWith('#') ? (
                            <span className="code-comment">{line}</span>
                          ) : line.includes('=') && !line.includes('==') ? (
                            <>
                              <span className="code-variable">{line.split('=')[0]}</span>
                              <span className="code-variable">=</span>
                              <span className="code-function">{line.split('=')[1]}</span>
                            </>
                          ) : line.includes('(') ? (
                            <>
                              <span className="code-function">{line.split('(')[0]}</span>
                              <span className="code-variable">{'(' + line.split('(').slice(1).join('(')}</span>
                            </>
                          ) : (
                            <span className="code-variable">{line}</span>
                          )}
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Decorative blur */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
