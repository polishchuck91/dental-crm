import React, { useEffect, useRef, useState } from 'react';

type OptionType = {
  label: string;
  value: string;
};

interface AutocompleteFieldProps {
  label: string;
  options: OptionType[];
  value: OptionType | null;
  onChange: (value: OptionType | null) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  isLoading?: boolean;
  renderOption?: (option: OptionType) => React.ReactNode;
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  label,
  options,
  value,
  onChange,
  inputValue,
  onInputChange,
  isLoading,
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: OptionType) => {
    onChange(option);
    onInputChange(option.label);
    setIsOpen(false);
  };

  return (
    <div className="w-full" ref={wrapperRef}>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={inputValue}
        onChange={(e) => {
          onInputChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <ul className="relative z-10 mt-1 max-h-60 overflow-y-auto rounded border border-gray-300 bg-white">
          {isLoading ? (
            <li className="px-3 py-2 italic text-gray-500">Завантаження...</li>
          ) : options.length === 0 ? (
            <li className="px-3 py-2 italic text-gray-500">
              Нічого не знайдено
            </li>
          ) : (
            options.map((option) => (
              <li
                key={option.value}
                className="cursor-pointer px-3 py-2 hover:bg-blue-100"
                onClick={() => handleSelect(option)}
              >
                {renderOption ? renderOption(option) : option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteField;
