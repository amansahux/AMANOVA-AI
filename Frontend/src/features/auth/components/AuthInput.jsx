import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const AuthInput = React.forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && (
        <label className="text-sm font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "bg-[#FEFEFE] border-b-2 border-[#ADABAA] px-4 py-3 text-[#5F5E5E] placeholder:text-[#ADABAA] focus:outline-none focus:border-primary transition-colors duration-300 w-full",
          error && "border-error focus:border-error",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-xs text-error mt-1">{error}</span>
      )}
    </div>
  );
});

AuthInput.displayName = 'AuthInput';

export default AuthInput;
