import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

type ToastProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-md ${
        type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
      }`}
      role="alert"
      aria-live="assertive"
    >
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
      ) : (
        <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
      )}
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
