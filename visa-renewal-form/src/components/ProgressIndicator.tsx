import React from 'react';
import { cn } from '../lib/utils';
import { Check } from 'lucide-react';
import { useFormContext } from '../context/FormContext';

export function ProgressIndicator() {
  const { currentStep, formData } = useFormContext();
  
  let step2Label = "Information";
  if (formData.visaConfirmation === "I wish to RENEW my visa") {
    step2Label = "Renewal Info";
  } else if (formData.visaConfirmation === "I wish to CANCEL my visa") {
    step2Label = "Cancellation Info";
  }

  const steps = [
    { number: 1, label: "Application" },
    { number: 2, label: step2Label },
    { number: 3, label: "Personal Details" },
    { number: 4, label: "Documents" },
    { number: 5, label: "Review" },
  ];

  return (
    <div className="w-full mb-8 pt-4">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-border -z-10 rounded-full" />
        
        {/* Active progress line */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary -z-10 transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, idx) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          
          return (
            <div key={step.number} className="flex flex-col items-center gap-2 relative">
              <div 
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 shadow-sm border-[2px]",
                  isCompleted 
                    ? "bg-primary border-primary text-primary-foreground shadow-primary/20" 
                    : isCurrent
                      ? "bg-card border-primary text-primary"
                      : "bg-card border-border text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : step.number}
              </div>
              <span className={cn(
                "absolute -bottom-6 w-24 text-center text-xs font-medium transition-colors",
                isCurrent ? "text-primary" : "text-muted-foreground",
                "hidden sm:block"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      {/* Mobile step label below */}
      <div className="mt-4 sm:hidden text-center text-sm font-semibold text-foreground">
        Step {currentStep}: {steps[currentStep - 1]?.label}
      </div>
    </div>
  );
}
