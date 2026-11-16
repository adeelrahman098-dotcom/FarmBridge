import React from 'react';
import { formatBDT, formatDate } from '../../utils/formatters';
import { FileText, X, Printer, ShieldCheck } from 'lucide-react';

export default function InvoiceModal({ order, onClose }) {
  if (!order) return null;

  const commission = Math.round(order.subtotal * 0.03);
  const farmerPayout = order.subtotal - commission;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-cream-200">
        <div className="bg-forest-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-harvest-400" />
            <h3 className="font-bold text-base">Order Invoice #{order.id}</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-forest-800 rounded-lg text-white/80">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="flex justify-between items-start border-b border-cream-200 pb-4">
            <div>
              <span className="font-extrabold text-forest-900 text-lg">FarmBridge BD</span>
              <p className="text-xs text-slate-500">Agri Settlement Statement</p>
              <p className="text-xs text-slate-500 mt-1">Date: {formatDate(order.createdAt)}</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-leaf-100 text-leaf-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                {order.paymentStatus}
              </span>
              <p className="text-[11px] text-slate-400 mt-1">Tracking ID: {order.deliveryId || 'Pending'}</p>
            </div>
          </div>

          {/* Parties */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-cream-50 p-3.5 rounded-xl border border-cream-200">
            <div>
              <span className="text-slate-400 uppercase font-bold block mb-1">Farmer / Producer</span>
              <p className="font-bold text-forest-950">{order.farmerName}</p>
              <p className="text-slate-600 truncate">{order.pickupAddress}</p>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-bold block mb-1">Buyer Consignee</span>
              <p className="font-bold text-forest-950">{order.buyerName}</p>
              <p className="text-slate-600 truncate">{order.deliveryAddress}</p>
            </div>
          </div>

          {/* Line item table */}
          <div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-cream-300 text-slate-500 font-bold">
                  <th className="py-2 text-left">Item Description</th>
                  <th className="py-2 text-right">Qty</th>
                  <th className="py-2 text-right">Unit Rate</th>
                  <th className="py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                <tr>
                  <td className="py-3 font-semibold text-slate-800">{order.productName}</td>
                  <td className="py-3 text-right">{order.quantity} {order.unit}</td>
                  <td className="py-3 text-right">{formatBDT(order.unitPrice)}</td>
                  <td className="py-3 text-right font-bold text-slate-900">{formatBDT(order.subtotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-cream-100/70 p-4 rounded-xl space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Produce Subtotal:</span>
              <span className="font-semibold text-slate-900">{formatBDT(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Logistics & Delivery Fee:</span>
              <span className="font-semibold text-slate-900">{formatBDT(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between border-t border-cream-300 pt-2 text-sm font-extrabold text-forest-950">
              <span>Total Payable by Buyer:</span>
              <span>{formatBDT(order.total)}</span>
            </div>

            <div className="border-t border-cream-300 pt-2 text-[11px] text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>Platform Facilitation (3%):</span>
                <span>- {formatBDT(commission)}</span>
              </div>
              <div className="flex justify-between font-semibold text-forest-900">
                <span>Net Farmer Payout:</span>
                <span>{formatBDT(farmerPayout)}</span>
              </div>
            </div>
          </div>

          {/* Trust badge */}
          <div className="flex items-center gap-2 text-slate-500 text-[11px] justify-center pt-2">
            <ShieldCheck className="w-4 h-4 text-leaf-600" />
            <span>FarmBridge Guaranteed Settlement & Logistics Insurance</span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-cream-100 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print / PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-forest-900 text-white rounded-xl text-xs font-bold hover:bg-forest-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
