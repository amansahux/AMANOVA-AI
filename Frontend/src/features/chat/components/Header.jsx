import React, { memo } from "react";
import { Share2, MoreHorizontal, Menu, Sparkles } from "lucide-react";

const Header = ({ currentChatTitle, onMenuToggle }) => {
  return (
    <header className="flex-none flex items-center justify-between px-4 h-14 shrink-0 bg-[#050505]/90 backdrop-blur-xl border-b border-[#201f1f] z-10">

      {/* Left: Logo + Mobile Menu */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg text-[#a98a7f] hover:bg-[#1c1b1b] hover:text-[#e5e2e1] transition-all duration-150"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br from-[#FFBA44] to-[#ff7d3c]">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="hidden sm:block font-semibold text-sm tracking-tight text-[#e5e2e1]">
            AMANOVA AI
          </span>
        </div>
      </div>

      {/* Center: Chat Title */}
      <div className="flex-1 flex items-center justify-center px-4">
        {currentChatTitle && (
          <h1 className="text-xs font-medium text-center text-[#a3a3a397]">
            {currentChatTitle}
          </h1>
        )}
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center gap-1.5">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#a98a7f] border border-[#2a2a2a] hover:bg-[#1c1b1b] hover:text-[#e5e2e1] hover:border-[#353534] transition-all duration-150">
          <Share2 size={13} />
          <span className="hidden sm:inline">Share</span>
        </button>

        <button className="p-2 rounded-lg text-[#a98a7f] hover:bg-[#1c1b1b] hover:text-[#e5e2e1] transition-all duration-150">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </header>
  );
};

export default memo(Header);
