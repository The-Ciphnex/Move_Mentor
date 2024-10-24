// src/components/ui/dialog.tsx
import React, { useState } from 'react';
import './dialog.css';

export const Dialog = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="dialog-trigger" onClick={() => setIsOpen(true)}>
        Open Dialog
      </button>

      {isOpen && (
        <div className="dialog-overlay" onClick={() => setIsOpen(false)}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3>Dialog Title</h3>
            </div>
            <div className="dialog-body">{children}</div>
            <div className="dialog-footer">
              <button className="dialog-close" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
