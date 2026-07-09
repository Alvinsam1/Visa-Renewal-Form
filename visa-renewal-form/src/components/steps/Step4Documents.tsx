import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { FormFooter } from '../FormFooter';
import { DocumentUploadCard } from '../DocumentUploadCard';

export function Step4Documents() {
  const { formData, setCurrentStep, files, setFile } = useFormContext();

  const handleBack = () => {
    setCurrentStep(3);
  };

  const handleContinue = () => {
    setCurrentStep(5);
  };

  const isRenewal = formData.visaConfirmation === "I wish to RENEW my visa";

  const renewalDocs = [
    { id: "doc-passport", name: "Clear Colour Passport Copy (including last page, min. 6 months validity)" },
    { id: "doc-photo", name: "Passport Size Photo (white background)" },
    { id: "doc-receipt", name: "Receipt for Visa and Tuition Fees" }
  ];

  const cancellationDocs = [
    { id: "doc-ticket", name: "Airline ticket copy (if leaving UAE)" },
    { id: "doc-exitstamp", name: "Cancellation paper with DNATA exit stamp (if leaving UAE)" },
    { id: "doc-entrypermit", name: "Entry permit / change of status document from new sponsor (if applying with a new sponsor)" }
  ];

  const requiredDocs = isRenewal ? renewalDocs : cancellationDocs;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground tracking-tight mb-3">Document Upload</h2>
        <p className="text-muted-foreground leading-relaxed">
          Please upload the required documents below.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {requiredDocs.map(doc => (
          <DocumentUploadCard
            key={doc.id}
            id={doc.id}
            name={doc.name}
            file={files[doc.id]}
            fileName={formData.documents?.[doc.id]}
            onFileSelect={(f) => setFile(doc.id, f)}
          />
        ))}
      </div>

      <FormFooter 
        onBack={handleBack}
        onContinue={handleContinue} 
      />
    </div>
  );
}
