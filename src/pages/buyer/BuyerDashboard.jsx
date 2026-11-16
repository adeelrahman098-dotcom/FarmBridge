import React from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT } from '../../utils/formatters';
import StatusBadge from '../../components/common/StatusBadge';
import {
  ShoppingBag,
  PackageCheck,
  HandCoins,
  Heart,
  Truck,
  ArrowRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function BuyerDashboard() {
  const { currentUser } = useAuth();
  const { offers, orders, savedProductIds, products } = useMarketplace();

  const myOffers = offers.filter(o => o.buyerId === currentUser.id);
  const pendingOffers = myOffers.filter(o => ['pending', 'countered'].includes(o.status));
  const myOrders = orders.filter(o => o.buyerId === currentUser.id);
  const activeOrders = myOrders.filter(o => !['completed', 'cancelled'].includes(o.orderStatus));

  const savedProducts = products.filter(p => savedProductIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-amber-600 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-700/80 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5" /> Buyer Procurement Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-xs sm:text-sm text-amber-100">
            {currentUser.profile?.businessName || 'Business Buyer'} • {currentUser.profile?.district || 'Dhaka'}, Bangladesh
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/marketplace"
            className="px-4 py-2.5 bg-white text-amber-900 rounded-xl text-xs font-bold transition shadow hover:bg-amber-50 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Browse Fresh Produce</span>
          </Link>
          <Link
            to="/buyer/orders"
            className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition border border-amber-500 flex items-center gap-1.5"
          >
            <Truck className="w-4 h-4" />
            <span>Track Orders ({activeOrders.length})</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Active Shipments</span>
          <p className="text-2xl font-black text-forest-950">{activeOrders.length}</p>
          <Link to="/buyer/orders" className="text-[11px] text-leaf-700 font-semibold hover:underline block pt-1">
            View live status tracker →
          </Link>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Pending Offers</span>
          <p className="text-2xl font-black text-amber-600">{pendingOffers.length}</p>
          <Link to="/buyer/offers" className="text-[11px] text-amber-700 font-semibold hover:underline block pt-1">
            Counterproposals & terms →
          </Link>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Saved Produce</span>
          <p className="text-2xl font-black text-forest-950">{savedProducts.length}</p>
          <Link to="/buyer/saved" className="text-[11px] text-forest-700 font-semibold hover:underline block pt-1">
            Bookmarked items →
          </Link>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Total Purchases</span>
          <p className="text-2xl font-black text-emerald-700">{myOrders.length}</p>
          <Link to="/buyer/history" className="text-[11px] text-emerald-700 font-semibold hover:underline block pt-1">
            Invoices & receipts →
          </Link>
        </div>
      </div>

      {/* 2-Column Content: In-Transit Deliveries + Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Shipments */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200">
            <h2 className="text-base font-bold text-forest-950 flex items-center gap-2">
              <Truck className="w-5 h-5 text-indigo-600" />
              <span>Live Deliveries & Tracking</span>
            </h2>
            <Link to="/buyer/orders" className="text-xs font-bold text-leaf-700 hover:underline">
              View All
            </Link>
          </div>

          {activeOrders.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No orders in transit right now.
            </div>
          ) : (
            <div className="space-y-3">
              {activeOrders.map(order => (
                <div key={order.id} className="p-4 bg-cream-50 rounded-2xl border border-cream-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{order.productName}</h4>
                      <p className="text-[11px] text-slate-500">
                        {order.quantity} {order.unit} from {order.farmerName}
                      </p>
                    </div>
                    <StatusBadge status={order.orderStatus} />
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1 border-t border-cream-200">
                    <span className="font-extrabold text-forest-950">{formatBDT(order.total)}</span>
                    <Link
                      to="/buyer/orders"
                      className="text-xs font-bold text-leaf-700 hover:underline"
                    >
                      Track Shipment →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Offers Awaiting Response */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200">
            <h2 className="text-base font-bold text-forest-950 flex items-center gap-2">
              <HandCoins className="w-5 h-5 text-amber-500" />
              <span>Negotiation Updates</span>
            </h2>
            <Link to="/buyer/offers" className="text-xs font-bold text-leaf-700 hover:underline">
              All Offers
            </Link>
          </div>

          {pendingOffers.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No active negotiations pending.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingOffers.map(offer => {
                const product = products.find(p => p.id === offer.productId);
                return (
                  <div key={offer.id} className="p-4 bg-cream-50 rounded-2xl border border-cream-200 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{product?.name}</h4>
                        <p className="text-[11px] text-slate-500">
                          {offer.status === 'countered'
                            ? `Farmer Countered at ৳${offer.counterUnitPrice}/${offer.unit}`
                            : `Your Offer: ৳${offer.offeredUnitPrice}/${offer.unit}`}
                        </p>
                      </div>
                      <StatusBadge status={offer.status} />
                    </div>
                    <div className="flex justify-end pt-1">
                      <Link
                        to="/buyer/offers"
                        className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-bold transition"
                      >
                        Review Negotiation
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
