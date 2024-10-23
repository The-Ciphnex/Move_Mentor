import React from 'react';

interface DialogProps {
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ children }) => (
  <div className="dialog">{children}</div>
);

interface DialogTriggerProps {
  children: React.ReactNode;
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({ children }) => (
  <button className="dialog-trigger">{children}</button>
);

interface DialogContentProps {
  children: React.ReactNode;
}

export const DialogContent: React.FC<DialogContentProps> = ({ children }) => (
  <div className="dialog-content">{children}</div>
);

interface DialogHeaderProps {
  children: React.ReactNode;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => (
  <div className="dialog-header">{children}</div>
);

interface DialogTitleProps {
  children: React.ReactNode;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => (
  <h2 className="dialog-title">{children}</h2>
);

interface DialogDescriptionProps {
  children: React.ReactNode;
}

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ children }) => (
  <p className="dialog-description">{children}</p>
);

interface DialogFooterProps {
  children: React.ReactNode;
}

export const DialogFooter: React.FC<DialogFooterProps> = ({ children }) => (
  <div className="dialog-footer">{children}</div>
);
