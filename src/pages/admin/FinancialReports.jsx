import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatBDT } from '../../utils/formatters';
import { TrendingUp, BarChart3, Download, PieChart, Coins } from 'lucide-react';

export default function FinancialReports() {
  const { orders, products, commissionRate } = useMarketplace();

  const totalGMV = orders.reduce((acc, o) => acc + o.total, 0);
  const totalSubtotal = orders.reduce((acc, o) => acc + o.subtotal, 0);
  const totalDeliveryFees = orders.reduce((acc, o) => acc + o.deliveryFee, 0);
  const totalCommission = Math.round(totalSubtotal * commissionRate);
  const totalFarmerPayout = totalSubtotal - totalCommission;

  // Category demand metrics
  const categoryStats = [
    { name: 'Vegetables', share: '38%', volume: '৳ 1,450,000', count: '52 Orders' },
    { name: 'Grains & Rice', share: '26%', volume: '৳ 980,000', count: '31 Orders' },
    { name: 'Seasonal Fruits', share: '18%', volume: '৳ 690,000', count: '24 Orders' },
    { name: 'Spices & Herbs', share: '11%', volume: '৳ 420,000', count: '18 Orders' },
    { name: 'Dairy & Poultry', share: '7%', volume: '৳ 260,000', count: '14 Orders' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
            Marketplace Analytics & Financial Audit
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Aggregated reports on trading volume, platform commissions, category velocity, and payouts.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 bg-forest-900 hover:bg-forest-800 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download Audit PDF</span>
        </button>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Gross Merchandise Value</span>
          <p className="text-2xl font-black text-forest-950">{formatBDT(totalGMV)}</p>
          <span className="text-[11px] text-leaf-700 font-semibold block pt-1">All Orders Invoiced</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Platform Revenue ({(commissionRate * 100).toFixed(0)}%)</span>
          <p className="text-2xl font-black text-emerald-700">{formatBDT(totalCommission)}</p>
          <span className="text-[11px] text-slate-400 block pt-1">Earned facilitation fees</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Farmer Direct Payouts</span>
          <p className="text-2xl font-black text-leaf-700">{formatBDT(totalFarmerPayout)}</p>
          <span className="text-[11px] text-slate-400 block pt-1">97% retained by growers</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Total Freight Disbursed</span>
          <p className="text-2xl font-black text-indigo-900">{formatBDT(totalDeliveryFees)}</p>
          <span className="text-[11px] text-slate-400 block pt-1">Transport partner payouts</span>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-cream-200">
          <PieChart className="w-5 h-5 text-forest-700" />
          <h2 className="text-base font-bold text-forest-950">Produce Category Trading Velocity</h2>
        </div>

        <div className="space-y-3">
          {categoryStats.map(stat => (
            <div key={stat.name} className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>{stat.name} ({stat.count})</span>
                <span className="text-forest-900">{stat.volume} ({stat.share})</span>
              </div>
              <div className="w-full h-2.5 bg-cream-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-leaf-600 rounded-full"
                  style={{ width: stat.share }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
