import React from 'react';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { StepRouter } from '../components/StepRouter';
import { SuccessScreen } from '../components/SuccessScreen';
import { useFormContext } from '../context/FormContext';

export function VisaRenewalForm() {
  const { formData } = useFormContext();

  const isSubmitted = formData.status === 'submitted';

  return (
    <div className="min-h-[100dvh] bg-background py-8 px-4 sm:py-12 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        {/* Header Logo Area */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">UOWD</h1>
            <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mt-1">Visa Services</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-card rounded-[24px] shadow-lg border border-card-border overflow-hidden relative">
          
          {/* Card inner padding wrapper */}
          <div className="p-6 sm:p-10">
            {!isSubmitted && <ProgressIndicator />}
            
            <div className="relative">
              {isSubmitted ? (
                <SuccessScreen />
              ) : (
                <StepRouter />
              )}
            </div>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-muted-foreground/80">
          <p>© {new Date().getFullYear()} University of Wollongong in Dubai. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
