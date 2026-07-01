import React, { memo } from "react";
import { Share2, MoreHorizontal, Menu, Sparkles } from "lucide-react";

const Header = ({ currentChatTitle, onMenuToggle }) => {
  return (
    <header
      className="flex-none flex items-center justify-between px-4 h-14 shrink-0"
      style={{
        backgroundColor: "rgba(5,5,5,0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #201f1f",
        zIndex: 10,
      }}
    >
      {/* Left: Logo + Mobile Menu */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg transition-all duration-150"
          style={{ color: "#a98a7f" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1c1b1b";
            e.currentTarget.style.color = "#e5e2e1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#a98a7f";
          }}
        >
          <Menu size={20} />
        </button>

        {/* Logo - visible on desktop always, on mobile when no chat title */}
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background:
                "linear-gradient(135deg, #FFBA44 0%, #ff7d3c 100%)",
            }}
          >
            <Sparkles size={14} className="text-white" />
          </div>
          <span
            className="font-semibold text-sm tracking-tight hidden sm:block"
            style={{ color: "#e5e2e1" }}
          >
            AMANOVA AI
          </span>
        </div>
      </div>

      {/* Center: Chat Title */}
      <div className="flex-1 flex items-center justify-center px-4">
        {currentChatTitle && (
          <h1
            className="text-sm font-medium truncate max-w-xs text-center"
            style={{ color: "#e5e2e1" }}
          >
            {currentChatTitle}
          </h1>
        )}
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
          style={{
            color: "#a98a7f",
            border: "1px solid #2a2a2a",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1c1b1b";
            e.currentTarget.style.color = "#e5e2e1";
            e.currentTarget.style.borderColor = "#353534";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#a98a7f";
            e.currentTarget.style.borderColor = "#2a2a2a";
          }}
        >
          <Share2 size={13} />
          <span className="hidden sm:inline">Share</span>
        </button>

        <button
          className="p-2 rounded-lg transition-all duration-150"
          style={{ color: "#a98a7f" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1c1b1b";
            e.currentTarget.style.color = "#e5e2e1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#a98a7f";
          }}
        >
          <MoreHorizontal size={18} />
        </button>
      </div>
    </header>
  );
};

export default memo(Header);
