'use client';

import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in max-w-sm">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl ${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white border-l-4 ${
          type === 'success' ? 'border-green-600' : 'border-red-600'
        }`}
      >
        {type === 'success' ? (
          <CheckCircle size={20} className="flex-shrink-0" />
        ) : (
          <XCircle size={20} className="flex-shrink-0" />
        )}
        <span className="font-medium flex-1">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-80 transition-opacity flex-shrink-0 p-1 rounded hover:bg-white hover:bg-opacity-20"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
