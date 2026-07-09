import React from 'react';
import { cn } from '../lib/utils';

interface FormFooterProps {
  onBack?: () => void;
  onContinue?: () => void;
  onSubmit?: () => void;
  canContinue?: boolean;
  continueText?: string;
  className?: string;
}

export function FormFooter({ onBack, onContinue, onSubmit, canContinue = true, continueText = "Continue", className }: FormFooterProps) {
  return (
    <div className={cn("sticky bottom-0 mt-10 pt-4 pb-4 bg-card/95 backdrop-blur-md border-t border-border flex items-center justify-between z-20", className)}>
      {onBack ? (
        <button 
          onClick={onBack}
          data-testid="button-back"
          className="px-6 py-2.5 text-[15px] font-medium text-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Back
        </button>
      ) : <div />}
      
      {onSubmit ? (
        <button
          onClick={onSubmit}
          disabled={!canContinue}
          data-testid="button-submit"
          className="px-8 py-2.5 text-[15px] font-semibold text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Submit Application
        </button>
      ) : onContinue ? (
        <button
          onClick={onContinue}
          disabled={!canContinue}
          data-testid="button-continue"
          className="px-8 py-2.5 text-[15px] font-semibold text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {continueText}
        </button>
      ) : null}
    </div>
  );
}
