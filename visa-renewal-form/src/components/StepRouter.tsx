import React from 'react';
import { Step1Landing } from './steps/Step1Landing';
import { Step2Renewal } from './steps/Step2Renewal';
import { Step2Cancellation } from './steps/Step2Cancellation';
import { Step3Personal } from './steps/Step3Personal';
import { Step4Documents } from './steps/Step4Documents';
import { Step5Review } from './steps/Step5Review';
import { useFormContext } from '../context/FormContext';

export function StepRouter() {
  const { currentStep, formData } = useFormContext();

  switch (currentStep) {
    case 1:
      return <Step1Landing />;
    case 2:
      return formData.visaConfirmation === "I wish to RENEW my visa" 
        ? <Step2Renewal /> 
        : <Step2Cancellation />;
    case 3:
      return <Step3Personal />;
    case 4:
      return <Step4Documents />;
    case 5:
      return <Step5Review />;
    default:
      return <Step1Landing />;
  }
}
