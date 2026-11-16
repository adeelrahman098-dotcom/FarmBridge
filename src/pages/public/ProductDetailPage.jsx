import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT, formatDate } from '../../utils/formatters';
import OfferModal from '../../components/marketplace/OfferModal';
import ChatDrawer from '../../components/chat/ChatDrawer';
import ProductCard from '../../components/marketplace/ProductCard';
import {
  MapPin,
  ShieldCheck,
  Heart,
  Calendar,
  Layers,
  MessageSquare,
  HandCoins,
  ArrowLeft,
  Share2,
  CheckCircle,
  Truck,
  Star
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { products, savedProductIds, toggleSaveProduct } = useMarketplace();
  const { currentUser, users } = useAuth();

  const product = products.find(p => p.id === id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-forest-950">Produce Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The listing may have expired or been removed.</p>
        <Link to="/marketplace" className="mt-4 inline-block px-5 py-2.5 bg-forest-900 text-white rounded-xl text-xs font-bold">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const farmer = users.find(u => u.id === product.farmerId);
  const isSaved = savedProductIds.includes(product.id);

  // Related products in same category or district
  const related = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.district === product.district))
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back Link */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-forest-900 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Listings
        </button>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Photo Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-cream-100 border border-cream-200 shadow-sm relative">
            <img
              src={product.images?.[selectedImageIndex] || product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-forest-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </div>
            <button
              onClick={() => toggleSaveProduct(product.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur shadow-md transition ${
                isSaved ? 'bg-rose-500 text-white' : 'bg-white/90 text-slate-700 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails if multiple */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition ${
                    selectedImageIndex === idx ? 'border-leaf-600 ring-2 ring-leaf-200' : 'border-cream-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Logistics & Packaging Notice */}
          <div className="bg-cream-100 p-4 rounded-2xl border border-cream-200 flex items-start gap-3 text-xs text-slate-700">
            <Truck className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-forest-950 block">Logistics & Dispatch Coordination</span>
              <p className="mt-0.5 text-slate-600 leading-relaxed">
                Orders are fulfilled directly from farm gates with certified transport partners. Escrow settlement protection applies to every order.
              </p>
            </div>
          </div>
        </div>

        {/* Product Details & Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-leaf-700 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{product.district}, Bangladesh</span>
              <span>•</span>
              <span className="text-slate-500">{product.address}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950 leading-tight">
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="mt-4 p-4 rounded-2xl bg-forest-50 border border-forest-100 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Base Asking Price</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-forest-950">
                    {formatBDT(product.price)}
                  </span>
                  <span className="text-sm font-semibold text-slate-600">/ {product.unit}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">Total Volume</span>
                <span className="text-sm font-bold text-forest-900">
                  {product.quantity.toLocaleString()} {product.unit}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-cream-50 p-3 rounded-xl border border-cream-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Min Order Qty</span>
              <span className="font-bold text-slate-800 text-sm">{product.minOrderQuantity} {product.unit}</span>
            </div>
            <div className="bg-cream-50 p-3 rounded-xl border border-cream-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Harvest Date</span>
              <span className="font-bold text-slate-800 text-sm">{formatDate(product.harvestDate)}</span>
            </div>
            <div className="bg-cream-50 p-3 rounded-xl border border-cream-200 col-span-2 sm:col-span-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Availability</span>
              <span className="font-bold text-emerald-700 text-sm">{product.availabilityDate}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Produce Description & Quality Notes
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-2xl border border-cream-200">
              {product.description}
            </p>
          </div>

          {/* Farmer Card */}
          {farmer && (
            <div className="p-4 bg-white rounded-2xl border border-cream-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={farmer.avatar}
                  alt={farmer.name}
                  className="w-12 h-12 rounded-xl object-cover border border-forest-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-forest-950 text-sm">{farmer.name}</h4>
                    {farmer.verificationStatus === 'verified' && (
                      <ShieldCheck className="w-4 h-4 text-leaf-600" title="Verified Producer" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{farmer.profile?.farmName}</p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-600">
                    <span className="flex items-center gap-0.5 text-harvest-600 font-bold">
                      <Star className="w-3 h-3 fill-current" /> {farmer.profile?.rating || '4.9'}
                    </span>
                    <span>•</span>
                    <span>Response: {farmer.profile?.responseRate || '95%'}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => currentUser
                  ? setChatOpen(true)
                  : navigate('/login', { state: { from: { pathname: location.pathname } } })}
                className="px-3.5 py-2 border border-cream-300 hover:border-forest-600 text-forest-800 hover:bg-cream-50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <MessageSquare className="w-3.5 h-3.5 text-forest-700" />
                <span>Message</span>
              </button>
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => setOfferModalOpen(true)}
              className="w-full sm:flex-1 py-3.5 bg-leaf-600 hover:bg-leaf-700 text-white text-sm font-bold rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <HandCoins className="w-5 h-5 text-harvest-300" />
              <span>Make an Offer / Negotiate</span>
            </button>

            <button
              onClick={handleShare}
              className="w-full sm:w-auto px-4 py-3.5 bg-white border border-cream-300 hover:bg-cream-50 text-slate-700 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>{copied ? 'Copied Link!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <div className="pt-10 border-t border-cream-200">
          <div className="mb-6">
            <h3 className="text-xl font-extrabold text-forest-950">
              Related Produce from This Region
            </h3>
            <p className="text-xs text-slate-500">Other harvests you might be interested in consolidating into your shipment</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(rel => (
              <ProductCard
                key={rel.id}
                product={rel}
                onMakeOffer={() => {
                  setOfferModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Offer Modal */}
      {offerModalOpen && (
        <OfferModal
          product={product}
          onClose={() => setOfferModalOpen(false)}
          onSuccess={() => setOfferModalOpen(false)}
        />
      )}

      {/* Chat Drawer */}
      {chatOpen && farmer && (
        <ChatDrawer
          recipient={farmer}
          product={product}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  );
}
