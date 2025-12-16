import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = `
    px-8 py-3
    font-medium text-sm uppercase tracking-wider
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    relative
  `;

  const variants = {
    primary: `
      bg-black text-white
      hover:bg-[#C9A56B] hover:text-white
      border-2 border-black hover:border-[#C9A56B]
    `,
    secondary: `
      bg-[#C9A56B] text-white
      hover:bg-black hover:text-white
      border-2 border-[#C9A56B] hover:border-black
    `,
    outline: `
      bg-transparent text-black
      border-2 border-black
      hover:bg-black hover:text-white
    `,
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
