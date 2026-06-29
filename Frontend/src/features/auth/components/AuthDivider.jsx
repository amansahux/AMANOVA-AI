import React from 'react';

const AuthDivider = ({ text }) => {
  return (
    <div className="relative flex items-center py-4">
      <div className="flex-grow border-t border-surface-container-high"></div>
      <span className="flex-shrink-0 mx-4 text-on-surface-variant text-sm font-semibold tracking-widest uppercase">
        {text}
      </span>
      <div className="flex-grow border-t border-surface-container-high"></div>
    </div>
  );
};

export default AuthDivider;
