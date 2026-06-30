import React from 'react';
import { cn } from './AuthInput';

const GoogleButton = ({ className, ...props }) => {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center gap-3 w-full px-6 py-3.5",
        "bg-white text-[#3c4043] font-medium text-sm rounded-full",
        "border border-gray-200 shadow-sm",
        "hover:shadow-md hover:bg-gray-50 active:bg-gray-100",
        "transition-all duration-200 cursor-pointer",
        className
      )}
      {...props}
    >
      {/* Google SVG Icon */}
      <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.09-6.09C34.46 3.08 29.53 1 24 1 14.82 1 6.97 6.42 3.19 14.23l7.1 5.51C12.15 13.34 17.61 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.65c-.55 2.97-2.2 5.48-4.68 7.17l7.18 5.57C43.36 37.46 46.52 31.45 46.52 24.5z"/>
        <path fill="#FBBC05" d="M10.29 28.26A14.51 14.51 0 0 1 9.5 24c0-1.48.25-2.92.69-4.26l-7.1-5.51A23.94 23.94 0 0 0 0 24c0 3.86.92 7.51 2.53 10.73l7.76-6.47z"/>
        <path fill="#34A853" d="M24 47c5.53 0 10.18-1.83 13.57-4.96l-7.18-5.57C28.57 37.88 26.42 38.5 24 38.5c-6.39 0-11.85-3.84-13.71-9.24l-7.76 6.47C6.97 41.58 14.82 47 24 47z"/>
      </svg>
      Continue with Google
    </button>
  );
};

export default GoogleButton;
