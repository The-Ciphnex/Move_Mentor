import React, { useState, useEffect, ReactNode } from 'react';

interface TabsProps {
  children: React.ReactNode;
  defaultValue: string;
}

export const Tabs: React.FC<TabsProps> = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    setActiveTab(defaultValue);
  }, [defaultValue]);

  return (
    <div>
      <TabsList>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && typeof child.props.value === 'string') {
            return (
              <TabsTrigger
                isActive={activeTab === child.props.value}
                onClick={() => handleTabClick(child.props.value)}
                value={child.props.value}
              >
                {child.props.children}
              </TabsTrigger>
            );
          }
          return null;
        })}
      </TabsList>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && activeTab === child.props.value) {
          return <TabsContent>{child.props.children}</TabsContent>;
        }
        return null;
      })}
    </div>
  );
};

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => (
  <div className={`flex border-b ${className}`}>{children}</div>
);

interface TabsTriggerProps {
  isActive?: boolean;
  onClick?: () => void;
  value: string;
  children: ReactNode;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ isActive, onClick, value, children }) => (
  <button
    className={`p-4 ${isActive ? 'border-b-2 border-blue-500' : ''}`}
    onClick={onClick}
    data-value={value}
  >
    {children}
  </button>
);

interface TabsContentProps {
  value: string;
  children: ReactNode;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => (
  <div className="p-4">{children}</div>
);
