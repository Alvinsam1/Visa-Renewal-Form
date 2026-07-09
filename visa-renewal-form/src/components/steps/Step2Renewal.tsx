import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { RadioCard } from '../RadioCard';
import { InfoPanel } from '../InfoPanel';
import { FormFooter } from '../FormFooter';

export function Step2Renewal() {
  const { formData, updateFormData, setCurrentStep } = useFormContext();

  const handleContinue = () => {
    setCurrentStep(3);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const feeData = [
    { type: "1 Year – Normal", cost: "3,780.00", time: "15–20 working days (after completing medicals and submitting passport to Block 8)" },
    { type: "1 Year – Urgent", cost: "4,578.00", time: "7–10 working days (after completing medicals and submitting passport to Block 8)" }
  ];

  const feeColumns = [
    { header: "Visa Renewal Type", accessor: "type" },
    { header: "Cost (AED)", accessor: "cost" },
    { header: "Processing Time", accessor: "time" }
  ];

  const feeNotes = [
    "Fee is inclusive of the Visa renewal package fee and Health Insurance.",
    "Applicants must be inside the UAE at the time of applying for the visa renewal.",
    "The visa renewal service fee is inclusive of 5% VAT. Fees are subject to change without notification.",
    "In case of any late renewal fines, the amount will be deducted from the visa maintenance charge. In certain cases, the student will be required to pay this amount directly at the AXS Centre (Block 8, Knowledge Park) prior to the visa renewal.",
    "Students under UOWD visa sponsorship must be enrolled in a minimum of 3 undergraduate (UG) and 2 postgraduate (PG) subjects in Autumn and Spring semesters. Global English Studies/GES students must pay for at least 1 term. GEMLUX students should be enrolled for at least 1 subject. Violation of the Visa Policy will lead to cancellation of the student's visa."
  ];

  const docNotes = [
    "Clear colour Passport copy - including last page (with at least 6 months' validity)",
    "Passport size photo (white background, digitally clicked at a photo studio)",
    "Receipt for visa and tuition fees (3 subjects for UG, 2 subjects for PG or 1 term for Global English Studies (GES), 1 subject for GEMLUX)"
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground tracking-tight mb-3">Student Visa Renewal Information</h2>
        <p className="text-muted-foreground leading-relaxed">
          Please review the fee structure and document requirements before proceeding.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <InfoPanel 
          title="Visa Renewal Fees" 
          tableData={feeData} 
          tableColumns={feeColumns} 
          notes={feeNotes} 
        />
        
        <InfoPanel 
          title="Documents to Prepare (uploaded on the Documents step)" 
          notes={docNotes} 
        />
        
        <div className="pt-4 border-t border-border">
          <h3 className="font-semibold text-lg text-foreground mb-4">Select Renewal Speed</h3>
          <div className="space-y-4">
            <RadioCard
              id="renewal-normal"
              name="renewalType"
              value="Normal"
              checked={formData.renewalType === "Normal"}
              onChange={(val) => updateFormData({ renewalType: val })}
              label="Normal"
              description="AED 3,780.00 • 15–20 working days"
            />
            <RadioCard
              id="renewal-urgent"
              name="renewalType"
              value="Urgent"
              checked={formData.renewalType === "Urgent"}
              onChange={(val) => updateFormData({ renewalType: val })}
              label="Urgent"
              description="AED 4,578.00 • 7–10 working days"
            />
          </div>
        </div>
      </div>

      <FormFooter 
        onBack={handleBack}
        canContinue={!!formData.renewalType} 
        onContinue={handleContinue} 
      />
    </div>
  );
}
