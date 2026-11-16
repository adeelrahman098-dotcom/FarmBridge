import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT, formatDate } from '../../utils/formatters';
import StatusBadge from '../../components/common/StatusBadge';
import CounterOfferModal from '../../components/marketplace/CounterOfferModal';
import {
  HandCoins,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Calendar,
  MessageSquare,
  Clock,
  Check
} from 'lucide-react';

export default function FarmerOffers() {
  const { currentUser } = useAuth();
  const { offers, products, acceptOffer, rejectOffer } = useMarketplace();

  const [activeTab, setActiveTab] = useState('all');
  const [selectedOfferForCounter, setSelectedOfferForCounter] = useState(null);
  const [rejectionModalOffer, setRejectionModalOffer] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Farmer's offers
  const myOffers = offers.filter(o => o.farmerId === currentUser.id);

  const filteredOffers = myOffers.filter(o => {
    if (activeTab === 'all') return true;
    return o.status === activeTab;
  });

  const handleAccept = (offerId) => {
    if (window.confirm('Accept this offer? This will generate a confirmed order and assign logistics.')) {
      acceptOffer(offerId);
    }
  };

  const handleConfirmReject = () => {
    if (rejectionModalOffer) {
      rejectOffer(rejectionModalOffer.id, rejectionReason);
      setRejectionModalOffer(null);
      setRejectionReason('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          Incoming Offers & Price Negotiations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review, accept, or counter bulk purchase proposals from wholesale buyers.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-cream-300 gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: 'all', label: `All Offers (${myOffers.length})` },
          { id: 'pending', label: `Pending (${myOffers.filter(o => o.status === 'pending').length})` },
          { id: 'countered', label: `Countered (${myOffers.filter(o => o.status === 'countered').length})` },
          { id: 'accepted', label: `Accepted (${myOffers.filter(o => o.status === 'accepted').length})` },
          { id: 'rejected', label: `Rejected (${myOffers.filter(o => o.status === 'rejected').length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-t-xl transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-forest-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-forest-900 hover:bg-cream-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Offers List */}
      {filteredOffers.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-200 p-12 text-center text-slate-500 text-xs">
          No offers found in this category.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOffers.map(offer => {
            const product = products.find(p => p.id === offer.productId);
            const totalValue = offer.quantity * (offer.counterUnitPrice || offer.offeredUnitPrice);
            const isPending = offer.status === 'pending';
            const isCountered = offer.status === 'countered';

            return (
              <div
                key={offer.id}
                className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm hover:shadow-md transition space-y-4"
              >
                {/* Header row */}
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
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Proposed Price</span>
                    <span className="font-extrabold text-forest-900 text-base">
                      {formatBDT(offer.offeredUnitPrice)}
                    </span>
                    <span className="text-[10px] text-slate-500">/{offer.unit}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Volume</span>
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
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Payout</span>
                    <span className="font-extrabold text-leaf-700 text-base">
                      {formatBDT(totalValue)}
                    </span>
                  </div>
                </div>

                {/* Counter Details if active */}
                {offer.counterUnitPrice && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-2xl text-xs space-y-1">
                    <div className="flex justify-between items-center font-bold text-orange-900">
                      <span>Counterproposal Active:</span>
                      <span>{formatBDT(offer.counterUnitPrice)}/{offer.unit}</span>
                    </div>
                    {offer.counterNote && (
                      <p className="text-orange-800 text-[11px] italic">"{offer.counterNote}"</p>
                    )}
                  </div>
                )}

                {/* Negotiation Log / History */}
                {offer.history && offer.history.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Negotiation Log
                    </span>
                    <div className="space-y-1">
                      {offer.history.map((h, i) => (
                        <div key={i} className="text-[11px] text-slate-600 flex items-start gap-2">
                          <Clock className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>{h.byName}</strong> ({h.byRole}): {h.note || `৳${h.price}/${offer.unit}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {(isPending || isCountered) && (
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-cream-200">
                    <button
                      onClick={() => setRejectionModalOffer(offer)}
                      className="px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition flex items-center gap-1"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>

                    <button
                      onClick={() => setSelectedOfferForCounter(offer)}
                      className="px-4 py-2 bg-white border border-cream-300 hover:border-orange-500 text-orange-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-4 h-4" /> Counteroffer
                    </button>

                    <button
                      onClick={() => handleAccept(offer.id)}
                      className="px-5 py-2 bg-leaf-600 hover:bg-leaf-700 text-white rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" /> Accept & Create Order
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Counter Modal */}
      {selectedOfferForCounter && (
        <CounterOfferModal
          offer={selectedOfferForCounter}
          product={products.find(p => p.id === selectedOfferForCounter.productId)}
          onClose={() => setSelectedOfferForCounter(null)}
        />
      )}

      {/* Rejection Modal */}
      {rejectionModalOffer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4">
            <h3 className="font-bold text-forest-950 text-base">Decline Offer</h3>
            <p className="text-xs text-slate-500">Provide an optional reason to help the buyer adjust their proposal:</p>
            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Current crop yields are already pre-booked at full price."
              className="w-full text-xs border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectionModalOffer(null)}
                className="px-3 py-1.5 text-xs text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
