import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatDate } from '../../utils/formatters';
import { AlertTriangle, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export default function ComplaintsManager() {
  const { complaints, resolveComplaint } = useMarketplace();
  const [resolvingId, setResolvingId] = useState(null);
  const [resolutionText, setResolutionText] = useState('');

  const handleResolve = (e) => {
    e.preventDefault();
    if (resolvingId) {
      resolveComplaint(resolvingId, resolutionText || 'Issue mediated and closed by administration.');
      setResolvingId(null);
      setResolutionText('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          User Dispute & Grievance Mediation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Investigate reported logistics delays, weight discrepancies, and documentation holdups.
        </p>
      </div>

      <div className="space-y-4">
        {complaints.length === 0 ? (
          <div className="bg-white rounded-3xl border border-cream-200 p-12 text-center text-slate-400 text-xs">
            No complaints logged.
          </div>
        ) : (
          complaints.map(comp => (
            <div
              key={comp.id}
              className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`p-1.5 rounded-lg ${
                    comp.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {comp.status === 'resolved' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  </span>
                  <div>
                    <h3 className="font-bold text-forest-950 text-sm">{comp.category}</h3>
                    <p className="text-[11px] text-slate-500">
                      Filed by: <strong>{comp.submitterName}</strong> • Date: {formatDate(comp.createdAt)}
                      {comp.relatedOrderId && ` • Related Order: #${comp.relatedOrderId}`}
                    </p>
                  </div>
                </div>

                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                    comp.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {comp.status}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-700 bg-cream-50 p-3.5 rounded-2xl border border-cream-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  User Report Statement:
                </span>
                <p className="leading-relaxed">"{comp.description}"</p>
              </div>

              {comp.resolutionNote && (
                <div className="text-xs text-emerald-900 bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-0.5">
                    Platform Resolution Recorded:
                  </span>
                  <p>{comp.resolutionNote}</p>
                </div>
              )}

              {comp.status === 'pending' && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      setResolvingId(comp.id);
                      setResolutionText('');
                    }}
                    className="px-4 py-2 bg-leaf-600 hover:bg-leaf-700 text-white rounded-xl text-xs font-bold transition shadow"
                  >
                    Resolve & Mediate Ticket
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Resolution Modal */}
      {resolvingId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-forest-950 text-base">Record Mediation Resolution</h3>
            <textarea
              rows={4}
              required
              value={resolutionText}
              onChange={(e) => setResolutionText(e.target.value)}
              placeholder="Detail actions taken with parties (e.g. carrier compensated buyer ৳500 for transit packaging, or farmer verified)..."
              className="w-full text-xs border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setResolvingId(null)}
                className="px-3 py-1.5 text-xs text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResolve}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow"
              >
                Mark Ticket Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
