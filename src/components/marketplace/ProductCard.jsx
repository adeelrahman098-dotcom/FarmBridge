import React from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT } from '../../utils/formatters';
import { MapPin, ShieldCheck, Heart, Sparkles, Calendar } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function ProductCard({ product, onMakeOffer }) {
  const { savedProductIds, toggleSaveProduct } = useMarketplace();
  const { users } = useAuth();

  const isSaved = savedProductIds.includes(product.id);
  const farmer = users.find(u => u.id === product.farmerId);

  return (
    <div className="group bg-white rounded-2xl border border-cream-200 hover:border-forest-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Header */}
      <div className="relative aspect-[4/3] bg-cream-100 overflow-hidden">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="bg-forest-900/80 backdrop-blur text-white text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize">
            {product.category.replace('_', ' ')}
          </span>
          {product.featured && (
            <span className="bg-harvest-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        {/* Favorite Bookmark */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleSaveProduct(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur transition ${
            isSaved
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-500'
          }`}
          title={isSaved ? 'Remove from saved' : 'Save produce'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Location chip */}
        <div className="absolute bottom-2.5 left-3">
          <span className="bg-white/90 backdrop-blur text-slate-800 text-xs font-medium px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
            <MapPin className="w-3 h-3 text-leaf-600" />
            {product.district}
          </span>
        </div>
      </div>

      {/* Body Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Farmer row */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="truncate max-w-[170px] font-medium text-forest-800">
              {farmer?.profile?.farmName || farmer?.name || 'Verified Farmer'}
            </span>
            {farmer?.verificationStatus === 'verified' && (
              <span className="flex items-center gap-0.5 text-leaf-700 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-leaf-600" /> Verified
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link to={`/products/${product.id}`} className="block group-hover:text-forest-700 transition">
            <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Stock & Unit Details */}
          <div className="mt-2 flex items-center justify-between text-xs text-slate-600 bg-cream-100/70 p-2 rounded-lg">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Available Stock</span>
              <span className="font-semibold text-slate-800">{product.quantity.toLocaleString()} {product.unit}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Min Order</span>
              <span className="font-semibold text-slate-800">{product.minOrderQuantity} {product.unit}</span>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-cream-200 flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-slate-500 block">Unit Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-forest-900">
                {formatBDT(product.price)}
              </span>
              <span className="text-xs text-slate-500 font-medium">/{product.unit}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to={`/products/${product.id}`}
              className="px-3 py-1.5 rounded-lg border border-forest-600 text-forest-700 hover:bg-forest-50 text-xs font-semibold transition"
            >
              Details
            </Link>
            <button
              onClick={() => onMakeOffer && onMakeOffer(product)}
              className="px-3 py-1.5 rounded-lg bg-leaf-600 hover:bg-leaf-700 text-white text-xs font-bold shadow-sm transition"
            >
              Make Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
