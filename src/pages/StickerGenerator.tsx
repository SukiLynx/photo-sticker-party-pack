import React, { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { StyleSelector } from '@/components/StyleSelector';
import { QuantitySelector } from '@/components/QuantitySelector';
import { StickerPreview } from '@/components/StickerPreview';
import { PricingPlans } from '@/components/PricingPlans';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Wand2, ArrowRight, ArrowLeft } from 'lucide-react';

interface GenerationState {
  uploadedImage: string | null;
  selectedStyle: string;
  selectedQuantity: number;
  stickerPack: string[];
  isGenerating: boolean;
  currentStep: number;
  selectedPlan: string;
}

export const StickerGenerator: React.FC = () => {
  const { toast } = useToast();
  const [state, setState] = useState<GenerationState>({
    uploadedImage: null,
    selectedStyle: '',
    selectedQuantity: 6,
    stickerPack: [],
    isGenerating: false,
    currentStep: 1,
    selectedPlan: 'basic',
  });

  const steps = [
    { number: 1, title: 'Choose Plan', description: 'Select your pricing tier' },
    { number: 2, title: 'Upload Photo', description: 'Add your beautiful selfie' },
    { number: 3, title: 'Choose Style', description: 'Pick your favorite look' },
    { number: 4, title: 'Select Quantity', description: 'How many stickers?' },
    { number: 5, title: 'Generate & Download', description: 'Get your stickers!' },
  ];

  const progress = ((state.currentStep - 1) / (steps.length - 1)) * 100;

  const handlePlanSelect = (planId: string) => {
    setState(prev => ({
      ...prev,
      selectedPlan: planId,
      currentStep: Math.max(prev.currentStep, 2)
    }));
    
    toast({
      title: "Plan selected! 🎯",
      description: `You chose the ${planId} plan. Now upload your photo!`,
    });
  };

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setState(prev => ({
      ...prev,
      uploadedImage: url,
      currentStep: Math.max(prev.currentStep, 3)
    }));
    
    toast({
      title: "Photo uploaded! ✨",
      description: "Your image looks perfect for sticker creation!",
    });
  };

  const handleRemoveImage = () => {
    if (state.uploadedImage) {
      URL.revokeObjectURL(state.uploadedImage);
    }
    setState(prev => ({
      ...prev,
      uploadedImage: null,
      currentStep: 2,
      stickerPack: []
    }));
  };

  const handleStyleSelect = (styleId: string) => {
    setState(prev => ({
      ...prev,
      selectedStyle: styleId,
      currentStep: Math.max(prev.currentStep, 4)
    }));
  };

  const handleQuantitySelect = (quantity: number) => {
    setState(prev => ({
      ...prev,
      selectedQuantity: quantity,
      currentStep: Math.max(prev.currentStep, 5)
    }));
  };

  const handleGenerateStickers = async () => {
    if (!state.uploadedImage || !state.selectedStyle) {
      toast({
        title: "Missing information",
        description: "Please upload an image and select a style first!",
        variant: "destructive",
      });
      return;
    }

    setState(prev => ({ ...prev, isGenerating: true }));

    try {
      // Simulate AI generation process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, create placeholder stickers
      // In a real app, this would call an AI service
      const mockStickers = Array.from({ length: state.selectedQuantity }, (_, index) => 
        `https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=face&auto=format&q=60&seed=${index}`
      );
      
      setState(prev => ({
        ...prev,
        stickerPack: mockStickers,
        isGenerating: false
      }));

      toast({
        title: "Stickers generated! 🎉",
        description: `Your ${state.selectedQuantity} ${state.selectedStyle} stickers are ready!`,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isGenerating: false }));
      toast({
        title: "Generation failed",
        description: "Something went wrong. Please try again!",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download started! 📥",
      description: "Your sticker pack is being prepared for download.",
    });
    // In a real app, this would trigger the actual download
  };

  const handleShare = () => {
    toast({
      title: "Share options opened! 📱",
      description: "Choose your favorite platform to share your stickers.",
    });
    // In a real app, this would open share options
  };

  const canProceedToNextStep = () => {
    switch (state.currentStep) {
      case 1: return !!state.selectedPlan;
      case 2: return !!state.uploadedImage;
      case 3: return !!state.selectedStyle;
      case 4: return state.selectedQuantity > 0;
      default: return true;
    }
  };

  const goToNextStep = () => {
    if (canProceedToNextStep() && state.currentStep < steps.length) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const goToPrevStep = () => {
    if (state.currentStep > 1) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary animate-glow-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Sticker Generator
            </h1>
            <Sparkles className="h-8 w-8 text-accent animate-glow-pulse" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your selfies into adorable custom stickers with AI magic! ✨
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-card to-muted/30">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Your Progress</h3>
              <Badge variant="secondary" className="bg-gradient-accent text-foreground">
                Step {state.currentStep} of {steps.length}
              </Badge>
            </div>
            
            <Progress value={progress} className="h-3" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`
                    text-center p-3 rounded-lg transition-all duration-300
                    ${state.currentStep >= step.number
                      ? 'bg-gradient-primary/10 text-primary'
                      : 'text-muted-foreground'
                    }
                  `}
                >
                  <div className={`
                    w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center text-sm font-bold
                    ${state.currentStep >= step.number
                      ? 'bg-gradient-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {step.number}
                  </div>
                  <p className="text-xs font-medium">{step.title}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Step 1: Plan Selection */}
          {state.currentStep >= 1 && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-primary bg-clip-text text-transparent">
                Step 1: Choose Your Plan
              </h2>
              <PricingPlans
                selectedPlan={state.selectedPlan}
                onSelectPlan={handlePlanSelect}
              />
            </Card>
          )}

          {/* Step 2: Image Upload */}
          {state.currentStep >= 2 && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-primary bg-clip-text text-transparent">
                Step 2: Upload Your Photo
              </h2>
              <ImageUpload
                onImageUpload={handleImageUpload}
                uploadedImage={state.uploadedImage || undefined}
                onRemoveImage={handleRemoveImage}
              />
            </Card>
          )}

          {/* Step 3: Style Selection */}
          {state.currentStep >= 3 && state.uploadedImage && (
            <Card className="p-6">
              <StyleSelector
                selectedStyle={state.selectedStyle}
                onStyleSelect={handleStyleSelect}
              />
            </Card>
          )}

          {/* Step 4: Quantity Selection */}
          {state.currentStep >= 4 && state.selectedStyle && (
            <Card className="p-6">
              <QuantitySelector
                selectedQuantity={state.selectedQuantity}
                onQuantitySelect={handleQuantitySelect}
              />
            </Card>
          )}

          {/* Step 5: Generation & Preview */}
          {state.currentStep >= 5 && (
            <Card className="p-6">
              {state.stickerPack.length === 0 && !state.isGenerating && (
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-cute bg-clip-text text-transparent">
                    Ready to Create Magic? ✨
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    You're all set! Click the button below to generate your {state.selectedQuantity} amazing {state.selectedStyle} stickers.
                  </p>
                  <Button
                    variant="cute"
                    size="lg"
                    onClick={handleGenerateStickers}
                    className="text-lg px-8 py-4"
                  >
                    <Wand2 className="h-6 w-6 mr-3" />
                    Generate My Stickers
                  </Button>
                </div>
              )}
              
              <StickerPreview
                isGenerating={state.isGenerating}
                stickerPack={state.stickerPack}
                onDownload={handleDownload}
                onShare={handleShare}
                selectedStyle={state.selectedStyle}
                selectedQuantity={state.selectedQuantity}
              />
            </Card>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={goToPrevStep}
            disabled={state.currentStep <= 1}
            className="px-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button
            variant="default"
            onClick={goToNextStep}
            disabled={!canProceedToNextStep() || state.currentStep >= steps.length}
            className="px-6"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};