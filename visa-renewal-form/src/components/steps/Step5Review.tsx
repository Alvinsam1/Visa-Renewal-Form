import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { FormFooter } from '../FormFooter';
import { cn } from '../../lib/utils';
import { Pencil } from 'lucide-react';

export function Step5Review() {
  const { formData, applicationId, updateFormData, setCurrentStep } = useFormContext();

  const handleBack = () => {
    setCurrentStep(4);
  };

  const handleSubmit = () => {
    updateFormData({ status: 'submitted', submittedAt: new Date().toISOString() });
  };

  const editStep = (step: number) => {
    setCurrentStep(step);
  };

  const SummarySection = ({ title, step, children, className }: { title: string, step: number, children: React.ReactNode, className?: string }) => (
    <div className={cn("bg-card rounded-2xl border border-border overflow-hidden", className)}>
      <div className="flex items-center justify-between px-6 py-4 bg-secondary/30 border-b border-border">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <button 
          onClick={() => editStep(step)}
          className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors focus:outline-none focus:underline"
        >
          <Pencil className="h-3.5 w-3.5" /> Edit
        </button>
      </div>
      <div className="p-6 space-y-4">
        {children}
      </div>
    </div>
  );

  const SummaryRow = ({ label, value }: { label: string, value?: string }) => (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 border-b border-border/50 last:border-0 pb-3 last:pb-0">
      <span className="text-sm text-muted-foreground w-1/3 shrink-0">{label}</span>
      <span className="text-[15px] font-medium text-foreground">{value || <span className="text-muted-foreground/50 italic">Not provided</span>}</span>
    </div>
  );

  const isRenewal = formData.visaConfirmation === "I wish to RENEW my visa";

  const renewalDocs = [
    { id: "doc-passport", name: "Passport Copy" },
    { id: "doc-photo", name: "Photo" },
    { id: "doc-receipt", name: "Receipt" }
  ];

  const cancellationDocs = [
    { id: "doc-ticket", name: "Airline Ticket" },
    { id: "doc-exitstamp", name: "Cancellation Paper" },
    { id: "doc-entrypermit", name: "Entry Permit" }
  ];

  const expectedDocs = isRenewal ? renewalDocs : cancellationDocs;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground tracking-tight mb-3">Review & Submit</h2>
        <p className="text-muted-foreground leading-relaxed">
          Please review your information before submitting.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <SummarySection title="Visa Request Type" step={1}>
          <SummaryRow label="Request Type" value={formData.visaConfirmation} />
          {isRenewal ? (
            <SummaryRow label="Renewal Speed" value={formData.renewalType} />
          ) : (
            <>
              <SummaryRow label="Cancellation Speed" value={formData.cancellationSpeed} />
              <SummaryRow label="Location" value={formData.cancellationLocation} />
            </>
          )}
        </SummarySection>

        <SummarySection title="Personal Information" step={3}>
          <SummaryRow label="Student ID" value={formData.studentIDNumber} />
          <SummaryRow label="Full Name" value={`${formData.firstName} ${formData.lastName}`} />
          <SummaryRow label="School & Course" value={`${formData.school} - ${formData.course}`} />
          <SummaryRow label="Date of Birth" value={formData.dateOfBirth} />
          <SummaryRow label="Mobile" value={`${formData.mobileAreaCode} ${formData.mobilePhoneNumber}`} />
          <SummaryRow label="Personal Email" value={formData.personalEmail} />
          <SummaryRow label="UOWD Email" value={formData.uowdEmail} />
          <SummaryRow label="Nationality" value={formData.nationality} />
          <SummaryRow label="Place of Birth" value={formData.placeOfBirth} />
          <SummaryRow label="Gender" value={formData.gender} />
        </SummarySection>

        <SummarySection title="Parents Information" step={3}>
          <SummaryRow label="Father's Name" value={`${formData.fatherFirstName} ${formData.fatherLastName}`} />
          <SummaryRow label="Mother's Name" value={`${formData.motherFirstName} ${formData.motherLastName}`} />
        </SummarySection>

        <SummarySection title="Documents" step={4}>
          {expectedDocs.map(doc => (
            <SummaryRow 
              key={doc.id} 
              label={doc.name} 
              value={formData.documents?.[doc.id] || "Not uploaded"} 
            />
          ))}
        </SummarySection>
      </div>

      <FormFooter 
        onBack={handleBack}
        onSubmit={handleSubmit} 
      />
    </div>
  );
}
