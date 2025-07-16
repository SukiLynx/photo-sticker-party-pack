import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Sparkles } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
  features: string[];
  limitations: string[];
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Free',
    period: '',
    description: 'Perfect for trying out our sticker generator',
    icon: <Sparkles className="h-6 w-6" />,
    features: [
      '1 style option (Kawaii Cute)',
      'Up to 4 stickers per pack',
      'Standard quality (512x512)',
      'Basic export (PNG)',
      '3 generations per day'
    ],
    limitations: [
      'Watermark on stickers',
      'Limited style customization'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    description: 'Ideal for regular sticker creators',
    badge: 'Most Popular',
    icon: <Star className="h-6 w-6" />,
    features: [
      'All 4 style options',
      'Up to 12 stickers per pack',
      'High quality (1024x1024)',
      'Multiple export formats (PNG, PDF, SVG)',
      'Unlimited generations',
      'No watermarks',
      'Advanced style customization',
      'Priority processing'
    ],
    limitations: [],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$19.99',
    period: '/month',
    description: 'For creators who want the ultimate experience',
    badge: 'Best Value',
    icon: <Crown className="h-6 w-6" />,
    features: [
      'Everything in Pro',
      'Ultra-high quality (2048x2048)',
      'Custom style training',
      'Bulk generation (up to 50 packs)',
      'API access',
      'Commercial usage rights',
      'Dedicated support',
      'Early access to new features',
      'Custom sticker templates'
    ],
    limitations: []
  }
];

interface PricingPlansProps {
  onSelectPlan?: (planId: string) => void;
  selectedPlan?: string;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({ 
  onSelectPlan,
  selectedPlan 
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the perfect plan based on your needs for quality, styles, and quantity
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`
              relative p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1
              ${plan.popular 
                ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                : 'hover:border-primary/50'
              }
              ${selectedPlan === plan.id ? 'ring-2 ring-accent' : ''}
            `}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge 
                  variant={plan.popular ? "default" : "secondary"}
                  className="px-3 py-1 bg-gradient-primary text-primary-foreground"
                >
                  {plan.badge}
                </Badge>
              </div>
            )}

            <div className="text-center space-y-4 mb-6">
              <div className={`
                w-12 h-12 mx-auto rounded-lg flex items-center justify-center
                ${plan.popular 
                  ? 'bg-gradient-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                {plan.icon}
              </div>
              
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {plan.limitations.length > 0 && (
                <div className="pt-2 border-t border-muted">
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Limitations:
                  </p>
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="text-xs text-muted-foreground">
                      • {limitation}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant={plan.popular ? "default" : "outline"}
              className={`
                w-full
                ${plan.popular ? 'bg-gradient-primary hover:opacity-90' : ''}
                ${selectedPlan === plan.id ? 'ring-2 ring-accent' : ''}
              `}
              onClick={() => onSelectPlan?.(plan.id)}
            >
              {plan.price === 'Free' ? 'Get Started' : 'Choose Plan'}
            </Button>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>All plans include secure cloud storage and 24/7 customer support</p>
      </div>
    </div>
  );
};