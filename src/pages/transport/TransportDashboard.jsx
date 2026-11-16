import React from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT } from '../../utils/formatters';
import StatusBadge from '../../components/common/StatusBadge';
import {
  Truck,
  PackageCheck,
  Coins,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';

export default function TransportDashboard() {
  const { currentUser } = useAuth();
  const { deliveries } = useMarketplace();

  // Filter deliveries
  const myDeliveries = deliveries.filter(d => d.transportPartnerId === currentUser.id);
  const activeDeliveries = myDeliveries.filter(d => ['pickup_scheduled', 'picked_up', 'in_transit'].includes(d.status));
  const completedDeliveries = myDeliveries.filter(d => d.status === 'delivered');
  const openJobs = deliveries.filter(d => d.status === 'available');

  const totalEarnings = completedDeliveries.reduce((acc, d) => acc + d.fee, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-indigo-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-800 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> Transport & Freight Portal
            </span>
            {currentUser.verificationStatus === 'verified' && (
              <span className="text-leaf-300 text-xs font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Certified Fleet Carrier
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Welcome, {currentUser.name}!
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200">
            {currentUser.profile?.companyName || 'Freight Carrier'} • Vehicle: {currentUser.profile?.vehicleType || 'Truck'} ({currentUser.profile?.capacity || '5 Ton'})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/transport/available"
            className="px-4 py-2.5 bg-leaf-500 hover:bg-leaf-600 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Delivery Jobs ({openJobs.length})</span>
          </Link>
          <Link
            to="/transport/active"
            className="px-4 py-2.5 bg-indigo-800 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition border border-indigo-700 flex items-center gap-1.5"
          >
            <Truck className="w-4 h-4" />
            <span>Active Routes ({activeDeliveries.length})</span>
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Active Runs</span>
          <p className="text-2xl font-black text-indigo-900">{activeDeliveries.length}</p>
          <Link to="/transport/active" className="text-[11px] text-indigo-700 font-semibold hover:underline block pt-1">
            Update transit status →
          </Link>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Available Jobs</span>
          <p className="text-2xl font-black text-emerald-600">{openJobs.length}</p>
          <Link to="/transport/available" className="text-[11px] text-emerald-700 font-semibold hover:underline block pt-1">
            Claim open jobs →
          </Link>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Completed Trips</span>
          <p className="text-2xl font-black text-forest-950">{completedDeliveries.length}</p>
          <span className="text-[11px] text-slate-400 block pt-1">On-time rate: 98%</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Freight Revenue</span>
          <p className="text-2xl font-black text-forest-950">{formatBDT(totalEarnings)}</p>
          <span className="text-[11px] text-slate-400 block pt-1">Direct bank payout</span>
        </div>
      </div>

      {/* Main 2-Column: Active Routes + Open Jobs Available */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active In-Transit Jobs */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200">
            <h2 className="text-base font-bold text-forest-950 flex items-center gap-2">
              <Truck className="w-5 h-5 text-indigo-600" />
              <span>Current Assigned Shipments</span>
            </h2>
            <Link to="/transport/active" className="text-xs font-bold text-leaf-700 hover:underline">
              Manage All
            </Link>
          </div>

          {activeDeliveries.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No active routes in transit right now. Accept a job from the open pool below!
            </div>
          ) : (
            <div className="space-y-3">
              {activeDeliveries.map(del => (
                <div key={del.id} className="p-4 bg-cream-50 rounded-2xl border border-cream-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{del.cargoDescription}</h4>
                      <p className="text-[11px] text-slate-500">Ref Job #{del.id}</p>
                    </div>
                    <StatusBadge status={del.status} />
                  </div>
                  <div className="text-xs space-y-1 text-slate-700">
                    <p className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-leaf-600 flex-shrink-0" />
                      <span>From: {del.pickupAddress}</span>
                    </p>
                    <p className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>To: {del.dropoffAddress}</span>
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-cream-200">
                    <span className="font-extrabold text-forest-900">Fee: {formatBDT(del.fee)}</span>
                    <Link
                      to="/transport/active"
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-[11px] transition"
                    >
                      Update Milestone →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available Jobs to Claim */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200">
            <h2 className="text-base font-bold text-forest-950 flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-emerald-600" />
              <span>Available Jobs Pool</span>
            </h2>
            <Link to="/transport/available" className="text-xs font-bold text-leaf-700 hover:underline">
              View All Open ({openJobs.length})
            </Link>
          </div>

          {openJobs.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No unassigned jobs currently available. Check back soon!
            </div>
          ) : (
            <div className="space-y-3">
              {openJobs.slice(0, 3).map(job => (
                <div key={job.id} className="p-4 bg-cream-50 rounded-2xl border border-cream-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{job.cargoDescription}</h4>
                      <p className="text-[11px] text-slate-500">Pickup Date: {job.pickupDate}</p>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                      {formatBDT(job.fee)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 truncate">
                    {job.pickupAddress} → {job.dropoffAddress}
                  </p>
                  <div className="flex justify-end pt-1">
                    <Link
                      to="/transport/available"
                      className="px-3.5 py-1.5 bg-leaf-600 hover:bg-leaf-700 text-white rounded-xl text-xs font-bold transition"
                    >
                      Claim Delivery Job
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
