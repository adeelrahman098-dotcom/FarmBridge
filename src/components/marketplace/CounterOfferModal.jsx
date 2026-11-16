import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT } from '../../utils/formatters';
import { RefreshCw, X, CheckCircle2 } from 'lucide-react';

export default function CounterOfferModal({ offer, product, onClose }) {
  const { counterOffer } = useMarketplace();
  const { currentUser } = useAuth();

  const [counterPrice, setCounterPrice] = useState(
    offer.counterUnitPrice || offer.offeredUnitPrice || product?.price || 50
  );
  const [counterQuantity, setCounterQuantity] = useState(offer.quantity || 100);
  const [counterNote, setCounterNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      counterOffer(offer.id, {
        counterPrice: Number(counterPrice),
        counterQuantity: Number(counterQuantity),
        counterNote: counterNote || `Revised price to ৳${counterPrice}/${offer.unit}`,
        byRole: currentUser.role
      });
      setIsSubmitting(false);
      setDone(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 400);
  };

  const totalCalculated = counterQuantity * counterPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-cream-200">
        <div className="bg-orange-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            <h3 className="font-bold text-base">Send Counteroffer</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-orange-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {done ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-forest-900 text-lg">Counteroffer Sent!</h4>
            <p className="text-xs text-slate-600">The counterproposal is now awaiting the other party's response.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-cream-100 p-3 rounded-xl text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Current Buyer Offer:</span>
                <span className="font-bold text-slate-800">{formatBDT(offer.offeredUnitPrice)}/{offer.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Original Listed Price:</span>
                <span className="font-bold text-forest-800">{formatBDT(offer.originalListingPrice)}/{offer.unit}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Your Counter Unit Price (৳ / {offer.unit})
              </label>
              <input
                type="number"
                required
                min="1"
                value={counterPrice}
                onChange={(e) => setCounterPrice(e.target.value)}
                className="w-full text-sm font-semibold border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Quantity ({offer.unit})
              </label>
              <input
                type="number"
                required
                min="1"
                value={counterQuantity}
                onChange={(e) => setCounterQuantity(e.target.value)}
                className="w-full text-sm font-semibold border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Reason / Counter Note
              </label>
              <textarea
                rows={2}
                value={counterNote}
                onChange={(e) => setCounterNote(e.target.value)}
                placeholder="e.g. Can meet in the middle at ৳130 including premium jute sacks..."
                className="w-full text-xs border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div className="bg-cream-50 p-3 rounded-xl flex items-center justify-between text-xs font-medium">
              <span>Counter Value:</span>
              <span className="text-base font-extrabold text-forest-900">{formatBDT(totalCalculated)}</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-cream-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-md transition"
              >
                {isSubmitting ? 'Sending...' : 'Transmit Counteroffer'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
