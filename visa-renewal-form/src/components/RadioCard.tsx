import React from 'react';
import { cn } from '../lib/utils';
import { Check } from 'lucide-react';

interface RadioCardProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  description?: string;
  className?: string;
}

export function RadioCard({ id, name, value, checked, onChange, label, description, className }: RadioCardProps) {
  return (
    <div
      onClick={() => onChange(value)}
      data-testid={`radiocard-${name}-${value.replace(/\s+/g, '-').toLowerCase()}`}
      className={cn(
        "group relative flex items-start sm:items-center cursor-pointer rounded-2xl border-2 p-5 transition-all duration-200 ease-in-out",
        checked 
          ? "border-primary bg-primary/5 shadow-[0_4px_12px_rgba(0,94,184,0.08)]" 
          : "border-border bg-card hover:border-primary/40 hover:bg-muted/50",
        className
      )}
    >
      <div className={cn(
        "mt-0.5 sm:mt-0 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
        checked ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30 group-hover:border-primary/50"
      )}>
        {checked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
      </div>
      <div className="ml-4 flex flex-col">
        <span className={cn(
          "font-semibold text-lg transition-colors",
          checked ? "text-primary" : "text-foreground group-hover:text-foreground/90"
        )}>
          {label}
        </span>
        {description && (
          <span className="text-sm text-muted-foreground mt-1 leading-snug">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}
