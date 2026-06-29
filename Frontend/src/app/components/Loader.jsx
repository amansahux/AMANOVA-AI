import React from "react";

const Loader = () => {
  return (
    <>
      <style>{`
        @keyframes loader-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes loader-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.92); }
        }

        @keyframes loader-orbit {
          0%   { transform: rotate(0deg)   translateX(28px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(28px) rotate(-360deg); }
        }

        @keyframes loader-fade-in {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }

        .loader-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: absolute;
          z-index: 999;
          top: 45%;
          left: 48%;
          transform: translate(-50%, -50%);
          gap: 20px;
          animation: loader-fade-in 0.4s ease forwards;
        }

        .loader-ring-container {
          position: relative;
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 3px solid transparent;
          animation: loader-spin linear infinite;
        }

        .loader-ring-outer {
          border-top-color: #f9a825;
          border-right-color: #e65c00;
          animation-duration: 1.1s;
          filter: drop-shadow(0 0 8px rgba(249, 168, 37, 0.7));
        }

        .loader-ring-mid {
          inset: 10px;
          border-bottom-color: #ff6f00;
          border-left-color: #ffd54f;
          animation-duration: 0.8s;
          animation-direction: reverse;
          filter: drop-shadow(0 0 5px rgba(255, 111, 0, 0.5));
        }

        .loader-core {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #ffd54f, #e65c00);
          box-shadow: 0 0 14px rgba(230, 92, 0, 0.9), 0 0 28px rgba(249, 168, 37, 0.5);
          animation: loader-pulse 1.4s ease-in-out infinite;
        }

        .loader-orbit-dot {
          position: absolute;
          inset: 0;
          animation: loader-orbit 1.8s linear infinite;
        }

        .loader-orbit-dot::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 7px;
          height: 7px;
          margin: -3.5px 0 0 -3.5px;
          border-radius: 50%;
          background: #ffd54f;
          box-shadow: 0 0 8px rgba(255, 213, 79, 0.9);
        }

        .loader-text {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #e65c00, #f9d423, #e65c00);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="loader-wrapper">
        <div className="loader-ring-container">
          {/* Outer spinning ring */}
          <div className="loader-ring loader-ring-outer" />
          {/* Mid counter-spinning ring */}
          <div className="loader-ring loader-ring-mid" />
          {/* Orbiting dot */}
          {/* <div className="loader-orbit-dot" /> */}
          {/* Pulsing core */}
          <div className="loader-core" />
        </div>

        <span className="loader-text">Loading…</span>
      </div>
    </>
  );
};

export default Loader;
