import React from 'react';
import { useFormContext } from '../context/FormContext';
import { CheckCircle2 } from 'lucide-react';

export function SuccessScreen() {
  const { applicationId } = useFormContext();

  return (
    <div className="py-16 px-6 text-center animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center">
      <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-8">
        <CheckCircle2 className="h-12 w-12 text-primary" />
      </div>
      
      <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">Application Submitted</h2>
      
      <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
        Your visa renewal/cancellation request has been submitted successfully. You will receive a confirmation from the UOWD Visa Office shortly.
      </p>

      <div className="bg-secondary/50 rounded-2xl p-6 border border-border w-full max-w-sm mx-auto">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Reference Number</p>
        <p className="text-lg font-mono font-semibold text-foreground break-all bg-card py-3 px-4 rounded-xl border border-border shadow-sm">
          {applicationId}
        </p>
      </div>
      
      <div className="mt-12">
        <button 
          onClick={() => window.location.reload()}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Start a new application
        </button>
      </div>
    </div>
  );
}
