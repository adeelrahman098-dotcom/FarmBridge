import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT } from '../../utils/formatters';
import StatusBadge from '../../components/common/StatusBadge';
import { Layers, Pause, Play, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductModeration() {
  const { products, toggleProductStatus, deleteProduct } = useMarketplace();
  const { users } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          Catalog Quality & Produce Moderation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review, pause, or delist products to ensure quality consistency and truthful representations.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-cream-100/70 text-slate-600 font-bold uppercase border-b border-cream-200">
              <tr>
                <th className="py-3 px-3">Crop / Listing</th>
                <th className="py-3 px-3">Farmer</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Price & Volume</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100 font-medium">
              {products.map(prod => {
                const farmer = users.find(u => u.id === prod.farmerId);
                return (
                  <tr key={prod.id} className="hover:bg-cream-50/60">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images?.[0]}
                          alt=""
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-forest-950 text-xs sm:text-sm">{prod.name}</h4>
                          <span className="text-[10px] text-slate-400">{prod.district}, BD</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      {farmer?.name || 'Farmer'}
                    </td>
                    <td className="py-3 px-3 capitalize text-slate-600">
                      {prod.category}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-900">{formatBDT(prod.price)}/{prod.unit}</span>
                      <p className="text-[10px] text-slate-400">{prod.quantity.toLocaleString()} {prod.unit}</p>
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge status={prod.status} />
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/products/${prod.id}`}
                          className="p-1.5 rounded-lg border border-cream-300 hover:bg-cream-100 text-slate-600"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => toggleProductStatus(prod.id)}
                          className="p-1.5 rounded-lg border border-cream-300 hover:bg-cream-100 text-slate-600"
                          title={prod.status === 'active' ? 'Suspend Listing' : 'Unsuspend Listing'}
                        >
                          {prod.status === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this product permanently?')) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 rounded-lg border border-cream-300 hover:bg-rose-50 text-rose-600"
                          title="Remove Listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
