import React from 'react';
import { AlertCircle } from 'lucide-react';

const AuthError = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="flex items-center gap-3 p-4 bg-error-container/20 border border-error/50 rounded-sm text-error mb-6">
      <AlertCircle size={20} className="shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default AuthError;
