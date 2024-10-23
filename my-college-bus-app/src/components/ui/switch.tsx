import React, { useState, useEffect } from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, id }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  // Ensure the checked state is in sync with the prop
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <button
      onClick={handleToggle}
      id={id}
      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${isChecked ? 'bg-blue-500' : ''}`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isChecked ? 'translate-x-6' : ''}`}
      />
    </button>
  );
};

export { Switch };
