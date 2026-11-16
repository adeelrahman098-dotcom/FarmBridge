import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT } from '../../utils/formatters';
import {
  Shield,
  Users,
  Tractor,
  Layers,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  FileCheck2,
  Settings,
  ArrowRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';

export default function AdminDashboard() {
  const { users } = useAuth();
  const { products, orders, complaints, commissionRate, updateCommission, resetAllData } = useMarketplace();

  const [customRate, setCustomRate] = useState(commissionRate * 100);
  const [rateSaved, setRateSaved] = useState(false);

  // Platform Metrics
  const totalUsers = users.length;
  const activeFarmers = users.filter(u => u.role === 'farmer').length;
  const activeBuyers = users.filter(u => u.role === 'buyer').length;
  const activeTransporters = users.filter(u => u.role === 'transport').length;
  const pendingKYC = users.filter(u => u.verificationStatus === 'pending').length;
  const activeListings = products.filter(p => p.status === 'active').length;

  const totalGMV = orders.reduce((acc, o) => acc + o.total, 0);
  const platformRevenue = Math.round(orders.reduce((acc, o) => acc + (o.subtotal * commissionRate), 0));
  const openComplaints = complaints.filter(c => c.status === 'pending').length;

  const handleSaveRate = (e) => {
    e.preventDefault();
    updateCommission(Number(customRate) / 100);
    setRateSaved(true);
    setTimeout(() => setRateSaved(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-slate-800 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-harvest-400" /> Platform Operations & Governance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            FarmBridge Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time monitoring of transactions, farmer KYC validation, dispute mediation, and commission rules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm('Reset all demo state to fresh default seed data?')) {
                resetAllData();
              }
            }}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            title="Reset to fresh demo seed data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GMV */}
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Gross GMV Traded</span>
          <p className="text-2xl font-black text-forest-950">{formatBDT(totalGMV)}</p>
          <span className="text-[11px] text-leaf-700 font-semibold block pt-1">Across all order stages</span>
        </div>

        {/* Platform Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Platform Commission</span>
          <p className="text-2xl font-black text-emerald-700">{formatBDT(platformRevenue)}</p>
          <span className="text-[11px] text-slate-400 block pt-1">Effective rate: {(commissionRate * 100).toFixed(1)}%</span>
        </div>

        {/* Active Users */}
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Registered Users</span>
          <p className="text-2xl font-black text-slate-900">{totalUsers}</p>
          <span className="text-[11px] text-slate-500 block pt-1">
            {activeFarmers} Farmers • {activeBuyers} Buyers • {activeTransporters} Fleet
          </span>
        </div>

        {/* Open Complaints */}
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Disputes / KYC Pending</span>
          <p className="text-2xl font-black text-amber-600">{openComplaints + pendingKYC}</p>
          <Link to="/admin/complaints" className="text-[11px] text-amber-700 font-semibold hover:underline block pt-1">
            {openComplaints} open disputes • {pendingKYC} verification requests →
          </Link>
        </div>
      </div>

      {/* Management Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Verification Queue */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-cream-200">
              <h3 className="font-bold text-forest-950 text-base flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-leaf-600" />
                <span>KYC Verification Queue</span>
              </h3>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {pendingKYC} Pending
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Review incoming farmer land title tax receipts and transport partner road permits.
            </p>
          </div>
          <Link
            to="/admin/verification"
            className="w-full py-2.5 bg-forest-900 hover:bg-forest-800 text-white rounded-xl text-xs font-bold text-center block transition"
          >
            Review Applications Queue
          </Link>
        </div>

        {/* Product Moderation */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-cream-200">
              <h3 className="font-bold text-forest-950 text-base flex items-center gap-2">
                <Layers className="w-5 h-5 text-leaf-600" />
                <span>Listing Moderation</span>
              </h3>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {activeListings} Active
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Audit crop images, unit rates, minimum order boundaries, and deceptive postings.
            </p>
          </div>
          <Link
            to="/admin/moderation"
            className="w-full py-2.5 bg-forest-900 hover:bg-forest-800 text-white rounded-xl text-xs font-bold text-center block transition"
          >
            Audit Catalog Items
          </Link>
        </div>

        {/* Complaints Mediation */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-cream-200">
              <h3 className="font-bold text-forest-950 text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Dispute Resolution</span>
              </h3>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {openComplaints} Open
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Mediate weight discrepancies, transit damages, and delay grievances.
            </p>
          </div>
          <Link
            to="/admin/complaints"
            className="w-full py-2.5 bg-forest-900 hover:bg-forest-800 text-white rounded-xl text-xs font-bold text-center block transition"
          >
            Manage Open Tickets
          </Link>
        </div>
      </div>

      {/* Commission Configuration Card */}
      <div className="bg-cream-100 rounded-3xl border border-cream-300 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-forest-950 font-bold text-base">
          <Settings className="w-5 h-5 text-forest-700" />
          <span>Platform Monetary Rule Configuration</span>
        </div>
        <p className="text-xs text-slate-600 max-w-2xl">
          Set the platform facilitation fee percentage deducted from completed orders. Default is 3%.
        </p>

        <form onSubmit={handleSaveRate} className="flex flex-wrap items-center gap-4 pt-1">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-cream-300">
            <span className="text-xs font-bold text-slate-600">Commission %:</span>
            <input
              type="number"
              min="0.5"
              max="15"
              step="0.5"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
              className="w-16 text-xs font-extrabold text-forest-900 focus:outline-none"
            />
            <span className="text-xs font-bold text-slate-500">%</span>
          </div>

          <button
            type="submit"
            className="px-4 py-2.5 bg-forest-900 hover:bg-forest-800 text-white rounded-xl text-xs font-bold transition shadow"
          >
            Update Platform Fee
          </button>

          {rateSaved && (
            <span className="text-xs font-bold text-emerald-700 animate-fade-in">
              Rule saved successfully!
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
