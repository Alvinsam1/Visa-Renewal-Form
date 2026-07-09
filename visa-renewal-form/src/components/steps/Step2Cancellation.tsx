import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { RadioCard } from '../RadioCard';
import { InfoPanel } from '../InfoPanel';
import { FormFooter } from '../FormFooter';

export function Step2Cancellation() {
  const { formData, updateFormData, setCurrentStep } = useFormContext();

  const handleContinue = () => {
    setCurrentStep(3);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const cancelData = [
    { type: "Normal Cancellation Charges", fee: "AED 500" },
    { type: "Urgent Cancellation Charges", fee: "AED 1,077.50" }
  ];

  const cancelColumns = [
    { header: "Visa Cancellation Type", accessor: "type" },
    { header: "Visa Cancellation Fees", accessor: "fee" }
  ];

  const postCancelNotes = [
    "Visa cancellation takes 3-5 working days under normal circumstances. Cancellation outside the country will be processed after 90 days from your exit date. Please send the exit stamp date to the visa officer.",
    "If you are leaving UAE: provide a copy of your airline ticket along with the cancellation paper with exit stamp from the DNATA counter at the airport, sent by email to studentvisa@uowdubai.ac.ae. If not provided within 30 days of cancellation, an immigration print-out request will be charged to your visa deposit.",
    "If you are applying for a visa with a new sponsor: collect (or request by email) your visa cancellation paper and apply for the visa with your new sponsor. Once you have received the entry permit and change status document from your new sponsor, submit them by email to studentvisa@uowdubai.ac.ae.",
    "You must complete either process within the allotted grace period (per the date on the cancellation document). If the new visa process is not completed, or you have not left the country before your last date to exit, no further notifications will be given and you will be blacklisted in the immigration system."
  ];

  const refundNotes = [
    "All visa refunds are processed through bank transfer and take 21-45 working days from the time you provide one of the following: (1) exit stamp in your cancellation document/passport if leaving the UAE, or (2) your stamped new-sponsor visa page if you have changed sponsors.",
    "Fees of AED 25 for local bank transfers and AED 55 for international transfers will be deducted from the refund amount as bank transfer charges. UOWD is unable to make bank transfers to Iran.",
    "Any funds (visa deposit) held by UOWD will be forfeited if the student does not complete the relevant form (Fee Refund or Transfer Request) within 1 year from the time of cancellation. If eligible for a tuition fee refund, please speak to the Cashiers for further details."
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground tracking-tight mb-3">Student Visa Cancellation Information</h2>
        <p className="text-muted-foreground leading-relaxed">
          Please review the charges and process for visa cancellation.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <InfoPanel 
            title="Visa Cancellation Charges (deducted from visa deposit)" 
            tableData={cancelData} 
            tableColumns={cancelColumns} 
            className="mb-3"
          />
          <p className="text-sm font-medium text-destructive px-2">Note: Health Insurance Coverage will be cancelled along with your visa.</p>
        </div>
        
        <InfoPanel 
          title="Post Cancellation Process" 
          notes={postCancelNotes} 
        />
        
        <InfoPanel 
          title="Visa Deposit Refund" 
          notes={refundNotes} 
        />
        
        <div className="pt-6 border-t border-border space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-4">Cancellation Speed</h3>
            <div className="space-y-4">
              <RadioCard
                id="cancel-speed-urgent"
                name="cancellationSpeed"
                value="Urgent (3 Working Days)"
                checked={formData.cancellationSpeed === "Urgent (3 Working Days)"}
                onChange={(val) => updateFormData({ cancellationSpeed: val })}
                label="Urgent (3 Working Days)"
              />
              <RadioCard
                id="cancel-speed-normal"
                name="cancellationSpeed"
                value="Normal (5 Working Days)"
                checked={formData.cancellationSpeed === "Normal (5 Working Days)"}
                onChange={(val) => updateFormData({ cancellationSpeed: val })}
                label="Normal (5 Working Days)"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-foreground mb-4">Cancellation Location</h3>
            <div className="space-y-4">
              <RadioCard
                id="cancel-loc-inside"
                name="cancellationLocation"
                value="Inside the UAE"
                checked={formData.cancellationLocation === "Inside the UAE"}
                onChange={(val) => updateFormData({ cancellationLocation: val })}
                label="Inside the UAE"
              />
              <RadioCard
                id="cancel-loc-outside"
                name="cancellationLocation"
                value="Outside the UAE"
                checked={formData.cancellationLocation === "Outside the UAE"}
                onChange={(val) => updateFormData({ cancellationLocation: val })}
                label="Outside the UAE"
              />
            </div>
          </div>
        </div>
      </div>

      <FormFooter 
        onBack={handleBack}
        canContinue={!!formData.cancellationSpeed && !!formData.cancellationLocation} 
        onContinue={handleContinue} 
      />
    </div>
  );
}
