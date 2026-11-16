import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import ProductCard from '../../components/marketplace/ProductCard';
import OfferModal from '../../components/marketplace/OfferModal';
import { Heart, Sparkles } from 'lucide-react';

export default function BuyerSaved() {
  const { products, savedProductIds } = useMarketplace();
  const [offerProduct, setOfferProduct] = useState(null);

  const savedProducts = products.filter(p => savedProductIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          Saved & Bookmarked Produce
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Keep track of seasonal harvests you plan to procure in upcoming bulk shipments.
        </p>
      </div>

      {savedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-200 p-12 text-center space-y-3">
          <Heart className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-forest-900">No saved items yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the heart icon on any produce card in the marketplace to bookmark it here for quick access.
          </p>
          <Link
            to="/marketplace"
            className="inline-block px-5 py-2.5 bg-forest-900 text-white rounded-xl text-xs font-bold"
          >
            Explore Marketplace
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onMakeOffer={(prod) => setOfferProduct(prod)}
            />
          ))}
        </div>
      )}

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
