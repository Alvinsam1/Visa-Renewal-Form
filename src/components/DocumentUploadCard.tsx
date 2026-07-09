import React, { useRef } from 'react';
import { cn } from '../lib/utils';
import { UploadCloud, File as FileIcon, X, CheckCircle2 } from 'lucide-react';

interface DocumentUploadCardProps {
  id: string;
  name: string;
  file?: File;
  fileName?: string;
  onFileSelect: (file: File | null) => void;
  className?: string;
}

export function DocumentUploadCard({ id, name, file, fileName, onFileSelect, className }: DocumentUploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const displayFileName = file?.name || fileName;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div 
      className={cn(
        "relative rounded-2xl border-2 p-5 transition-all duration-200",
        displayFileName 
          ? "border-primary/30 bg-primary/5" 
          : "border-dashed border-border bg-card hover:border-primary/50 hover:bg-secondary/50",
        className
      )}
      onClick={() => !displayFileName && inputRef.current?.click()}
      data-testid={`upload-${id}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFileChange}
      />
      
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 overflow-hidden">
          <div className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors",
            displayFileName ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
          )}>
            {displayFileName ? <FileIcon className="h-5 w-5" /> : <UploadCloud className="h-6 w-6" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate">{name}</p>
            <p className="text-sm text-muted-foreground truncate mt-0.5">
              {displayFileName ? displayFileName : "PDF, JPG, or PNG up to 10MB"}
            </p>
          </div>
        </div>
        
        {displayFileName ? (
          <div className="flex items-center gap-3 shrink-0">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <button
              onClick={handleRemove}
              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
              title="Remove file"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <button className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-full transition-colors shrink-0">
            Browse
          </button>
        )}
      </div>
    </div>
  );
}
