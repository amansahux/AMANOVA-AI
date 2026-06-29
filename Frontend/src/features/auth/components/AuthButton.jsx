import React from 'react';
import { cn } from './AuthInput';
import { Loader2 } from 'lucide-react';

const AuthButton = React.forwardRef(({ className, children, loading, disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      disabled={loading || disabled}
      className={cn(
        "flex items-center justify-center w-full px-6 py-4 bg-primary text-on-primary font-semibold rounded-sm transition-all duration-300",
        "hover:drop-shadow-[0_0_20px_rgba(255,106,43,0.4)] disabled:opacity-70 disabled:hover:drop-shadow-none disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin mr-2" size={20} />
      ) : null}
      {children}
    </button>
  );
});

AuthButton.displayName = 'AuthButton';

export default AuthButton;
