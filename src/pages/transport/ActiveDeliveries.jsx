import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT } from '../../utils/formatters';
import StatusBadge from '../../components/common/StatusBadge';
import {
  Truck,
  MapPin,
  Calendar,
  CheckCircle2,
  PackageCheck,
  AlertTriangle,
  Clock
} from 'lucide-react';

export default function ActiveDeliveries() {
  const { currentUser } = useAuth();
  const { deliveries, advanceDeliveryStatus } = useMarketplace();

  const [issueNote, setIssueNote] = useState('');
  const [issueModalJob, setIssueModalJob] = useState(null);

  const myDeliveries = deliveries.filter(d => d.transportPartnerId === currentUser.id);

  const handleNextStatus = (job) => {
    let next = 'in_transit';
    let note = '';

    if (job.status === 'pickup_scheduled') {
      next = 'picked_up';
      note = 'Goods weighed, verified, and loaded onto vehicle at farm';
    } else if (job.status === 'picked_up') {
      next = 'in_transit';
      note = 'Vehicle departed farm and is on national highway';
    } else if (job.status === 'in_transit') {
      next = 'delivered';
      note = 'Vehicle arrived at buyer destination and cargo offloaded';
    }

    advanceDeliveryStatus(job.id, next, note);
  };

  const handleReportIssue = (e) => {
    e.preventDefault();
    if (issueModalJob) {
      advanceDeliveryStatus(issueModalJob.id, 'issue_reported', issueNote || 'Transit delay or vehicle issue');
      setIssueModalJob(null);
      setIssueNote('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          My Active Cargo Shipments
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Update your transit milestones to notify both the farmer and buyer in real time.
        </p>
      </div>

      {myDeliveries.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-200 p-12 text-center text-slate-500 text-xs">
          You have no assigned shipments. Check the Available Jobs pool to claim deliveries.
        </div>
      ) : (
        <div className="space-y-6">
          {myDeliveries.map(job => {
            const isDelivered = job.status === 'delivered';
            const isIssue = job.status === 'issue_reported';

            return (
              <div
                key={job.id}
                className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream-200 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-forest-950 text-base">{job.cargoDescription}</span>
                      <StatusBadge status={job.status} />
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Delivery Job ID: #{job.id} • Order: #{job.orderId}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-forest-950">{formatBDT(job.fee)}</span>
                    <span className="text-[10px] text-slate-400 block">Freight payout upon delivery</span>
                  </div>
                </div>

                {/* Route Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-cream-50 p-4 rounded-2xl border border-cream-200 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <MapPin className="w-4 h-4 text-leaf-600" />
                      <span>Origin Pickup Point:</span>
                    </div>
                    <p className="text-slate-700 pl-5">{job.pickupAddress}</p>
                    <p className="text-[11px] text-slate-500 pl-5">Date: {job.pickupDate}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>Destination Consignee:</span>
                    </div>
                    <p className="text-slate-700 pl-5">{job.dropoffAddress}</p>
                  </div>
                </div>

                {/* Milestone Controller */}
                {!isDelivered && !isIssue && (
                  <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs space-y-0.5">
                      <span className="font-bold text-indigo-950 block">Next Required Action:</span>
                      <p className="text-indigo-800">
                        {job.status === 'pickup_scheduled' && 'Drive to farm gate and verify package weight.'}
                        {job.status === 'picked_up' && 'Cargo is loaded. Mark in-transit when departing on highway.'}
                        {job.status === 'in_transit' && 'Vehicle en route. Mark delivered upon reaching destination.'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIssueModalJob(job)}
                        className="px-3 py-2 border border-indigo-300 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-bold transition"
                      >
                        Report Delay / Issue
                      </button>

                      <button
                        onClick={() => handleNextStatus(job)}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
                      >
                        <Clock className="w-4 h-4" />
                        <span>
                          {job.status === 'pickup_scheduled' && 'Advance to: Picked Up'}
                          {job.status === 'picked_up' && 'Advance to: In Transit'}
                          {job.status === 'in_transit' && 'Advance to: Delivered'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {isDelivered && (
                  <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center gap-2 text-xs text-emerald-900 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Delivered successfully! Fee of {formatBDT(job.fee)} is added to your account.</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Transit Issue Modal */}
      {issueModalJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4">
            <h3 className="font-bold text-forest-950 text-base">Report Road / Cargo Delay</h3>
            <textarea
              rows={3}
              required
              value={issueNote}
              onChange={(e) => setIssueNote(e.target.value)}
              placeholder="e.g. Ferry delay at Daulatdia ghat, or highway puncture..."
              className="w-full text-xs border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIssueModalJob(null)}
                className="px-3 py-1.5 text-xs text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReportIssue}
                className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700"
              >
                Submit Incident
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
