import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center';
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : children}
    </button>
  );
}