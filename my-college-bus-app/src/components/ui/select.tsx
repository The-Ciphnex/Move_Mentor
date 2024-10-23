import React, { useState } from 'react';

interface SelectProps {
  children: React.ReactNode;
  onValueChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ children, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <div>
      <SelectTrigger value={selectedValue} />
      <SelectContent onChange={handleChange}>{children}</SelectContent>
    </div>
  );
};

interface SelectTriggerProps {
  value: string;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ value }) => (
  <div className="select-trigger">{value || 'Select...'}</div>
);

interface SelectContentProps {
  children: React.ReactNode;
  onChange: (value: string) => void;
}

export const SelectContent: React.FC<SelectContentProps> = ({ children, onChange }) => (
  <div className="select-content">
    {React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { onChange });
      }
      return child;
    })}
  </div>
);

interface SelectItemProps {
  value: string;
  onChange: (value: string) => void;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, onChange, children }) => (
  <div className="select-item" onClick={() => onChange(value)}>
    {children}
  </div>
);
