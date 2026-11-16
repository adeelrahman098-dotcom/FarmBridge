import React from 'react';
import { Sprout, MapPin, Users, HeartHandshake, ShieldCheck, Award } from 'lucide-react';
import { BANGLADESH_DISTRICTS } from '../../utils/constants';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-leaf-600 bg-leaf-50 px-3 py-1 rounded-full border border-leaf-200">
          Our Mission & Agricultural Vision
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-forest-950 tracking-tight">
          Rooted in Bangladesh's Fertile Soil
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          FarmBridge was conceived with a clear national purpose: ensure that Bangladesh’s 16 million farming families earn the fair value of their labor while urban consumers and food processors access fresh, unadulterated produce.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-leaf-100 text-leaf-700 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-forest-950 text-base">Syndicate-Free Trade</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            By eliminating traditional wholesale cartels (সিন্ডিকেট), price discovery becomes transparent and mutually agreed between grower and buyer.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-forest-950 text-base">Verified Field Provenance</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every listed crop traces back to verified farmer national IDs, agricultural land holdings, and verified harvest schedules.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-harvest-100 text-harvest-700 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-forest-950 text-base">End-to-End Cold & Dry Freight</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Integrated logistics partnerships drastically cut transit spoilage, ensuring crisp leafy greens and fragile fruits arrive undamaged.
          </p>
        </div>
      </div>

      {/* Coverage Map Highlights */}
      <div className="bg-forest-900 text-white rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-harvest-400">
            Active Agricultural Belts
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Connecting Regional Harvest Belts
          </h2>
          <p className="text-xs sm:text-sm text-forest-200">
            From the granaries of the north to coastal belt harvests, our carrier network moves hundreds of metric tons weekly:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-forest-800/80 p-4 rounded-xl border border-forest-700">
            <p className="font-bold text-sm text-harvest-300">Bogura & Rangpur</p>
            <p className="text-[11px] text-forest-200 mt-1">Potatoes, Red Chilies, Cauliflower, Spices</p>
          </div>
          <div className="bg-forest-800/80 p-4 rounded-xl border border-forest-700">
            <p className="font-bold text-sm text-harvest-300">Rajshahi & Chapai</p>
            <p className="text-[11px] text-forest-200 mt-1">Fazli/Amrapali Mangoes, Sweet Guava, Lychee</p>
          </div>
          <div className="bg-forest-800/80 p-4 rounded-xl border border-forest-700">
            <p className="font-bold text-sm text-harvest-300">Dinajpur & Naogaon</p>
            <p className="text-[11px] text-forest-200 mt-1">Aromatic Chinigura Rice, Miniket, Lentils</p>
          </div>
          <div className="bg-forest-800/80 p-4 rounded-xl border border-forest-700">
            <p className="font-bold text-sm text-harvest-300">Jashore & Cumilla</p>
            <p className="text-[11px] text-forest-200 mt-1">Organic Cow Milk, Fresh Tomatoes, Country Eggs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
