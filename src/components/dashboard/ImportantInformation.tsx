import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import TypewriterText from "../ui/TypewriterText";
import { useUserStore } from "../../stores/userStore";

const ImportantInformation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const { toggleBalanceVisibility } = useUserStore();
  
  const steps = [
    'Click "Buy BPC" from dashboard',
    'Fill details and amount',
    'Complete payment for BPC code',
    'Use code for airtime & withdrawals'
  ];

  const slides = [
    {
      type: 'image',
      src: '/lovable-uploads/e725b10a-6245-4970-815e-10be41430d6d.png',
      alt: 'BLUEPAY2025 App Interface',
      clickable: false
    },
    {
      type: 'image',
      src: '/lovable-uploads/3a8d935d-3aaa-4dba-baf7-3a9f6f69b654.png',
      alt: 'WooCommerce BluePay Payment Gateway',
      clickable: true
    },
    {
      type: 'info',
      content: 'information'
    }
  ];

  const [currentStepText, setCurrentStepText] = useState(steps[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = (prev + 1) % steps.length;
        setCurrentStepText(steps[nextStep]);
        return nextStep;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [steps.length]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const handleImageClick = (clickable: boolean) => {
    if (clickable) {
      toggleBalanceVisibility();
    }
  };

  return (
    <div className="relative overflow-hidden mb-2">
      <div className="relative w-full h-[200px]">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            {slide.type === 'image' ? (
              <Card 
                className={`w-full h-full p-0 overflow-hidden bg-card/60 border-border/50 backdrop-blur-xl ${
                  slide.clickable ? 'cursor-pointer hover:border-primary/50 transition-all' : ''
                }`}
                onClick={() => handleImageClick(slide.clickable)}
              >
                <img 
                  src={slide.src} 
                  alt={slide.alt} 
                  className="w-full h-full object-cover rounded-lg"
                />
              </Card>
            ) : (
              <Card 
                className="w-full h-full p-3 text-foreground flex flex-col"
                style={{
                  background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.3) 0%, hsl(280 70% 50% / 0.2) 100%)',
                  border: '1px solid hsl(217 91% 60% / 0.3)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <h3 className="text-base font-bold mb-2 text-foreground">Important Information</h3>
                
                <div 
                  className="rounded-lg p-2 flex-1 flex flex-col"
                  style={{
                    background: 'hsl(217 91% 60% / 0.1)',
                    border: '1px solid hsl(217 91% 60% / 0.2)',
                  }}
                >
                  <h4 className="text-sm font-semibold mb-2 text-foreground">How to Buy BPC Code</h4>
                  
                  <div className="space-y-2 flex-1">
                    {steps.map((step, stepIndex) => (
                      <div 
                        key={stepIndex}
                        className={`flex items-center transition-all duration-500 transform ${
                          stepIndex === currentStep 
                            ? 'scale-105 opacity-100 translate-x-1' 
                            : 'scale-100 opacity-70 translate-x-0'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 transition-all duration-500 flex-shrink-0 ${
                          stepIndex === currentStep 
                            ? 'bg-primary text-primary-foreground shadow-lg' 
                            : 'bg-muted/50 text-foreground/70'
                        }`}>
                          <span className="text-xs font-bold">{stepIndex + 1}</span>
                        </div>
                        <p className={`text-xs transition-all duration-500 ${
                          stepIndex === currentStep ? 'font-semibold text-primary' : 'text-foreground/80'
                        }`}>
                          {stepIndex === currentStep ? (
                            <TypewriterText 
                              text={currentStepText} 
                              speed={80}
                              className="text-primary"
                            />
                          ) : (
                            step
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-1 mt-2 justify-center">
                    {steps.map((_, stepIndex) => (
                      <div
                        key={stepIndex}
                        className={`w-1 h-1 rounded-full transition-all duration-300 ${
                          stepIndex === currentStep ? 'bg-primary' : 'bg-muted-foreground/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>
        ))}
      </div>
      
      {/* Slide indicators */}
      <div className="flex justify-center mt-2 space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImportantInformation;
