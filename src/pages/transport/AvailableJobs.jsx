import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT } from '../../utils/formatters';
import { Truck, MapPin, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AvailableJobs() {
  const { currentUser } = useAuth();
  const { deliveries, claimDeliveryJob } = useMarketplace();
  const navigate = useNavigate();

  const openJobs = deliveries.filter(d => d.status === 'available');

  const handleClaim = (jobId) => {
    if (window.confirm('Claim this cargo shipment? You will be assigned as the official carrier.')) {
      claimDeliveryJob(jobId, currentUser);
      navigate('/transport/active');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          Open Agricultural Freight Requests
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Select and claim confirmed orders requiring road transport from farms to destination warehouses.
        </p>
      </div>

      {openJobs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-200 p-12 text-center text-slate-500 text-xs">
          All currently confirmed orders have carriers assigned. Check back as new offers are accepted!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {openJobs.map(job => (
            <div
              key={job.id}
              className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start border-b border-cream-200 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Cargo Job #{job.id}</span>
                    <h3 className="font-bold text-forest-950 text-base">{job.cargoDescription}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-emerald-700">{formatBDT(job.fee)}</span>
                    <span className="text-[10px] text-slate-400 block">Guaranteed carrier fee</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-3 text-xs">
                  <div className="flex items-start gap-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-leaf-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900">Pickup Origin:</strong>
                      <span>{job.pickupAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900">Destination Dropoff:</strong>
                      <span>{job.dropoffAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Scheduled Date: <strong className="text-slate-800">{job.pickupDate}</strong></span>
                  </div>

                  {job.instructions && (
                    <div className="p-3 bg-cream-50 rounded-xl text-slate-600 text-[11px] italic">
                      Special Handling: "{job.instructions}"
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-cream-200 flex justify-end">
                <button
                  onClick={() => handleClaim(job.id)}
                  className="px-5 py-2.5 bg-leaf-600 hover:bg-leaf-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Claim Delivery Assignment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
