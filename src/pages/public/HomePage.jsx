import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { PRODUCE_CATEGORIES, BANGLADESH_DISTRICTS } from '../../utils/constants';
import ProductCard from '../../components/marketplace/ProductCard';
import OfferModal from '../../components/marketplace/OfferModal';
import {
  Search,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Truck,
  ArrowRight,
  Sprout,
  CheckCircle,
  Users,
  Wheat,
  HandCoins,
  Scale
} from 'lucide-react';

export default function HomePage() {
  const { products } = useMarketplace();
  const { users } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedProductForOffer, setSelectedProductForOffer] = useState(null);

  const featuredProducts = products.filter(p => p.status === 'active').slice(0, 6);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (selectedDistrict !== 'all') params.set('district', selectedDistrict);
    navigate(`/marketplace?${params.toString()}`);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-forest-950 text-white pt-16 pb-24 sm:py-28 px-4 sm:px-6 lg:px-8">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#4ade80_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 border border-forest-700/80 text-leaf-300 text-xs font-semibold shadow-inner">
            <Sprout className="w-4 h-4 text-leaf-400" />
            <span>Empowering Bangladeshi Farmers • Direct B2B Agricultural Trade</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
            From Farm to Market, <br />
            <span className="text-leaf-400">Made Simple.</span>
          </h1>

          <p className="text-base sm:text-xl text-forest-200 max-w-2xl mx-auto font-normal leading-relaxed">
            Eliminate traditional syndicates. Connect verified farmers directly with wholesale buyers, retailers, and food processors across Bangladesh with transparent pricing and tracked logistics.
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-2 border border-cream-200 text-slate-800"
          >
            {/* Search input */}
            <div className="flex items-center gap-2 px-3 py-2 w-full sm:flex-1">
              <Search className="w-5 h-5 text-forest-700 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search potatoes, mangoes, chinigura rice..."
                className="w-full text-sm font-medium focus:outline-none placeholder-slate-400"
              />
            </div>

            <div className="hidden sm:block w-[1px] h-8 bg-cream-300"></div>

            {/* District dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 w-full sm:w-auto">
              <MapPin className="w-4 h-4 text-leaf-600 flex-shrink-0" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="text-xs font-semibold bg-transparent focus:outline-none cursor-pointer text-slate-700"
              >
                <option value="all">All Bangladesh</option>
                {BANGLADESH_DISTRICTS.map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 bg-leaf-600 hover:bg-leaf-700 text-white text-sm font-bold rounded-xl sm:rounded-2xl transition shadow-md flex items-center justify-center gap-2"
            >
              <span>Explore Produce</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Stats Banner */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center max-w-3xl mx-auto">
            <div className="p-3 bg-forest-900/60 rounded-xl border border-forest-800">
              <p className="text-xl sm:text-2xl font-black text-leaf-400">16+ Hubs</p>
              <p className="text-xs text-forest-300">Across Bangladesh</p>
            </div>
            <div className="p-3 bg-forest-900/60 rounded-xl border border-forest-800">
              <p className="text-xl sm:text-2xl font-black text-harvest-400">৳ 2.8M+</p>
              <p className="text-xs text-forest-300">Monthly Produce Traded</p>
            </div>
            <div className="p-3 bg-forest-900/60 rounded-xl border border-forest-800">
              <p className="text-xl sm:text-2xl font-black text-leaf-400">100%</p>
              <p className="text-xs text-forest-300">Verified Farmers</p>
            </div>
            <div className="p-3 bg-forest-900/60 rounded-xl border border-forest-800">
              <p className="text-xl sm:text-2xl font-black text-harvest-400">3% Fixed</p>
              <p className="text-xs text-forest-300">Fair Platform Fee</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
              Explore by Agricultural Category
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Sourced fresh from regional fields and specialized farming clusters.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="text-xs font-bold text-leaf-700 hover:text-leaf-800 flex items-center gap-1 transition"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {PRODUCE_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
            <Link
              key={cat.id}
              to={`/marketplace?category=${cat.id}`}
              className="group bg-white p-4 rounded-2xl border border-cream-200 hover:border-leaf-400 hover:shadow-md transition text-center flex flex-col items-center justify-center space-y-2"
            >
              <div className="w-12 h-12 rounded-xl bg-forest-50 group-hover:bg-leaf-100 text-forest-700 group-hover:text-leaf-700 flex items-center justify-center transition">
                <Wheat className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-forest-900">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCE LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-leaf-600 block">
              Direct from Fields
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
              Fresh Harvests Ready for Order
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top quality agricultural produce ready for immediate dispatch across Bangladesh.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="px-4 py-2 rounded-xl border border-forest-700 text-forest-800 hover:bg-forest-50 text-xs font-bold self-start sm:self-auto transition"
          >
            Browse Full Catalog ({products.length} Products)
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onMakeOffer={(prod) => setSelectedProductForOffer(prod)}
            />
          ))}
        </div>
      </section>

      {/* HOW FARMBRIDGE WORKS (4-STEP JOURNEY) */}
      <section className="bg-cream-100 py-16 sm:py-20 border-y border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-leaf-700">
              The Journey
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-forest-950 mt-1">
              How FarmBridge Connects the Nation
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From harvesting in Bogura to market stalls in Dhaka, experience end-to-end transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-forest-900 text-white font-extrabold flex items-center justify-center text-sm mb-4">
                1
              </div>
              <h3 className="font-bold text-forest-900 text-base mb-1">Direct Field Listing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verified farmers list their harvest with expected quantities, photos, harvest dates, and transparent BDT base rates.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-leaf-600 text-white font-extrabold flex items-center justify-center text-sm mb-4">
                2
              </div>
              <h3 className="font-bold text-forest-900 text-base mb-1">Fair Offer Negotiation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buyers propose quantities and target prices. Farmers accept, counteroffer, or negotiate in real-time chat.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-harvest-500 text-white font-extrabold flex items-center justify-center text-sm mb-4">
                3
              </div>
              <h3 className="font-bold text-forest-900 text-base mb-1">Assigned Transport</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Logistics partners claim delivery routes. Live 8-stage visual tracking updates pickup, highway transit, and delivery.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-sm mb-4">
                4
              </div>
              <h3 className="font-bold text-forest-900 text-base mb-1">Guaranteed Settlement</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inspection upon delivery. Farmer payouts are processed with clear transparent 3% facilitation statements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FARMER SPOTLIGHT & TRUST BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 rounded-3xl overflow-hidden text-white p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-harvest-400">
              Farmer Spotlight • Bogura
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              "FarmBridge gave me direct access to buyers in Dhaka without middlemen cuts."
            </h2>
            <p className="text-sm text-forest-200 leading-relaxed">
              Rahim Uddin has farmed in Shibganj, Bogura for 18 years. Through FarmBridge, his cooperative has fulfilled over 140 bulk orders of potatoes and cauliflower, receiving fair payments within 48 hours of delivery.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80"
                alt="Rahim Uddin"
                className="w-12 h-12 rounded-full border-2 border-leaf-400 object-cover"
              />
              <div>
                <p className="font-bold text-sm">Rahim Uddin</p>
                <p className="text-xs text-forest-300">Lead Farmer, Barendra Green Agro</p>
              </div>
            </div>
          </div>

          <div className="bg-forest-800/70 p-6 rounded-2xl border border-forest-700 space-y-4">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-leaf-400" />
              Why Bangladesh Trusts FarmBridge
            </h3>
            <ul className="space-y-3 text-xs text-forest-200">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-leaf-400 flex-shrink-0 mt-0.5" />
                <span>Strict KYC verification of farmer land documents and trade licenses.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-leaf-400 flex-shrink-0 mt-0.5" />
                <span>Transparent offer history and recorded negotiations prevent disputes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-leaf-400 flex-shrink-0 mt-0.5" />
                <span>Integrated transport partner logistics network covering 64 districts.</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                to="/signup"
                className="inline-block px-5 py-2.5 bg-leaf-500 hover:bg-leaf-600 text-white text-xs font-bold rounded-xl transition shadow"
              >
                Join as a Farmer or Buyer Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Modal */}
      {selectedProductForOffer && (
        <OfferModal
          product={selectedProductForOffer}
          onClose={() => setSelectedProductForOffer(null)}
          onSuccess={() => setSelectedProductForOffer(null)}
        />
      )}
    </div>
  );
}
