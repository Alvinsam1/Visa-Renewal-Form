import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface FormData {
  visaConfirmation?: string;
  renewalType?: string;
  cancellationSpeed?: string;
  cancellationLocation?: string;
  studentIDNumber?: string;
  firstName?: string;
  lastName?: string;
  school?: string;
  course?: string;
  dateOfBirth?: string;
  mobileAreaCode?: string;
  mobilePhoneNumber?: string;
  personalEmail?: string;
  uowdEmail?: string;
  nationality?: string;
  placeOfBirth?: string;
  gender?: string;
  fatherFirstName?: string;
  fatherLastName?: string;
  motherFirstName?: string;
  motherLastName?: string;
  documents?: Record<string, string>;
  status?: string;
  submittedAt?: string;
}

interface FormContextType {
  applicationId: string;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: FormData;
  updateFormData: (patch: Partial<FormData>) => void;
  files: Record<string, File>;
  setFile: (id: string, file: File | null) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function FormProvider({ children }: { children: ReactNode }) {
  const [applicationId, setApplicationId] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({});
  const [files, setFiles] = useState<Record<string, File>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize and load from local storage
  useEffect(() => {
    let appId = localStorage.getItem('uowd-visa-app-id');
    if (!appId) {
      appId = generateUUID();
      localStorage.setItem('uowd-visa-app-id', appId);
    }
    setApplicationId(appId);

    const savedData = localStorage.getItem(`visa-renewal-${appId}`);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.status !== 'submitted') {
          setFormData(parsed);
        }
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    if (isInitialized && applicationId) {
      localStorage.setItem(`visa-renewal-${applicationId}`, JSON.stringify(formData));
    }
  }, [formData, applicationId, isInitialized]);

  const updateFormData = (patch: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...patch }));
  };

  const setFile = (id: string, file: File | null) => {
    setFiles(prev => {
      const newFiles = { ...prev };
      if (file) {
        newFiles[id] = file;
      } else {
        delete newFiles[id];
      }
      return newFiles;
    });

    // Also update formData.documents with the filename for persistence
    setFormData(prev => {
      const docs = { ...(prev.documents || {}) };
      if (file) {
        docs[id] = file.name;
      } else {
        delete docs[id];
      }
      return { ...prev, documents: docs };
    });
  };

  if (!isInitialized) return null;

  return (
    <FormContext.Provider value={{
      applicationId,
      currentStep,
      setCurrentStep,
      formData,
      updateFormData,
      files,
      setFile
    }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}
