import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Bell, CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, dismissToast } = useNotifications();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white/95 backdrop-blur shadow-xl border border-forest-100 rounded-xl p-3.5 flex items-start gap-3 transition-all duration-300 animate-slide-up"
        >
          <div className="p-2 bg-leaf-100 text-leaf-700 rounded-lg flex-shrink-0 mt-0.5">
            {toast.type?.includes('reject') ? (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            ) : (
              <Bell className="w-4 h-4 text-forest-700" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-forest-900">{toast.title}</h4>
            <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{toast.message}</p>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 p-1 -mr-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
