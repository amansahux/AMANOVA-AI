import React from 'react';
import AuthPageImage from '../assets/AuthageImage.png';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="bg-background flex flex-col md:flex-row w-full md:h-screen md:overflow-hidden">
      {/* Image Section - static/sticky on desktop, normal on mobile */}
      <div className="w-full md:w-1/2 relative h-[40vh] md:h-full shrink-0 md:sticky md:top-0">
        <img 
          src={AuthPageImage} 
          alt="Authentication Branding" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background to-transparent md:to-background/30" />
      </div>

      {/* Form Section - scrollable on desktop, normal on mobile */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-24 relative md:overflow-y-auto md:h-full min-h-[60vh]">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-glow/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10 flex flex-col gap-8 py-8">
          <div className="space-y-3">
            <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold tracking-tight text-on-surface uppercase">
              {title}
            </h1>
            {subtitle && (
              <p className="text-on-surface-variant text-lg">
                {subtitle}
              </p>
            )}
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
