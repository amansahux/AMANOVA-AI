import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from './AuthInput';

const PasswordInput = React.forwardRef(({ className, label, error, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && (
        <label className="text-sm font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={cn(
            "bg-[#FEFEFE] border-b-2 border-[#ADABAA] px-4 py-3 pr-12 text-[#5F5E5E] placeholder:text-[#ADABAA] focus:outline-none focus:border-primary transition-colors duration-300 w-full",
            error && "border-error focus:border-error",
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && (
        <span className="text-xs text-error mt-1">{error}</span>
      )}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
