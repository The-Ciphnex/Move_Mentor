import React, { useState } from 'react';

interface SelectProps {
  children: React.ReactNode;
  onValueChange: (value: string) => void;
}

interface SelectTriggerProps {
  value: string;
}

interface SelectContentProps {
  children: React.ReactNode;
  onSelect: (value: string) => void;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  onClick?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ children, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <div>
      <SelectTrigger value={selectedValue} />
      <SelectContent onSelect={handleSelect}>{children}</SelectContent>
    </div>
  );
};

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ value }) => (
  <div className="select-trigger">{value || 'Select...'}</div>
);

export const SelectContent: React.FC<SelectContentProps> = ({ children, onSelect }) => (
  <div className="select-content">
    {React.Children.map(children, (child) => {
      if (React.isValidElement<SelectItemProps>(child)) {
        return React.cloneElement(child, {
          onClick: onSelect,
        } as Partial<SelectItemProps>);
      }
      return child;
    })}
  </div>
);

export const SelectItem: React.FC<SelectItemProps> = ({ value, onClick, children }) => (
  <div className="select-item" onClick={() => onClick?.(value)}>
    {children}
  </div>
);