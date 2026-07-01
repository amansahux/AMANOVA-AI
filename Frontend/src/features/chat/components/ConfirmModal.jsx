import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Generic confirm modal — reusable for any destructive / important action.
 *
 * Props:
 *  icon         ReactNode   — Lucide icon element (sized + colored by caller)
 *  iconBg       string      — Tailwind bg class for the icon badge, e.g. "bg-red-500/10"
 *  iconBorder   string      — Tailwind border class for the icon badge, e.g. "border-red-500/20"
 *  title        string      — Bold heading text
 *  description  ReactNode   — Sub-text (can include <span> for highlights)
 *  cancelLabel  string      — Cancel button label (default: "Cancel")
 *  confirmLabel string      — Confirm button label (default: "Confirm")
 *  confirmClass string      — Tailwind classes for the confirm button (caller controls colour)
 *  onConfirm    () => void  — Called when user clicks the confirm button
 *  onCancel     () => void  — Called when user clicks Cancel or the backdrop
 */
const ConfirmModal = memo(({
  icon,
  iconBg = "bg-[#FFBA44]/10",
  iconBorder = "border-[#FFBA44]/20",
  title = "Are you sure?",
  description,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  confirmClass = "bg-[#FFBA44] hover:bg-[#ffca6e] text-[#050505] border-[#FFBA44]/40 hover:shadow-[0_4px_14px_rgba(255,186,68,0.35)]",
  onConfirm,
  onCancel,
}) => (
  <AnimatePresence>
    {/* Backdrop */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onCancel}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 12 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-[#2a2a2a] bg-[#131313] shadow-[0_24px_60px_rgba(0,0,0,0.6)] p-6 flex flex-col gap-5"
      >
        {/* Icon badge */}
        <div className="flex items-center justify-center">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${iconBg} ${iconBorder}`}>
            {icon}
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-1.5">
          <h2 className="text-[#e5e2e1] text-base font-semibold">{title}</h2>
          <div className="text-[#a98a7f] text-sm leading-relaxed">{description}</div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            className="flex-1 cursor-pointer py-2.5 rounded-xl text-sm font-medium text-[#a98a7f] bg-[#1c1b1b] border border-[#2a2a2a] hover:bg-[#201f1f] hover:text-[#e5e2e1] hover:border-[#353534] transition-all duration-150"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 cursor-pointer py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150 ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
));

ConfirmModal.displayName = "ConfirmModal";
export default ConfirmModal;
