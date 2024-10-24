import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`shadow-md p-4 rounded-lg bg-white ${className}`}>
      {children}
    </div>
  );
};

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = '' }) => {
  return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>;
};

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return <div className={`p-4 border-b ${className}`}>{children}</div>;
};

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
  return <h2 className={`text-lg font-bold ${className}`}>{children}</h2>;
};

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
