import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT } from '../../utils/formatters';
import { X, HandCoins, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function OfferModal({ product, onClose, onSuccess }) {
  const { createOffer } = useMarketplace();
  const { currentUser } = useAuth();

  const [quantity, setQuantity] = useState(product?.minOrderQuantity || 100);
  const [offeredUnitPrice, setOfferedUnitPrice] = useState(
    product ? Math.round(product.price * 0.9) : 50 // 10% lower default offer
  );
  const [requestedDeliveryDate, setRequestedDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  });
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  if (!product) return null;

  const totalCalculated = quantity * offeredUnitPrice;
  const originalTotal = quantity * product.price;
  const diffPercent = Math.round(((product.price - offeredUnitPrice) / product.price) * 100);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentUser?.role !== 'buyer') {
      setSubmissionError('Sign in with a buyer account to submit an offer.');
      return;
    }

    setSubmissionError('');
    setIsSubmitting(true);
    setTimeout(() => {
      createOffer({
        productId: product.id,
        quantity: Number(quantity),
        offeredUnitPrice: Number(offeredUnitPrice),
        requestedDeliveryDate,
        note: note || `Offer for ${quantity} ${product.unit} of ${product.name}`
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1500);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-cream-200">
        {/* Header */}
        <div className="bg-forest-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HandCoins className="w-5 h-5 text-harvest-400" />
            <h3 className="font-bold text-base">Make a Direct Offer</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-forest-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-forest-900">Offer Submitted Successfully!</h4>
            <p className="text-sm text-slate-600">
              The farmer has been notified and can accept, reject, or submit a counteroffer. You can monitor the negotiation in your dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {submissionError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium" role="alert">
                {submissionError}{' '}
                {!currentUser && <Link to="/login" className="font-bold underline">Sign in</Link>}
              </div>
            )}
            {/* Product Summary */}
            <div className="flex items-center gap-3.5 bg-cream-50 p-3 rounded-2xl border border-cream-200">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-forest-950 truncate">{product.name}</h4>
                <p className="text-xs text-slate-500">
                  Listed at <span className="font-bold text-forest-800">{formatBDT(product.price)}/{product.unit}</span>
                  {' • '}Min order: {product.minOrderQuantity} {product.unit}
                </p>
                <p className="text-[11px] text-leaf-700 font-semibold">{product.district}, Bangladesh</p>
              </div>
            </div>

            {/* Inputs: Quantity & Unit Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Required Quantity ({product.unit})
                </label>
                <input
                  type="number"
                  required
                  min={product.minOrderQuantity || 1}
                  max={product.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full text-sm font-semibold bg-white border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Available: {product.quantity} {product.unit}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Offered Price (৳ / {product.unit})
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={offeredUnitPrice}
                  onChange={(e) => setOfferedUnitPrice(Number(e.target.value))}
                  className="w-full text-sm font-semibold bg-white border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
                />
                <span className={`text-[10px] font-semibold mt-1 block ${diffPercent > 0 ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {diffPercent > 0 ? `${diffPercent}% below listed price` : 'At or above listed price'}
                </span>
              </div>
            </div>

            {/* Target Delivery Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Target Delivery Date
              </label>
              <input
                type="date"
                required
                value={requestedDeliveryDate}
                onChange={(e) => setRequestedDeliveryDate(e.target.value)}
                className="w-full text-sm font-medium bg-white border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
              />
            </div>

            {/* Note field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Note for Farmer (Optional)
              </label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Mention packaging preference, warehouse drop-off schedule, or quality criteria..."
                className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
              />
            </div>

            {/* Calculation summary card */}
            <div className="bg-forest-50 p-3.5 rounded-2xl border border-forest-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-forest-700 font-medium block">Total Proposed Value:</span>
                <span className="text-xl font-extrabold text-forest-950">{formatBDT(totalCalculated)}</span>
              </div>
              <div className="text-right text-xs">
                <span className="text-slate-400 line-through block">{formatBDT(originalTotal)}</span>
                <span className="text-emerald-700 font-bold">
                  Save {formatBDT(originalTotal - totalCalculated)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-cream-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Offer to Farmer'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
