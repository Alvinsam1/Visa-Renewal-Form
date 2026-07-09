import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { RadioCard } from '../RadioCard';
import { FormFooter } from '../FormFooter';

export function Step1Landing() {
  const { formData, updateFormData, setCurrentStep } = useFormContext();

  const handleContinue = () => {
    setCurrentStep(2);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground tracking-tight mb-3">Student Visa Form</h2>
        <p className="text-muted-foreground leading-relaxed">
          This form serves the purpose of gathering personal information and necessary documents from students who are seeking to renew or cancel their current residence visa.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <RadioCard
          id="renew"
          name="visaConfirmation"
          value="I wish to RENEW my visa"
          checked={formData.visaConfirmation === "I wish to RENEW my visa"}
          onChange={(val) => updateFormData({ visaConfirmation: val })}
          label="I wish to RENEW my visa"
        />
        <RadioCard
          id="cancel"
          name="visaConfirmation"
          value="I wish to CANCEL my visa"
          checked={formData.visaConfirmation === "I wish to CANCEL my visa"}
          onChange={(val) => updateFormData({ visaConfirmation: val })}
          label="I wish to CANCEL my visa"
        />
      </div>

      <FormFooter 
        canContinue={!!formData.visaConfirmation} 
        onContinue={handleContinue} 
      />
    </div>
  );
}
