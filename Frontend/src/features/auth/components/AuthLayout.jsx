import React from 'react';
import AuthPageImage from '../assets/AuthageImage.png';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="bg-background flex flex-col md:flex-row w-full md:h-screen md:overflow-hidden">

      {/* ── LEFT HALF: Image + Text Overlay ── */}
      <div className="w-full md:w-1/2 relative h-[50vh] md:h-full shrink-0 md:sticky md:top-0 overflow-hidden border-r border-[#b2b2b263]">
        {/* Background Image */}
        <img
          src={AuthPageImage}
          alt="Amanova AI Branding"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark gradient overlay — stronger at bottom for text readability */}
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 55%, rgba(5,5,5,0.95) 100%)',
          }}
        />
        {/* Side fade towards the form panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60" />

        {/* ── Branding Text (overlaid on image, bottom-left) ── */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 flex flex-col gap-4 z-10">

          {/* Logo row */}
          <div className="flex items-center gap-3">
            {/* <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #ff6a2b, #ffb940)', boxShadow: '0 4px 20px rgba(255,106,43,0.45)' }}
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div> */}
            <span className="text-white font-extrabold text-xl tracking-widest uppercase"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>
              Amanova AI
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-white font-extrabold leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}>
            Your Intelligent<br />
            <span style={{ backgroundImage: 'linear-gradient(90deg, #ff6a2b, #ffb940)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AI Workspace
            </span>
          </h2>

          {/* Tagline */}
          <p className="text-white/65 text-sm leading-relaxed max-w-xs hidden md:block"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
            Create, chat, research and build with the next generation of AI.
          </p>
        </div>
      </div>

      {/* ── RIGHT HALF: Form Section ── */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10 md:p-16 relative md:overflow-y-auto md:h-full min-h-[60vh]">

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10 flex flex-col gap-8 py-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
              {title}
            </h1>
            {subtitle && (
              <p className="text-on-surface-variant text-base">
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


