import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Phone, Mail, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';
import { BANGLADESH_DISTRICTS } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-forest-200 border-t border-forest-900 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-800/60">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-leaf-600 flex items-center justify-center text-white shadow-md">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Farm<span className="text-leaf-400">Bridge</span>
              </span>
            </div>
            <p className="text-sm text-forest-300 max-w-sm leading-relaxed">
              Bridging Bangladesh's agrarian heartland directly to bulk buyers, wholesale markets, and food processors. Empowering farmers with fair prices, transparent negotiations, and end-to-end tracked logistics.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-forest-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-leaf-400" />
                <span>Verified Farmers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-harvest-400" />
                <span>Zero Middlemen Fees</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm text-forest-300">
              <li><Link to="/marketplace?category=vegetables" className="hover:text-leaf-400 transition">Fresh Vegetables</Link></li>
              <li><Link to="/marketplace?category=fruits" className="hover:text-leaf-400 transition">Seasonal Fruits</Link></li>
              <li><Link to="/marketplace?category=grains" className="hover:text-leaf-400 transition">Aromatic Rice & Grains</Link></li>
              <li><Link to="/marketplace?category=spices" className="hover:text-leaf-400 transition">Spices & Chili</Link></li>
              <li><Link to="/marketplace?category=dairy_poultry" className="hover:text-leaf-400 transition">Dairy & Free-range Eggs</Link></li>
            </ul>
          </div>

          {/* Agro Hubs */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Key Agro Hubs
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs text-forest-300">
              {BANGLADESH_DISTRICTS.slice(0, 10).map(district => (
                <span key={district} className="bg-forest-900/80 px-2 py-1 rounded border border-forest-800">
                  {district}
                </span>
              ))}
            </div>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Agri Support Center
            </h4>
            <ul className="space-y-3 text-sm text-forest-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-leaf-400 flex-shrink-0" />
                <span>+880 9612-FARMBD (3276)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-leaf-400 flex-shrink-0" />
                <span>support@farmbridge.com.bd</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-leaf-400 flex-shrink-0 mt-0.5" />
                <span>Level 4, Krishi Bhaban, Farmgate, Dhaka-1215</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-forest-400 gap-4">
          <p>© 2026 FarmBridge Bangladesh. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-forest-200">About Platform</Link>
            <Link to="/how-it-works" className="hover:text-forest-200">How It Works</Link>
            <span className="text-leaf-400 font-medium">Standard Commission: 3%</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
