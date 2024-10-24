// components/ui/select.tsx
import React, { useState, ReactNode } from 'react';

interface SelectProps {
  children: React.ReactNode;
  onValueChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ children, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <div className="select">
      <SelectTrigger id="select-trigger">
        <SelectValue placeholder="Select a bus" value={selectedValue} />
      </SelectTrigger>
      <SelectContent onSelect={handleSelect}>{children}</SelectContent>
    </div>
  );
};

interface SelectTriggerProps {
  id: string;
  children: React.ReactNode;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ id, children }) => {
  return (
    <button id={id} className="select-trigger">
      {children}
    </button>
  );
};

interface SelectValueProps {
  placeholder: string;
  value: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder, value }) => {
  return <span className="select-value">{value || placeholder}</span>;
};

interface SelectContentProps {
  children: React.ReactNode;
  onSelect: (value: string) => void;
}

export const SelectContent: React.FC<SelectContentProps> = ({ children, onSelect }) => {
  return (
    <div className="select-content">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const newProps = { onClick: () => onSelect((child.props as SelectItemProps).value) };
          return React.cloneElement(child, newProps);
        }
        return child;
      })}
    </div>
  );
};

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => {
  return (
    <div className="select-item" data-value={value}>
      {children}
    </div>
  );
};
