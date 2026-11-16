import React from 'react';
import { Link } from 'react-router-dom';
import {
  Tractor,
  ShoppingBag,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  FileCheck2,
  Coins
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-leaf-600 bg-leaf-50 px-3 py-1 rounded-full border border-leaf-200">
          The FarmBridge Ecosystem
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-forest-950 tracking-tight">
          How FarmBridge Transforms Bangladesh Agri-Commerce
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Traditional agricultural supply chains in Bangladesh pass through 4 to 6 tiers of middle-traders (Aarotdars, Farias, Beparis). FarmBridge removes parasitic margins, giving farmers higher profits and buyers fresher, cheaper produce.
        </p>
      </div>

      {/* Role-by-Role Journey Tabs / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Farmer Column */}
        <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-sm space-y-4 relative overflow-hidden">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center font-bold">
            <Tractor className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-forest-950">For Farmers</h3>
          <p className="text-xs text-slate-600">Sell at fair transparent market prices without distress selling at local hats.</p>
          <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>List your produce with harvest dates and minimum order quantities.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Receive offers from verified supermarkets and bulk wholesalers.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Accept or counteroffer with revised price or quantity terms.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Truck arrives at your farm gate for pickup. Receive payment upon arrival.</span>
            </li>
          </ul>
        </div>

        {/* Buyer Column */}
        <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-sm space-y-4 relative overflow-hidden">
          <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center font-bold">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-forest-950">For Buyers</h3>
          <p className="text-xs text-slate-600">Procure directly from vetted farmers across Bogura, Rajshahi, Rangpur, and beyond.</p>
          <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>Filter produce by origin district, organic status, and price.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>Chat directly with growers and submit custom bulk offers.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>Track shipment live through an 8-stage progress monitor.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>Inspect quality at dropoff before releasing final completion.</span>
            </li>
          </ul>
        </div>

        {/* Transport Partner Column */}
        <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-sm space-y-4 relative overflow-hidden">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-800 rounded-2xl flex items-center justify-center font-bold">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-forest-950">For Transporters</h3>
          <p className="text-xs text-slate-600">Keep your trucks and pickup vans loaded both ways across national highways.</p>
          <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span>Browse open cargo pickup requests matched to your vehicle capacity.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span>Accept delivery jobs with guaranteed delivery fees.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span>Update milestones from pickup to highway transit to delivery.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span>Build verified carrier ratings to win recurring corporate routes.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Negotiation & Escrow Explainer */}
      <div className="bg-forest-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-harvest-400">
            Fair Negotiation Protocol
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            How The Counteroffer Negotiation Works
          </h2>
          <p className="text-xs sm:text-sm text-forest-200 leading-relaxed">
            Unlike rigid fixed-price e-commerce, agriculture demands flexibility due to fluctuating market hats and seasonal yields. FarmBridge features an interactive negotiation protocol:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="bg-forest-800/80 p-5 rounded-2xl border border-forest-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-harvest-300">
              <Coins className="w-4 h-4" /> 1. Initial Offer
            </div>
            <p className="text-forest-200">
              Buyer submits proposed unit price (e.g. ৳28/kg vs ৳32 listed) and required quantity with delivery deadline.
            </p>
          </div>

          <div className="bg-forest-800/80 p-5 rounded-2xl border border-forest-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-harvest-300">
              <RefreshCw className="w-4 h-4" /> 2. Farmer Counter
            </div>
            <p className="text-forest-200">
              Farmer can counter with a middle price (e.g. ৳30/kg) or ask for a slightly larger minimum volume to offset packing costs.
            </p>
          </div>

          <div className="bg-forest-800/80 p-5 rounded-2xl border border-forest-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-harvest-300">
              <FileCheck2 className="w-4 h-4" /> 3. Auto Order Creation
            </div>
            <p className="text-forest-200">
              Once either party accepts, an official confirmed Order with tracking ID and automated delivery job is instantly generated.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-forest-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-forest-300">
            Platform Fee: Only <strong className="text-white">3%</strong> deduction upon successful order completion.
          </div>
          <Link
            to="/marketplace"
            className="px-6 py-3 bg-leaf-500 hover:bg-leaf-600 text-white text-xs font-bold rounded-xl transition shadow flex items-center gap-1.5"
          >
            <span>Explore Marketplace Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
