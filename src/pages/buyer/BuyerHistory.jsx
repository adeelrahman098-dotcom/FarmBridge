import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT, formatDate } from '../../utils/formatters';
import InvoiceModal from '../../components/order/InvoiceModal';
import { History, FileText, CheckCircle2 } from 'lucide-react';

export default function BuyerHistory() {
  const { currentUser } = useAuth();
  const { orders } = useMarketplace();

  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState(null);

  const myOrders = orders.filter(o => o.buyerId === currentUser.id);
  const completedOrders = myOrders.filter(o => o.orderStatus === 'completed');
  const totalSpent = completedOrders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          Purchase & Invoice History
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Historical ledger of all fulfilled orders, accounting records, and delivery receipts.
        </p>
      </div>

      {/* Summary card */}
      <div className="bg-forest-900 text-white rounded-3xl p-6 sm:p-8 flex items-center justify-between shadow-md">
        <div>
          <span className="text-xs text-forest-300 font-bold uppercase tracking-wider block">
            Total Fulfilled Spend (BDT)
          </span>
          <p className="text-3xl font-black text-leaf-300 mt-1">{formatBDT(totalSpent)}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-forest-300 block">Completed Batches</span>
          <span className="text-2xl font-bold">{completedOrders.length}</span>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden p-6 space-y-4">
        <h2 className="text-base font-bold text-forest-950">Completed Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-cream-100/70 text-slate-600 font-bold uppercase border-b border-cream-200">
              <tr>
                <th className="py-3 px-3">Order Ref</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Produce</th>
                <th className="py-3 px-3">Farmer Supplier</th>
                <th className="py-3 px-3">Quantity</th>
                <th className="py-3 px-3 text-right">Total Paid</th>
                <th className="py-3 px-3 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100 font-medium">
              {completedOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    No completed orders yet.
                  </td>
                </tr>
              ) : (
                completedOrders.map(order => (
                  <tr key={order.id} className="hover:bg-cream-50/60">
                    <td className="py-3 px-3 font-bold text-slate-800">#{order.id}</td>
                    <td className="py-3 px-3 text-slate-500">{formatDate(order.createdAt)}</td>
                    <td className="py-3 px-3 font-semibold text-forest-900">{order.productName}</td>
                    <td className="py-3 px-3 text-slate-700">{order.farmerName}</td>
                    <td className="py-3 px-3">{order.quantity} {order.unit}</td>
                    <td className="py-3 px-3 text-right font-extrabold text-forest-950">{formatBDT(order.total)}</td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => setActiveInvoiceOrder(order)}
                        className="px-3 py-1 bg-cream-100 hover:bg-cream-200 rounded-lg text-slate-700 font-bold inline-flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3 text-forest-700" />
                        <span>Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {activeInvoiceOrder && (
        <InvoiceModal
          order={activeInvoiceOrder}
          onClose={() => setActiveInvoiceOrder(null)}
        />
      )}
    </div>
  );
}
