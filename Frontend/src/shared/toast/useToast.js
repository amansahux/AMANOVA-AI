import { useContext } from "react";
import { ToastContext } from "./ToastContext";

/**
 * useToast — returns { success, error, info } toast fire functions.
 *
 * Usage:
 *   const toast = useToast();
 *   toast.success("Logged in successfully!");
 *   toast.error("Something went wrong.");
 */
const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};

export default useToast;
