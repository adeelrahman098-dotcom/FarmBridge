import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sprout, LogIn, CheckCircle2, Shield, Tractor, ShoppingBag, Truck } from 'lucide-react';

export default function LoginPage() {
  const { login, switchUser, users } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.success) {
      if (res.user.role === 'farmer') navigate('/farmer/dashboard');
      else if (res.user.role === 'buyer') navigate('/buyer/dashboard');
      else if (res.user.role === 'transport') navigate('/transport/dashboard');
      else navigate('/admin/dashboard');
    } else {
      setError(res.error);
    }
  };

  const handleQuickDemo = (userId, targetPath) => {
    switchUser(userId);
    navigate(targetPath);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-forest-900 rounded-2xl flex items-center justify-center text-white mx-auto shadow-md">
          <Sprout className="w-7 h-7 text-leaf-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-forest-950">Welcome to FarmBridge</h1>
        <p className="text-xs text-slate-500">Sign in to manage your produce listings, offers, or deliveries</p>
      </div>

      {/* Quick Demo Role Cards */}
      <div className="bg-cream-100 p-4 rounded-2xl border border-cream-200 space-y-2">
        <span className="text-[11px] font-bold text-forest-900 uppercase tracking-wider block">
          ⚡ 1-Click Demo Login
        </span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => handleQuickDemo('user_farmer_1', '/farmer/dashboard')}
            className="p-2.5 bg-white rounded-xl border border-cream-300 hover:border-emerald-500 text-left transition flex items-center gap-2 group"
          >
            <Tractor className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-800 text-[11px]">Rahim (Farmer)</p>
              <p className="text-[10px] text-slate-400">Bogura Agro</p>
            </div>
          </button>

          <button
            onClick={() => handleQuickDemo('user_buyer_1', '/buyer/dashboard')}
            className="p-2.5 bg-white rounded-xl border border-cream-300 hover:border-amber-500 text-left transition flex items-center gap-2 group"
          >
            <ShoppingBag className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-800 text-[11px]">Anika (Buyer)</p>
              <p className="text-[10px] text-slate-400">Bengal Fresh</p>
            </div>
          </button>

          <button
            onClick={() => handleQuickDemo('user_transport_1', '/transport/dashboard')}
            className="p-2.5 bg-white rounded-xl border border-cream-300 hover:border-indigo-500 text-left transition flex items-center gap-2 group"
          >
            <Truck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-800 text-[11px]">Rafiqul (Transport)</p>
              <p className="text-[10px] text-slate-400">Covered Van</p>
            </div>
          </button>

          <button
            onClick={() => handleQuickDemo('user_admin_1', '/admin/dashboard')}
            className="p-2.5 bg-white rounded-xl border border-cream-300 hover:border-slate-700 text-left transition flex items-center gap-2 group"
          >
            <Shield className="w-4 h-4 text-slate-800 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-800 text-[11px]">Kabir (Admin)</p>
              <p className="text-[10px] text-slate-400">Operations</p>
            </div>
          </button>
        </div>
      </div>

      {/* Standard Form */}
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-3xl border border-cream-200 shadow-sm space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. rahim.bogura@farmbridge.bd"
            className="w-full text-xs bg-cream-50 border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-xs bg-cream-50 border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-forest-900 hover:bg-forest-800 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center justify-center gap-1.5"
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In to Account</span>
        </button>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-leaf-700 font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
