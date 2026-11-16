import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT, formatDate } from '../../utils/formatters';
import StatusBadge from '../../components/common/StatusBadge';
import {
  HandCoins,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Calendar,
  ArrowRight,
  Clock,
  Check
} from 'lucide-react';

export default function BuyerOffers() {
  const { currentUser } = useAuth();
  const { offers, products, acceptOffer, rejectOffer } = useMarketplace();

  const [activeTab, setActiveTab] = useState('all');

  const myOffers = offers.filter(o => o.buyerId === currentUser.id);

  const filteredOffers = myOffers.filter(o => {
    if (activeTab === 'all') return true;
    return o.status === activeTab;
  });

  const handleAcceptCounter = (offerId) => {
    if (window.confirm('Accept the farmer\'s counteroffer? This creates an official order.')) {
      acceptOffer(offerId);
    }
  };

  const handleDecline = (offerId) => {
    if (window.confirm('Withdraw/decline this offer?')) {
      rejectOffer(offerId, 'Buyer declined counterproposal terms');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          My Bulk Offers & Negotiations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review counterproposals from growers, finalize agreed pricing, and generate confirmed orders.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-cream-300 gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: 'all', label: `All Inquiries (${myOffers.length})` },
          { id: 'countered', label: `Counteroffers (${myOffers.filter(o => o.status === 'countered').length})` },
          { id: 'pending', label: `Awaiting Farmer (${myOffers.filter(o => o.status === 'pending').length})` },
          { id: 'accepted', label: `Agreed / Converted (${myOffers.filter(o => o.status === 'accepted').length})` },
          { id: 'rejected', label: `Closed (${myOffers.filter(o => o.status === 'rejected').length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-t-xl transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-forest-900 hover:bg-cream-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      {filteredOffers.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-200 p-12 text-center text-slate-500 text-xs">
          No offers found in this category.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOffers.map(offer => {
            const product = products.find(p => p.id === offer.productId);
            const isCountered = offer.status === 'countered';
            const isAccepted = offer.status === 'accepted';
            const effectiveUnitPrice = offer.counterUnitPrice || offer.offeredUnitPrice;
            const total = offer.quantity * effectiveUnitPrice;

            return (
              <div
                key={offer.id}
                className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream-200 pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product?.images?.[0]}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-forest-950 text-sm">{product?.name || 'Produce'}</h3>
                      <p className="text-[11px] text-slate-500">
                        Listed: {formatBDT(offer.originalListingPrice)}/{offer.unit} • Offer Ref #{offer.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={offer.status} />
                    <span className="text-[10px] text-slate-400">{formatDate(offer.createdAt)}</span>
                  </div>
                </div>

                {/* Offer Numbers */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-cream-50 p-4 rounded-2xl border border-cream-200 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Your Initial Offer</span>
                    <span className="font-extrabold text-forest-900 text-base">
                      {formatBDT(offer.offeredUnitPrice)}
                    </span>
                    <span className="text-[10px] text-slate-500">/{offer.unit}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Quantity</span>
                    <span className="font-bold text-slate-800 text-sm">
                      {offer.quantity.toLocaleString()} {offer.unit}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Delivery Deadline</span>
                    <span className="font-bold text-slate-800 text-xs flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {formatDate(offer.requestedDeliveryDate)}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Calculated Total</span>
                    <span className="font-extrabold text-forest-950 text-base">
                      {formatBDT(total)}
                    </span>
                  </div>
                </div>

                {/* Counteroffer Highlight Card */}
                {isCountered && (
                  <div className="bg-orange-50 border border-orange-200 p-4 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-orange-900 font-bold text-xs">
                      <RefreshCw className="w-4 h-4 text-orange-600 animate-spin-slow" />
                      <span>Farmer Counterproposal:</span>
                      <span className="text-sm font-extrabold bg-orange-200 px-2 py-0.5 rounded-lg text-orange-950">
                        {formatBDT(offer.counterUnitPrice)}/{offer.unit}
                      </span>
                    </div>

                    {offer.counterNote && (
                      <p className="text-xs text-orange-950 italic bg-white/80 p-2.5 rounded-xl">
                        "{offer.counterNote}"
                      </p>
                    )}

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => handleDecline(offer.id)}
                        className="px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl"
                      >
                        Decline Terms
                      </button>
                      <button
                        onClick={() => handleAcceptCounter(offer.id)}
                        className="px-5 py-2 bg-leaf-600 hover:bg-leaf-700 text-white rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" /> Accept Counter & Place Order
                      </button>
                    </div>
                  </div>
                )}

                {/* Accepted Note */}
                {isAccepted && (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-xs">
                    <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Agreed! Order has been generated. Track in your Orders tab.</span>
                    </div>
                    <Link
                      to="/buyer/orders"
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl flex items-center gap-1 transition"
                    >
                      <span>Go to Orders</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
