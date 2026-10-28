import React from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#2B2B2B] p-4 rounded-2xl shadow-2xl border border-[#D4A373]/35 flex items-start gap-3 transform transition-all duration-300 animate-in slide-in-from-top-3 text-[#FAEDCD]"
        >
          <div className="p-1.5 rounded-full bg-[#1E1E1E] text-[#D4A373] shrink-0 mt-0.5 border border-[#D4A373]/30">
            {toast.type === 'info' ? (
              <ShoppingBag className="w-4 h-4 text-[#D4A373]" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#D4A373]" />
            )}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-headline font-bold text-[#FAEDCD]">{toast.title}</h4>
            {toast.description && (
              <p className="text-xs text-[#FAEDCD]/75 mt-0.5 font-sans-body">{toast.description}</p>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#FAEDCD]/40 hover:text-[#FAEDCD] transition-colors p-1 cursor-pointer"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
