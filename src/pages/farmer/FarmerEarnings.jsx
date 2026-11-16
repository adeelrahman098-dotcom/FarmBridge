import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT, formatDate } from '../../utils/formatters';
import { TrendingUp, Coins, Receipt, ArrowUpRight, ShieldCheck, Download } from 'lucide-react';

export default function FarmerEarnings() {
  const { currentUser } = useAuth();
  const { orders } = useMarketplace();

  const myOrders = orders.filter(o => o.farmerId === currentUser.id);
  const completedOrders = myOrders.filter(o => o.orderStatus === 'completed');

  const grossSales = myOrders.reduce((acc, o) => acc + o.subtotal, 0);
  const completedGross = completedOrders.reduce((acc, o) => acc + o.subtotal, 0);
  const totalCommission = Math.round(completedGross * 0.03);
  const netPaidOut = completedGross - totalCommission;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          Sales & Financial Statements
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Detailed breakdown of your produce sales, 3% platform facilitation fee, and bank/bKash settlements.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-forest-900 text-white p-6 rounded-3xl space-y-2 shadow-md">
          <span className="text-xs text-forest-300 font-bold uppercase tracking-wider block">
            Net Settled Earnings
          </span>
          <p className="text-3xl font-black text-leaf-300">{formatBDT(netPaidOut)}</p>
          <p className="text-[11px] text-forest-200">Across {completedOrders.length} completed transactions</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-cream-200 space-y-2 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
            Gross Order Value
          </span>
          <p className="text-3xl font-black text-forest-950">{formatBDT(grossSales)}</p>
          <p className="text-[11px] text-slate-400">Total pipeline & fulfilled orders</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-cream-200 space-y-2 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
            Platform Commission (3%)
          </span>
          <p className="text-3xl font-black text-amber-600">{formatBDT(totalCommission)}</p>
          <p className="text-[11px] text-slate-400">Transparent fair platform operations fee</p>
        </div>
      </div>

      {/* Transaction Ledger Table */}
      <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-forest-950">Settlement Ledger</h2>
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 border border-cream-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-cream-100 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export PDF Statement
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-cream-100/70 text-slate-600 font-bold uppercase border-b border-cream-200">
              <tr>
                <th className="py-3 px-3">Order Ref</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Produce</th>
                <th className="py-3 px-3">Buyer Consignee</th>
                <th className="py-3 px-3 text-right">Gross Value</th>
                <th className="py-3 px-3 text-right">3% Commission</th>
                <th className="py-3 px-3 text-right">Net Farmer Payout</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100 font-medium">
              {myOrders.map(order => {
                const comm = Math.round(order.subtotal * 0.03);
                const net = order.subtotal - comm;
                return (
                  <tr key={order.id} className="hover:bg-cream-50/60">
                    <td className="py-3 px-3 font-bold text-slate-800">#{order.id}</td>
                    <td className="py-3 px-3 text-slate-500">{formatDate(order.createdAt)}</td>
                    <td className="py-3 px-3 font-semibold text-forest-900">{order.productName}</td>
                    <td className="py-3 px-3 text-slate-700">{order.buyerName}</td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">{formatBDT(order.subtotal)}</td>
                    <td className="py-3 px-3 text-right text-amber-700 font-semibold">- {formatBDT(comm)}</td>
                    <td className="py-3 px-3 text-right font-extrabold text-forest-950">{formatBDT(net)}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        order.orderStatus === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.orderStatus === 'completed' ? 'Settled' : 'In Progress'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
