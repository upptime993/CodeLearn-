'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Free',
    description: 'Perfect for getting started',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Access to 20+ free courses',
      'Basic code playground',
      'Community forum access',
      'Weekly coding challenges',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For serious learners',
    monthlyPrice: 29,
    yearlyPrice: 19,
    features: [
      'All 200+ courses',
      'Advanced code playground',
      'AI code review',
      'Certificate of completion',
      'Project-based learning',
      'Priority support',
    ],
    cta: 'Go Pro',
    popular: true,
  },
  {
    name: 'Team',
    description: 'For organizations',
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      'Everything in Pro',
      'Team analytics dashboard',
      'Custom learning paths',
      'Admin controls',
      'SSO integration',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true)

  return (
    <section className="py-20 sm:py-28 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your learning goals
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={cn('text-sm', !isYearly ? 'text-foreground' : 'text-muted-foreground')}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={cn(
                'relative w-14 h-7 rounded-full transition-colors',
                isYearly ? 'bg-primary' : 'bg-border'
              )}
              aria-label="Toggle billing period"
            >
              <span
                className={cn(
                  'absolute top-1 w-5 h-5 rounded-full bg-white transition-transform',
                  isYearly ? 'translate-x-8' : 'translate-x-1'
                )}
              />
            </button>
            <span className={cn('text-sm', isYearly ? 'text-foreground' : 'text-muted-foreground')}>
              Yearly
              <span className="ml-1.5 text-xs text-primary font-medium">Save 35%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative rounded-xl p-6 lg:p-8 transition-all duration-200',
                plan.popular
                  ? 'bg-background border-2 border-primary shadow-xl shadow-primary/10 scale-[1.02]'
                  : 'bg-background border border-border'
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl lg:text-5xl font-bold text-foreground">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  {plan.monthlyPrice > 0 && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                {isYearly && plan.monthlyPrice > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    billed annually
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className={cn(
                  'w-full',
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-transparent border border-border text-foreground hover:bg-card'
                )}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
