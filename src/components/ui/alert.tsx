import React from 'react';

interface AlertProps {
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'destructive';
  children?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ message, type = 'success', children }) => {
  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'destructive':
        return 'bg-red-100 border-red-500 text-red-700';
      default:
        return '';
    }
  };

  return (
    <div className={`border-l-4 p-4 ${getAlertStyle(type)}`} role="alert">
      {message && <p>{message}</p>}
      {children}
    </div>
  );
};

interface AlertDescriptionProps {
  children: React.ReactNode;
}

const AlertDescription: React.FC<AlertDescriptionProps> = ({ children }) => {
  return <p className="text-sm text-gray-600">{children}</p>;
};

interface AlertTitleProps {
  children: React.ReactNode;
}

const AlertTitle: React.FC<AlertTitleProps> = ({ children }) => {
  return <h3 className="text-lg font-bold">{children}</h3>;
};

export { Alert, AlertDescription, AlertTitle };
