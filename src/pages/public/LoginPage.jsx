import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sprout, LogIn } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    const roleHome = {
      farmer: '/farmer/dashboard',
      buyer: '/buyer/dashboard',
      transport: '/transport/dashboard',
      admin: '/admin/dashboard'
    };
    navigate(location.state?.from?.pathname || roleHome[result.user.role] || '/', { replace: true });
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-xs bg-cream-50 border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-forest-900 hover:bg-forest-800 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center justify-center gap-1.5"
        >
          <LogIn className="w-4 h-4" />
          <span>{isSubmitting ? 'Signing In...' : 'Sign In to Account'}</span>
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
