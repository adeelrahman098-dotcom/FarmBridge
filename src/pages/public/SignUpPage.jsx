import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BANGLADESH_DISTRICTS } from '../../utils/constants';
import { Sprout, Tractor, ShoppingBag, Truck, Check } from 'lucide-react';

export default function SignUpPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('farmer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+880 1');
  const [district, setDistrict] = useState('Bogura');
  const [farmOrBusinessName, setFarmOrBusinessName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({
      name,
      email,
      phone,
      role,
      district,
      farmOrBusinessName
    });

    if (role === 'farmer') navigate('/farmer/dashboard');
    else if (role === 'buyer') navigate('/buyer/dashboard');
    else navigate('/transport/dashboard');
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-forest-900 rounded-2xl flex items-center justify-center text-white mx-auto shadow-md">
          <Sprout className="w-7 h-7 text-leaf-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-forest-950">Join FarmBridge Bangladesh</h1>
        <p className="text-xs text-slate-500">Register as a producer, bulk buyer, or logistics fleet driver</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl border border-cream-200 shadow-sm space-y-5">
        {/* Role Choice */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Select Your Marketplace Role
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setRole('farmer')}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                role === 'farmer'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20'
                  : 'border-cream-300 hover:bg-cream-50 text-slate-600'
              }`}
            >
              <Tractor className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-bold">Farmer</span>
              <span className="text-[10px] text-slate-500">Sell Harvest</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                role === 'buyer'
                  ? 'border-amber-600 bg-amber-50 text-amber-950 ring-2 ring-amber-500/20'
                  : 'border-cream-300 hover:bg-cream-50 text-slate-600'
              }`}
            >
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-bold">Buyer</span>
              <span className="text-[10px] text-slate-500">Procure Bulk</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('transport')}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                role === 'transport'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500/20'
                  : 'border-cream-300 hover:bg-cream-50 text-slate-600'
              }`}
            >
              <Truck className="w-5 h-5 text-indigo-600" />
              <span className="text-xs font-bold">Transporter</span>
              <span className="text-[10px] text-slate-500">Deliver Cargo</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Legal Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Md. Shafiul Islam"
            className="w-full text-xs bg-cream-50 border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            {role === 'farmer' && 'Farm Name / Cooperative'}
            {role === 'buyer' && 'Business / Supermarket Name'}
            {role === 'transport' && 'Transport Company / Vehicle Registration'}
          </label>
          <input
            type="text"
            required
            value={farmOrBusinessName}
            onChange={(e) => setFarmOrBusinessName(e.target.value)}
            placeholder={
              role === 'farmer' ? 'e.g. Shibganj Agro Farm' : role === 'buyer' ? 'e.g. Dhally Super Shop' : 'e.g. 7-Ton Covered Truck'
            }
            className="w-full text-xs bg-cream-50 border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full text-xs bg-cream-50 border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone (Bangladesh)</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-xs bg-cream-50 border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Home / Hub District</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full text-xs bg-cream-50 border border-cream-300 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
          >
            {BANGLADESH_DISTRICTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-leaf-600 hover:bg-leaf-700 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center justify-center gap-1.5"
        >
          <Check className="w-4 h-4" />
          <span>Complete Registration</span>
        </button>

        <p className="text-center text-xs text-slate-500 pt-1">
          Already registered?{' '}
          <Link to="/login" className="text-leaf-700 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
