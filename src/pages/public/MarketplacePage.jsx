import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/marketplace/ProductCard';
import FilterSidebar from '../../components/marketplace/FilterSidebar';
import OfferModal from '../../components/marketplace/OfferModal';
import { Search, SlidersHorizontal, PackageSearch, X } from 'lucide-react';

export default function MarketplacePage() {
  const { products } = useMarketplace();
  const { users } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state sync
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'all';
  const districtParam = searchParams.get('district') || 'all';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedDistrict, setSelectedDistrict] = useState(districtParam);
  const [priceRange, setPriceRange] = useState(4000);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active modal
  const [offerProduct, setOfferProduct] = useState(null);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Must be active
      if (product.status !== 'active') return false;

      // Search keyword
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesDistrict = product.district.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesDistrict) return false;
      }

      // Category
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // District
      if (selectedDistrict !== 'all' && product.district !== selectedDistrict) {
        return false;
      }

      // Price
      if (product.price > priceRange) {
        return false;
      }

      // Verified Farmer
      if (verifiedOnly) {
        const farmer = users.find(u => u.id === product.farmerId);
        if (farmer?.verificationStatus !== 'verified') return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'stock_high') return b.quantity - a.quantity;
      // newest
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [products, users, searchQuery, selectedCategory, selectedDistrict, priceRange, verifiedOnly, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDistrict('all');
    setPriceRange(4000);
    setVerifiedOnly(false);
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Mobile Filter Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
            Agricultural Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing <span className="font-bold text-forest-900">{filteredProducts.length}</span> fresh harvest listings in Bangladesh
          </p>
        </div>

        {/* Search bar in top header */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search produce or origin..."
              className="w-full text-xs bg-white border border-cream-300 rounded-xl pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden p-2.5 bg-white border border-cream-300 rounded-xl text-slate-700 flex items-center gap-1 text-xs font-bold"
          >
            <SlidersHorizontal className="w-4 h-4 text-forest-700" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            priceRange={priceRange}
            onChangePriceRange={setPriceRange}
            verifiedOnly={verifiedOnly}
            onToggleVerified={setVerifiedOnly}
            sortBy={sortBy}
            onChangeSort={setSortBy}
            onResetFilters={resetAllFilters}
          />
        </div>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end lg:hidden">
            <div className="w-full max-w-xs bg-white h-full p-4 overflow-y-auto space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-bold text-sm">Refine Filters</span>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <FilterSidebar
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => { setSelectedCategory(cat); setMobileFilterOpen(false); }}
                selectedDistrict={selectedDistrict}
                onSelectDistrict={(dist) => { setSelectedDistrict(dist); setMobileFilterOpen(false); }}
                priceRange={priceRange}
                onChangePriceRange={setPriceRange}
                verifiedOnly={verifiedOnly}
                onToggleVerified={setVerifiedOnly}
                sortBy={sortBy}
                onChangeSort={setSortBy}
                onResetFilters={resetAllFilters}
              />
            </div>
          </div>
        )}

        {/* Product Listing Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Filter Pills */}
          {(selectedCategory !== 'all' || selectedDistrict !== 'all' || verifiedOnly || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="bg-leaf-100 text-leaf-800 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                  Category: {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                </span>
              )}
              {selectedDistrict !== 'all' && (
                <span className="bg-forest-100 text-forest-800 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                  District: {selectedDistrict}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedDistrict('all')} />
                </span>
              )}
              {verifiedOnly && (
                <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                  Verified Only
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setVerifiedOnly(false)} />
                </span>
              )}
              {searchQuery && (
                <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                  Keyword: "{searchQuery}"
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </span>
              )}
              <button
                onClick={resetAllFilters}
                className="text-xs text-rose-600 hover:underline font-semibold ml-1"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onMakeOffer={(prod) => setOfferProduct(prod)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-cream-300 p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-cream-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <PackageSearch className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-forest-950">No produce matches your filters</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try expanding your search radius, adjusting the maximum price slider, or clearing category restrictions.
              </p>
              <div>
                <button
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 bg-forest-900 text-white text-xs font-bold rounded-xl hover:bg-forest-800 transition"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Offer Modal */}
      {offerProduct && (
        <OfferModal
          product={offerProduct}
          onClose={() => setOfferProduct(null)}
          onSuccess={() => setOfferProduct(null)}
        />
      )}
    </div>
  );
}
