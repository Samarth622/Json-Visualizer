import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import type { Toast as ToastType } from '../hooks/useToast';

interface ToastProps {
  toasts: ToastType[];
  onClose: (id: string) => void;
}

export function Toast({ toasts, onClose }: ToastProps) {
  const getIcon = (type: ToastType['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
    }
  };

  const getColorClasses = (type: ToastType['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/90 text-white';
      case 'error':
        return 'bg-red-500/90 text-white';
      case 'info':
        return 'bg-blue-500/90 text-white';
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
              ${getColorClasses(toast.type)}
              pointer-events-auto min-w-[300px] max-w-[500px]
            `}
          >
            <div className="shrink-0">
              {getIcon(toast.type)}
            </div>
            <p className="flex-1">{toast.message}</p>
            <button
              onClick={() => onClose(toast.id)}
              className="shrink-0 hover:opacity-70 transition-opacity"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
