import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Sparkles, Tractor, ShoppingBag, Truck } from 'lucide-react';

export default function RoleSwitcherBar() {
  const { currentUser, switchUser } = useAuth();

  const demoAccounts = [
    {
      id: 'user_farmer_1',
      name: 'Rahim Uddin',
      role: 'Farmer',
      location: 'Bogura',
      badge: 'Barendra Agro',
      icon: Tractor,
      color: 'bg-emerald-700 hover:bg-emerald-800 text-white'
    },
    {
      id: 'user_buyer_1',
      name: 'Anika Tabassum',
      role: 'Buyer',
      location: 'Dhaka',
      badge: 'Bengal Fresh',
      icon: ShoppingBag,
      color: 'bg-amber-600 hover:bg-amber-700 text-white'
    },
    {
      id: 'user_transport_1',
      name: 'Rafiqul Islam',
      role: 'Transport',
      location: '7T Covered Van',
      badge: 'Green Road',
      icon: Truck,
      color: 'bg-indigo-600 hover:bg-indigo-700 text-white'
    },
    {
      id: 'user_admin_1',
      name: 'Kabir Chowdhury',
      role: 'Admin',
      location: 'Head Ops',
      badge: 'Platform Governance',
      icon: Shield,
      color: 'bg-slate-800 hover:bg-slate-900 text-white'
    }
  ];

  return (
    <div className="bg-forest-900 text-forest-100 text-xs border-b border-forest-800/80 py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 font-medium text-emerald-400">
          <Sparkles className="w-3.5 h-3.5 text-harvest-400 animate-pulse" />
          <span className="hidden sm:inline">Role Playground:</span>
          <span className="text-forest-200">Switch persona to test workflows:</span>
        </div>

        <div className="flex items-center flex-wrap gap-1.5">
          {demoAccounts.map(account => {
            const isActive = currentUser?.id === account.id;
            const Icon = account.icon;
            return (
              <button
                key={account.id}
                onClick={() => switchUser(account.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all ${
                  isActive
                    ? 'ring-2 ring-harvest-400 ring-offset-1 ring-offset-forest-900 font-semibold shadow-sm ' + account.color
                    : 'bg-forest-800/70 hover:bg-forest-700/80 text-forest-200'
                }`}
                title={`Switch to ${account.name} (${account.role} - ${account.badge})`}
              >
                <Icon className="w-3 h-3" />
                <span>{account.role}: {account.name.split(' ')[0]}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-harvest-400 ml-0.5"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
