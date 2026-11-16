import React from 'react';
import { BANGLADESH_DISTRICTS, PRODUCE_CATEGORIES } from '../../utils/constants';
import { Filter, RotateCcw, Check, Sparkles } from 'lucide-react';

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  selectedDistrict,
  onSelectDistrict,
  priceRange,
  onChangePriceRange,
  verifiedOnly,
  onToggleVerified,
  sortBy,
  onChangeSort,
  onResetFilters
}) {
  return (
    <div className="bg-white rounded-2xl border border-cream-200 p-5 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-cream-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-forest-700" />
          <h3 className="font-bold text-forest-950 text-sm uppercase tracking-wider">Filters</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-slate-500 hover:text-forest-700 flex items-center gap-1 font-medium transition"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Sort Options */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Sort Produce
        </label>
        <select
          value={sortBy}
          onChange={(e) => onChangeSort(e.target.value)}
          className="w-full text-xs font-medium bg-cream-50 border border-cream-300 rounded-lg p-2.5 text-slate-800 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="stock_high">Highest Available Quantity</option>
        </select>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
          Categories
        </label>
        <div className="space-y-1">
          {PRODUCE_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                  isSelected
                    ? 'bg-forest-900 text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:bg-cream-100'
                }`}
              >
                <span>{cat.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-harvest-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* District / Region */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Origin District
        </label>
        <select
          value={selectedDistrict}
          onChange={(e) => onSelectDistrict(e.target.value)}
          className="w-full text-xs font-medium bg-cream-50 border border-cream-300 rounded-lg p-2.5 text-slate-800 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
        >
          <option value="all">All Bangladesh Districts</option>
          {BANGLADESH_DISTRICTS.map(dist => (
            <option key={dist} value={dist}>{dist}</option>
          ))}
        </select>
      </div>

      {/* Maximum Price Filter */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          <span>Max Price (৳)</span>
          <span className="text-forest-700 font-extrabold text-sm">৳{priceRange}</span>
        </div>
        <input
          type="range"
          min="20"
          max="4000"
          step="20"
          value={priceRange}
          onChange={(e) => onChangePriceRange(Number(e.target.value))}
          className="w-full accent-leaf-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>৳20</span>
          <span>৳4,000+</span>
        </div>
      </div>

      {/* Verified Farmer Toggle */}
      <div className="pt-2 border-t border-cream-200">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => onToggleVerified(e.target.checked)}
            className="w-4 h-4 rounded text-leaf-600 focus:ring-leaf-500 border-cream-300 rounded"
          />
          <div>
            <span className="text-xs font-bold text-forest-950 block">Verified Farmers Only</span>
            <span className="text-[11px] text-slate-500 block">Identity & land deeds verified</span>
          </div>
        </label>
      </div>
    </div>
  );
}
