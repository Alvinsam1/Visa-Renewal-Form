import React, { useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { FormFooter } from '../FormFooter';
import { cn } from '../../lib/utils';

export function Step3Personal() {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [showErrors, setShowErrors] = useState(false);

  const handleBack = () => {
    setCurrentStep(2);
  };

  const handleContinue = () => {
    if (isValid()) {
      setCurrentStep(4);
    } else {
      setShowErrors(true);
      // scroll to first error
      setTimeout(() => {
        const firstError = document.querySelector('.border-destructive');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const fields = [
    'studentIDNumber', 'firstName', 'lastName', 'school', 'course', 
    'dateOfBirth', 'mobileAreaCode', 'mobilePhoneNumber', 'personalEmail', 
    'uowdEmail', 'nationality', 'placeOfBirth', 'gender',
    'fatherFirstName', 'fatherLastName', 'motherFirstName', 'motherLastName'
  ] as const;

  const isValid = () => {
    return fields.every(field => !!formData[field]?.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateFormData({ [e.target.name]: e.target.value });
    if (showErrors) setShowErrors(false);
  };

  const InputWrapper = ({ label, error, children, className }: { label: string, error?: boolean, children: React.ReactNode, className?: string }) => (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
      {error && showErrors && <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">This field is required</p>}
    </div>
  );

  type TextFieldName = (typeof fields)[number];

  const inputClass = (fieldName: TextFieldName) => cn(
    "flex h-11 w-full rounded-xl border bg-card px-4 py-2 text-[15px] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
    showErrors && !formData[fieldName]?.trim() ? "border-destructive focus-visible:ring-destructive/20" : "border-input"
  );

  const selectClass = (fieldName: TextFieldName) => cn(
    "flex h-11 w-full items-center justify-between rounded-xl border bg-card px-4 py-2 text-[15px] transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
    showErrors && !formData[fieldName]?.trim() ? "border-destructive focus:ring-destructive/20" : "border-input"
  );

  const nationalities = ["Afghan", "Albanian", "Algerian", "Argentinian", "Australian", "Bahraini", "Bangladeshi", "Belgian", "Brazilian", "British", "Canadian", "Chinese", "Egyptian", "Emirati", "Ethiopian", "Filipino", "French", "German", "Ghanaian", "Greek", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Italian", "Japanese", "Jordanian", "Kenyan", "Korean", "Kuwaiti", "Lebanese", "Malaysian", "Mexican", "Moroccan", "Nigerian", "Omani", "Pakistani", "Palestinian", "Qatari", "Russian", "Saudi Arabian", "South African", "Spanish", "Sri Lankan", "Sudanese", "Syrian", "Tunisian", "Turkish", "Ugandan", "Ukrainian", "American", "Yemeni", "Other"].sort();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 pb-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground tracking-tight mb-3">Personal Information</h2>
        <p className="text-muted-foreground leading-relaxed">
          Please provide your details exactly as they appear on your passport.
        </p>
      </div>

      <div className="space-y-6">
        <InputWrapper label="Student ID Number" error={!formData.studentIDNumber?.trim()}>
          <input
            type="text"
            name="studentIDNumber"
            value={formData.studentIDNumber || ''}
            onChange={handleChange}
            className={inputClass('studentIDNumber')}
            placeholder="e.g. 1234567"
          />
        </InputWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputWrapper label="First Name" error={!formData.firstName?.trim()}>
            <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} className={inputClass('firstName')} />
          </InputWrapper>
          <InputWrapper label="Last Name" error={!formData.lastName?.trim()}>
            <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} className={inputClass('lastName')} />
          </InputWrapper>
        </div>

        <InputWrapper label="School" error={!formData.school?.trim()}>
          <input type="text" name="school" value={formData.school || ''} onChange={handleChange} className={inputClass('school')} />
        </InputWrapper>

        <InputWrapper label="Course" error={!formData.course?.trim()}>
          <div className="relative">
            <select name="course" value={formData.course || ''} onChange={handleChange} className={selectClass('course')}>
              <option value="" disabled hidden>Please Select</option>
              <option value="Bachelor of Business Administration">Bachelor of Business Administration</option>
              <option value="Bachelor of Computer Science">Bachelor of Computer Science</option>
              <option value="Bachelor of Engineering">Bachelor of Engineering</option>
              <option value="Bachelor of Information Technology">Bachelor of Information Technology</option>
              <option value="Master of Business Administration">Master of Business Administration</option>
              <option value="Master of Engineering Management">Master of Engineering Management</option>
              <option value="Global English Studies">Global English Studies</option>
              <option value="GEMLUX">GEMLUX</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </InputWrapper>

        <InputWrapper label="Date of Birth" error={!formData.dateOfBirth?.trim()}>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth || ''} onChange={handleChange} className={inputClass('dateOfBirth')} />
        </InputWrapper>

        <div className="flex gap-4">
          <InputWrapper label="Area Code" error={!formData.mobileAreaCode?.trim()} className="w-[30%]">
            <input type="text" name="mobileAreaCode" value={formData.mobileAreaCode || ''} onChange={handleChange} className={inputClass('mobileAreaCode')} placeholder="+971" />
          </InputWrapper>
          <InputWrapper label="Phone Number" error={!formData.mobilePhoneNumber?.trim()} className="flex-1">
            <input type="tel" name="mobilePhoneNumber" value={formData.mobilePhoneNumber || ''} onChange={handleChange} className={inputClass('mobilePhoneNumber')} />
          </InputWrapper>
        </div>

        <InputWrapper label="Personal Email Address" error={!formData.personalEmail?.trim()}>
          <input type="email" name="personalEmail" value={formData.personalEmail || ''} onChange={handleChange} className={inputClass('personalEmail')} placeholder="example@example.com" />
        </InputWrapper>

        <InputWrapper label="UOWD Email Address" error={!formData.uowdEmail?.trim()}>
          <input type="email" name="uowdEmail" value={formData.uowdEmail || ''} onChange={handleChange} className={inputClass('uowdEmail')} placeholder="example@uowdubai.ac.ae" />
        </InputWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputWrapper label="Nationality" error={!formData.nationality?.trim()}>
            <div className="relative">
              <select name="nationality" value={formData.nationality || ''} onChange={handleChange} className={selectClass('nationality')}>
                <option value="" disabled hidden>Select Nationality</option>
                {nationalities.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </InputWrapper>

          <InputWrapper label="Place of Birth" error={!formData.placeOfBirth?.trim()}>
            <div className="relative">
              <select name="placeOfBirth" value={formData.placeOfBirth || ''} onChange={handleChange} className={selectClass('placeOfBirth')}>
                <option value="" disabled hidden>Select Country</option>
                {nationalities.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </InputWrapper>
        </div>

        <InputWrapper label="Gender" error={!formData.gender?.trim()}>
          <div className="relative">
            <select name="gender" value={formData.gender || ''} onChange={handleChange} className={selectClass('gender')}>
              <option value="" disabled hidden>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </InputWrapper>

        <div className="pt-8 pb-2">
          <div className="mb-6">
            <h3 className="font-semibold text-lg text-foreground mb-1">Parents Information</h3>
            <p className="text-sm text-muted-foreground">This information is requested by the Immigration Office during the Visa Application process.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">Father's Name</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputWrapper label="First Name" error={!formData.fatherFirstName?.trim()}>
                  <input type="text" name="fatherFirstName" value={formData.fatherFirstName || ''} onChange={handleChange} className={inputClass('fatherFirstName')} />
                </InputWrapper>
                <InputWrapper label="Last Name" error={!formData.fatherLastName?.trim()}>
                  <input type="text" name="fatherLastName" value={formData.fatherLastName || ''} onChange={handleChange} className={inputClass('fatherLastName')} />
                </InputWrapper>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">Mother's Name</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputWrapper label="First Name" error={!formData.motherFirstName?.trim()}>
                  <input type="text" name="motherFirstName" value={formData.motherFirstName || ''} onChange={handleChange} className={inputClass('motherFirstName')} />
                </InputWrapper>
                <InputWrapper label="Last Name" error={!formData.motherLastName?.trim()}>
                  <input type="text" name="motherLastName" value={formData.motherLastName || ''} onChange={handleChange} className={inputClass('motherLastName')} />
                </InputWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FormFooter 
        onBack={handleBack}
        onContinue={handleContinue} 
      />
    </div>
  );
}
