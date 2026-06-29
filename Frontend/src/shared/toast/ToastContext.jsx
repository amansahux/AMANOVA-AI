import { createContext, useCallback, useState, useRef } from "react";
import { createPortal } from "react-dom";

export const ToastContext = createContext(null);

// ─── Icons ────────────────────────────────────────────────────────────────────
const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.15)" />
    <path d="M7.5 12.5l3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.15)" />
    <path d="M12 8v4M12 16h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.15)" />
    <path d="M12 11v5M12 8h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ─── Toast styles per type ────────────────────────────────────────────────────
const typeConfig = {
  success: {
    icon: <SuccessIcon />,
    gradient: "linear-gradient(135deg, #e65c00 0%, #f9d423 100%)",
    border: "rgba(249, 212, 35, 0.3)",
    glow: "rgba(230, 92, 0, 0.4)",
    label: "Success",
  },
  error: {
    icon: <ErrorIcon />,
    gradient: "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)",
    border: "rgba(231, 76, 60, 0.4)",
    glow: "rgba(192, 57, 43, 0.4)",
    label: "Error",
  },
  info: {
    icon: <InfoIcon />,
    gradient: "linear-gradient(135deg, #e65c00 0%, #f9a825 100%)",
    border: "rgba(249, 168, 37, 0.35)",
    glow: "rgba(230, 92, 0, 0.35)",
    label: "Info",
  },
};

// ─── Single Toast component ───────────────────────────────────────────────────
const Toast = ({ id, type = "info", message, onRemove }) => {
  const config = typeConfig[type] || typeConfig.info;

  return (
    <div
      style={{
        background: config.gradient,
        border: `1px solid ${config.border}`,
        boxShadow: `0 8px 32px ${config.glow}, 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)`,
        backdropFilter: "blur(12px)",
        borderRadius: "14px",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        minWidth: "300px",
        maxWidth: "420px",
        animation: "toast-slide-up 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Sheen overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "50%",
        background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)",
        borderRadius: "14px 14px 0 0",
        pointerEvents: "none",
      }} />

      {/* Icon */}
      <div style={{ flexShrink: 0, filter: "drop-shadow(0 0 6px rgba(255,255,255,0.4))" }}>
        {config.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          margin: 0,
          fontSize: "14px",
          fontWeight: "500",
          color: "rgba(255,255,255,0.9)",
          fontFamily: "'Inter', sans-serif",
          lineHeight: "1.4",
          wordBreak: "break-word",
        }}>
          {message}
        </p>
      </div>

      {/* Close button */}
      <button
        onClick={() => onRemove(id)}
        style={{
          flexShrink: 0,
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "6px",
          padding: "4px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

// ─── Provider ─────────────────────────────────────────────────────────────────
let _id = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const removeToast = useCallback((id) => {
    clearTimeout(timers.current[id]);
    delete timers.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = ++_id;
    setToasts((prev) => [...prev, { id, message, type }]);
    timers.current[id] = setTimeout(() => removeToast(id), duration);
    return id;
  }, [removeToast]);

  const toast = {
    success: (msg, duration) => addToast(msg, "success", duration),
    error:   (msg, duration) => addToast(msg, "error",   duration),
    info:    (msg, duration) => addToast(msg, "info",    duration),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Keyframe injection */}
      <style>{`
        @keyframes toast-slide-up {
          from { opacity: 0; transform: translateY(24px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>

      {/* Portal renderer — bottom center */}
      {createPortal(
        <div style={{
          position: "fixed",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          zIndex: 9999,
          pointerEvents: "none",
        }}>
          {toasts.map((t) => (
            <div key={t.id} style={{ pointerEvents: "auto" }}>
              <Toast id={t.id} type={t.type} message={t.message} onRemove={removeToast} />
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
