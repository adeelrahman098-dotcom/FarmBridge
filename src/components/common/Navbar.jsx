import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  Sprout,
  Menu,
  X,
  Bell,
  MessageSquare,
  User,
  ShoppingBag,
  Tractor,
  Truck,
  Shield,
  ChevronDown,
  LogOut,
  Settings
} from 'lucide-react';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const getDashboardPath = () => {
    switch (currentUser?.role) {
      case 'farmer': return '/farmer/dashboard';
      case 'buyer': return '/buyer/dashboard';
      case 'transport': return '/transport/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/marketplace';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'farmer': return Tractor;
      case 'buyer': return ShoppingBag;
      case 'transport': return Truck;
      case 'admin': return Shield;
      default: return User;
    }
  };

  const RoleIcon = getRoleIcon(currentUser?.role);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-forest-900 flex items-center justify-center text-white shadow-sm group-hover:bg-leaf-700 transition">
              <Sprout className="w-6 h-6 text-leaf-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-forest-950">
                  Farm<span className="text-leaf-600">Bridge</span>
                </span>
                <span className="bg-forest-100 text-forest-800 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                  BD ৳
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                Direct Agri Marketplace
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/marketplace"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/marketplace')
                  ? 'bg-leaf-50 text-leaf-700 font-semibold'
                  : 'text-slate-600 hover:text-forest-900 hover:bg-cream-100'
              }`}
            >
              Marketplace
            </Link>

            <Link
              to="/how-it-works"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/how-it-works')
                  ? 'bg-leaf-50 text-leaf-700 font-semibold'
                  : 'text-slate-600 hover:text-forest-900 hover:bg-cream-100'
              }`}
            >
              How It Works
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/about')
                  ? 'bg-leaf-50 text-leaf-700 font-semibold'
                  : 'text-slate-600 hover:text-forest-900 hover:bg-cream-100'
              }`}
            >
              About
            </Link>

            {/* Role Dashboard Link */}
            <Link
              to={getDashboardPath()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-forest-50 text-forest-900 hover:bg-forest-100 transition border border-forest-200/60"
            >
              <RoleIcon className="w-4 h-4 text-forest-700" />
              <span>
                {currentUser?.role === 'farmer' && 'Farmer Hub'}
                {currentUser?.role === 'buyer' && 'Buyer Hub'}
                {currentUser?.role === 'transport' && 'Transport Hub'}
                {currentUser?.role === 'admin' && 'Admin Console'}
              </span>
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {currentUser && (
              <>
                <Link
                  to="/messages"
                  className="p-2 text-slate-600 hover:text-forest-900 hover:bg-cream-100 rounded-lg relative"
                  title="Chat & Inquiries"
                >
                  <MessageSquare className="w-5 h-5" />
                </Link>

                <Link
                  to="/notifications"
                  className="p-2 text-slate-600 hover:text-forest-900 hover:bg-cream-100 rounded-lg relative"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            {/* User Profile Dropdown */}
            {currentUser ? <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2 rounded-full border border-cream-300 hover:border-forest-400 bg-white hover:bg-cream-50 transition"
              >
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-7 h-7 rounded-full object-cover border border-forest-200"
                />
                <span className="text-xs font-semibold text-forest-950 hidden sm:inline max-w-[100px] truncate">
                  {currentUser?.name}
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-forest-100 text-forest-800 hidden md:inline">
                  {currentUser?.role}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 pr-0.5" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-cream-200 py-2 z-50 animate-fade-in"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-cream-100">
                    <p className="text-xs font-semibold text-slate-500">Signed in as</p>
                    <p className="text-sm font-bold text-forest-900 truncate">{currentUser?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
                    <p className="text-xs text-forest-700 font-medium mt-1 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-leaf-500"></span>
                      {currentUser?.profile?.district}, BD • {currentUser?.verificationStatus}
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      to={getDashboardPath()}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-cream-50 hover:text-forest-900"
                    >
                      <RoleIcon className="w-4 h-4 text-forest-600" />
                      Role Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-cream-50 hover:text-forest-900"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      Profile & Settings
                    </Link>
                  </div>

                  <div className="border-t border-cream-100 pt-1">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out / Reset
                    </button>
                  </div>
                </div>
              )}
            </div> : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-3 py-2 text-sm font-semibold text-forest-900 hover:bg-cream-100 rounded-lg">
                  Sign In
                </Link>
                <Link to="/signup" className="px-3 py-2 text-sm font-semibold text-white bg-forest-900 hover:bg-forest-800 rounded-lg">
                  Create Account
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-cream-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-cream-200 bg-white px-4 pt-3 pb-5 space-y-2">
          <Link
            to="/marketplace"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-cream-100"
          >
            Marketplace
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-cream-100"
          >
            How It Works
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-cream-100"
          >
            About FarmBridge
          </Link>
          {currentUser && (
            <Link
              to={getDashboardPath()}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold bg-forest-50 text-forest-900"
            >
              <RoleIcon className="w-5 h-5 text-forest-700" />
              <span>My Role Dashboard</span>
            </Link>
          )}
          {!currentUser && (
            <div className="flex gap-2 pt-1">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center px-3 py-2 rounded-lg font-semibold text-forest-900 bg-cream-100">Sign In</Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center px-3 py-2 rounded-lg font-semibold text-white bg-forest-900">Create Account</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
