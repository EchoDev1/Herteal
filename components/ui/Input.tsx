import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-charcoal"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          px-4 py-3 border border-light-gray rounded-none
          focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
          transition-all duration-300
          placeholder:text-soft-gray
          text-gray-900 bg-white
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}
