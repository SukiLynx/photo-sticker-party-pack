import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Sparkles, Lightbulb } from 'lucide-react';

interface StyleSelectorProps {
  customPrompt: string;
  onPromptChange: (prompt: string) => void;
}

const promptExamples = [
  "Kawaii anime style with big sparkly eyes and pastel colors",
  "Realistic portrait with soft lighting and natural colors",
  "Cartoon style with bold outlines and vibrant colors",
  "Minimalist line art with simple geometric shapes",
  "Watercolor painting style with soft edges and flowing colors",
  "Pixel art retro gaming style with 8-bit aesthetics"
];

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  customPrompt,
  onPromptChange,
}) => {
  const [currentExample, setCurrentExample] = useState(0);

  const handleExampleClick = (example: string) => {
    onPromptChange(example);
  };

  const handleRandomExample = () => {
    const randomIndex = Math.floor(Math.random() * promptExamples.length);
    setCurrentExample(randomIndex);
    onPromptChange(promptExamples[randomIndex]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Describe Your Style
        </h2>
        <p className="text-muted-foreground">
          Tell us how you want your stickers to look
        </p>
      </div>
      
      <Card className="p-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Wand2 className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Custom Style Prompt</h3>
          </div>
          
          <Textarea
            placeholder="Describe your desired style... e.g., 'Kawaii anime style with big sparkly eyes and pastel colors'"
            value={customPrompt}
            onChange={(e) => onPromptChange(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {customPrompt.length}/500 characters
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRandomExample}
              className="flex items-center space-x-1"
            >
              <Sparkles className="h-4 w-4" />
              <span>Random Idea</span>
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-4 max-w-2xl mx-auto bg-gradient-secondary/10">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <h4 className="font-medium text-sm">💡 Style Examples:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {promptExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="text-left text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded hover:bg-primary/5"
                >
                  "{example}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};