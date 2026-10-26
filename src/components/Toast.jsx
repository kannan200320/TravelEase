import { useBooking } from '../context/BookingContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useBooking();

  if (!toasts.length) return null;

  // Enforce strictly one popup message visible at any time
  const currentToast = toasts[toasts.length - 1];
  if (!currentToast) return null;

  const isSuccess = currentToast.type === 'success';
  const isWarning = currentToast.type === 'warning';

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full pointer-events-none p-4">
      <div
        key={currentToast.id}
        className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3 fade-in ${
          isSuccess
            ? 'bg-emerald-950/95 text-emerald-100 border-emerald-500/40'
            : isWarning
            ? 'bg-amber-950/95 text-amber-100 border-amber-500/40'
            : 'bg-slate-900/95 text-slate-100 border-slate-700/60'
        }`}
      >
        <div className="shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isWarning && <AlertCircle className="w-5 h-5 text-amber-400" />}
          {!isSuccess && !isWarning && <Info className="w-5 h-5 text-[#F7C5CC]" />}
        </div>
        <div className="text-sm font-medium leading-relaxed flex-1">
          {currentToast.message}
        </div>
        <button
          onClick={() => removeToast(currentToast.id)}
          className="shrink-0 text-slate-400 hover:text-white transition-colors cursor-pointer p-0.5"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ToastContainer;
