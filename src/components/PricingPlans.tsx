import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Calculator, Sparkles } from 'lucide-react';

interface PricingCalculatorProps {
  customPrompt: string;
  selectedQuantity: number;
  onAcceptPricing: () => void;
}

const quantityPricing = {
  4: { multiplier: 1.0, label: '4 stickers' },
  6: { multiplier: 1.3, label: '6 stickers' },
  8: { multiplier: 1.6, label: '8 stickers' },
  12: { multiplier: 2.0, label: '12 stickers' }
};

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ 
  customPrompt,
  selectedQuantity,
  onAcceptPricing
}) => {
  const quantityInfo = quantityPricing[selectedQuantity as keyof typeof quantityPricing];
  
  if (!quantityInfo || !customPrompt.trim()) {
    return null;
  }

  const basePrice = 0.15; // Fixed base price for custom prompts
  const quantityMultiplier = quantityInfo.multiplier;
  const finalPrice = basePrice * quantityMultiplier;

  const breakdown = [
    {
      item: 'Base generation',
      price: basePrice,
      description: 'Custom AI style generation'
    },
    {
      item: quantityInfo.label,
      price: basePrice * (quantityMultiplier - 1),
      description: `${Math.round((quantityMultiplier - 1) * 100)}% quantity scaling`
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Calculator className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Generation Cost
          </h2>
        </div>
        <p className="text-muted-foreground">
          Review your pricing before proceeding to payment
        </p>
      </div>

      <Card className="p-6 max-w-md mx-auto border-primary/20">
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              ${finalPrice.toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">
              One-time payment for this generation
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Price Breakdown:</h4>
            {breakdown.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div>
                  <span className="font-medium">{item.item}</span>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <span className="text-primary font-medium">
                  {item.price > 0 ? `+$${item.price.toFixed(2)}` : '$0.00'}
                </span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between items-center font-bold">
              <span>Total:</span>
              <span className="text-primary">${finalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Custom AI-generated style stickers</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{quantityInfo.label} with different expressions</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Download as PNG, PDF, or individual files</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Commercial usage rights included</span>
            </div>
          </div>

          <Button
            variant="default"
            className="w-full bg-gradient-primary hover:opacity-90"
            onClick={onAcceptPricing}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Accept & Continue to Payment
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Secure payment processing via Stripe • No subscription required
          </p>
        </div>
      </Card>
    </div>
  );
};