import React from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT } from '../../utils/formatters';
import StatusBadge from '../../components/common/StatusBadge';
import {
  Tractor,
  Layers,
  HandCoins,
  PackageCheck,
  TrendingUp,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function FarmerDashboard() {
  const { currentUser } = useAuth();
  const { products, offers, orders } = useMarketplace();

  // Filter for this farmer
  const myProducts = products.filter(p => p.farmerId === currentUser.id);
  const myOffers = offers.filter(o => o.farmerId === currentUser.id);
  const pendingOffers = myOffers.filter(o => o.status === 'pending');
  const myOrders = orders.filter(o => o.farmerId === currentUser.id);
  const activeOrders = myOrders.filter(o => !['completed', 'cancelled'].includes(o.orderStatus));

  // Calculate gross sales
  const completedOrders = myOrders.filter(o => o.orderStatus === 'completed');
  const totalSales = completedOrders.reduce((acc, curr) => acc + curr.subtotal, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-forest-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-leaf-600/80 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Tractor className="w-3.5 h-3.5" /> Farmer Portal
            </span>
            {currentUser.verificationStatus === 'verified' && (
              <span className="text-leaf-400 text-xs font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Verified Producer
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-xs sm:text-sm text-forest-200">
            {currentUser.profile?.farmName || 'Your Farm'} • {currentUser.profile?.district}, Bangladesh
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/farmer/products?action=new"
            className="px-4 py-2.5 bg-leaf-500 hover:bg-leaf-600 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List New Produce</span>
          </Link>
          <Link
            to="/farmer/offers"
            className="px-4 py-2.5 bg-forest-800 hover:bg-forest-700 text-white rounded-xl text-xs font-bold transition border border-forest-700 flex items-center gap-1.5"
          >
            <HandCoins className="w-4 h-4 text-harvest-400" />
            <span>View Offers ({pendingOffers.length})</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Listings */}
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Harvests</span>
            <Layers className="w-4 h-4 text-leaf-600" />
          </div>
          <p className="text-2xl font-black text-forest-950">{myProducts.length}</p>
          <Link to="/farmer/products" className="text-[11px] text-leaf-700 font-semibold hover:underline block pt-1">
            Manage listings & stock →
          </Link>
        </div>

        {/* Pending Offers */}
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Offers</span>
            <HandCoins className="w-4 h-4 text-harvest-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">{pendingOffers.length}</p>
          <Link to="/farmer/offers" className="text-[11px] text-amber-700 font-semibold hover:underline block pt-1">
            Review negotiation terms →
          </Link>
        </div>

        {/* Active Orders */}
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Fulfilling Orders</span>
            <PackageCheck className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-blue-700">{activeOrders.length}</p>
          <Link to="/farmer/orders" className="text-[11px] text-blue-700 font-semibold hover:underline block pt-1">
            Dispatch & logistics status →
          </Link>
        </div>

        {/* Completed Earnings */}
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Completed Payouts</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-forest-950">{formatBDT(totalSales)}</p>
          <Link to="/farmer/earnings" className="text-[11px] text-emerald-700 font-semibold hover:underline block pt-1">
            View net settlement logs →
          </Link>
        </div>
      </div>

      {/* Main Grid: Pending Offers + Active Fulfillments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Buyer Inquiries & Offers */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200">
            <div className="flex items-center gap-2">
              <HandCoins className="w-5 h-5 text-harvest-500" />
              <h2 className="text-base font-bold text-forest-950">Incoming Buyer Offers</h2>
            </div>
            <Link to="/farmer/offers" className="text-xs font-bold text-leaf-700 hover:underline">
              All Offers
            </Link>
          </div>

          {pendingOffers.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No pending buyer offers right now. Your listings are active in the marketplace.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingOffers.slice(0, 3).map(offer => {
                const product = products.find(p => p.id === offer.productId);
                return (
                  <div key={offer.id} className="p-3.5 bg-cream-50 rounded-2xl border border-cream-200 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{product?.name || 'Produce'}</h4>
                        <p className="text-[11px] text-slate-500">
                          Offered: <strong className="text-forest-900">{formatBDT(offer.offeredUnitPrice)}/{offer.unit}</strong> for {offer.quantity} {offer.unit}
                        </p>
                      </div>
                      <StatusBadge status={offer.status} />
                    </div>
                    {offer.note && (
                      <p className="text-[11px] text-slate-600 bg-white p-2 rounded-lg italic">
                        "{offer.note}"
                      </p>
                    )}
                    <div className="flex justify-end pt-1">
                      <Link
                        to="/farmer/offers"
                        className="px-3 py-1 bg-forest-900 text-white text-[11px] font-bold rounded-lg hover:bg-forest-800 transition"
                      >
                        Respond to Offer
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Active Orders In Progress */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-forest-950">Fulfillment Pipeline</h2>
            </div>
            <Link to="/farmer/orders" className="text-xs font-bold text-leaf-700 hover:underline">
              All Orders
            </Link>
          </div>

          {activeOrders.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No orders currently in fulfillment.
            </div>
          ) : (
            <div className="space-y-3">
              {activeOrders.slice(0, 3).map(order => (
                <div key={order.id} className="p-3.5 bg-cream-50 rounded-2xl border border-cream-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{order.productName}</h4>
                      <p className="text-[11px] text-slate-500">
                        Buyer: {order.buyerName} • {order.quantity} {order.unit}
                      </p>
                    </div>
                    <StatusBadge status={order.orderStatus} />
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1 border-t border-cream-200">
                    <span className="font-extrabold text-forest-900">{formatBDT(order.total)}</span>
                    <Link
                      to="/farmer/orders"
                      className="text-xs font-bold text-leaf-700 hover:underline"
                    >
                      Update Fulfillment →
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
