import React from 'react';
import { ORDER_STATUS_STEPS } from '../../utils/constants';
import { Check, Clock, AlertTriangle } from 'lucide-react';

export default function OrderProgressTracker({ currentStatus, timeline = [] }) {
  const isCancelled = currentStatus === 'cancelled';
  const isIssue = currentStatus === 'issue_reported';

  const getStepIndex = (status) => {
    return ORDER_STATUS_STEPS.findIndex(step => step.key === status);
  };

  const currentIndex = getStepIndex(currentStatus);

  if (isCancelled || isIssue) {
    return (
      <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
        isCancelled ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-amber-50 border-amber-200 text-amber-800'
      }`}>
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <div>
          <h4 className="font-bold text-sm">
            {isCancelled ? 'Order Has Been Cancelled' : 'Attention: Issue Reported On Shipment'}
          </h4>
          <p className="text-xs mt-0.5">
            {isCancelled
              ? 'This order was aborted. Any pending escrow holds will be refunded.'
              : 'Our operations team is actively coordinating with the carrier and farmer.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4">
      {/* Horizontal Steps Bar */}
      <div className="relative">
        <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-cream-300 -translate-y-1/2 z-0"></div>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 relative z-10">
          {ORDER_STATUS_STEPS.map((step, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            const logEntry = timeline.find(t => t.status === step.key);

            return (
              <div key={step.key} className="flex flex-col items-center text-center">
                {/* Circle Icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                    isCurrent
                      ? 'bg-forest-900 text-white ring-4 ring-leaf-200 ring-offset-2'
                      : isCompleted
                      ? 'bg-leaf-600 text-white'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                </div>

                {/* Step Text */}
                <span className={`text-xs mt-2 font-bold line-clamp-1 ${
                  isCurrent ? 'text-forest-950 font-extrabold' : isCompleted ? 'text-forest-800' : 'text-slate-400'
                }`}>
                  {step.label}
                </span>

                {logEntry && (
                  <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                    {logEntry.time}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
