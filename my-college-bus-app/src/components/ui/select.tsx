// components/ui/select.tsx
import React from 'react';

// Select Component
export const Select = ({ children }: { children: React.ReactNode }) => {
  return <div className="select">{children}</div>;
};

// SelectTrigger Component
export const SelectTrigger = ({ id, children }: { id: string, children: React.ReactNode }) => {
  return (
    <button id={id} className="select-trigger">
      {children}
    </button>
  );
};

// SelectValue Component
export const SelectValue = ({ placeholder }: { placeholder: string }) => {
  return <span className="select-value">{placeholder}</span>;
};

// SelectContent Component
export const SelectContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="select-content">{children}</div>;
};

// SelectItem Component
export const SelectItem = ({ value, children }: { value: string, children: React.ReactNode }) => {
  return (
    <div className="select-item" data-value={value}>
      {children}
    </div>
  );
};
