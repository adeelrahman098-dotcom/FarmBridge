import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, XCircle, CheckCircle2, Clock, User, Tractor, Truck } from 'lucide-react';

export default function UserVerification() {
  const { users, updateProfile } = useAuth();
  const [filter, setFilter] = useState('all');

  const verificationList = users.filter(u => u.role !== 'admin');

  const filtered = verificationList.filter(u => {
    if (filter === 'all') return true;
    return u.verificationStatus === filter;
  });

  const handleUpdateStatus = (user, newStatus) => {
    // update in list
    const updatedUsers = users.map(u => u.id === user.id ? { ...u, verificationStatus: newStatus } : u);
    localStorage.setItem('farmbridge_users', JSON.stringify(updatedUsers));
    window.location.reload();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          Producer & Transporter KYC Verification Queue
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review legal identity, national voter ID (NID), land mutation deeds, and vehicle licenses.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 text-xs font-bold border-b border-cream-300 pb-2">
        {['all', 'pending', 'verified', 'unverified'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3.5 py-1.5 rounded-xl capitalize transition ${
              filter === status ? 'bg-forest-900 text-white' : 'text-slate-600 hover:bg-cream-100'
            }`}
          >
            {status} ({verificationList.filter(u => status === 'all' || u.verificationStatus === status).length})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-cream-100/70 text-slate-600 font-bold uppercase border-b border-cream-200">
              <tr>
                <th className="py-3 px-3">User & Organization</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">District</th>
                <th className="py-3 px-3">Contact</th>
                <th className="py-3 px-3">Current Status</th>
                <th className="py-3 px-3 text-right">KYC Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100 font-medium">
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-cream-50/60">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-10 h-10 rounded-xl object-cover border border-cream-300"
                      />
                      <div>
                        <h4 className="font-bold text-forest-950 text-xs sm:text-sm">{user.name}</h4>
                        <p className="text-[11px] text-slate-500">
                          {user.profile?.farmName || user.profile?.businessName || user.profile?.companyName || 'Individual'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 capitalize font-semibold text-slate-700">
                    {user.role}
                  </td>
                  <td className="py-3.5 px-3 text-slate-700">
                    {user.profile?.district || 'Bangladesh'}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">
                    <p>{user.phone}</p>
                    <p className="text-[10px] text-slate-400">{user.email}</p>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize ${
                      user.verificationStatus === 'verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : user.verificationStatus === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {user.verificationStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {user.verificationStatus !== 'verified' && (
                        <button
                          onClick={() => handleUpdateStatus(user, 'verified')}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] transition flex items-center gap-1 shadow-xs"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" /> Approve KYC
                        </button>
                      )}
                      {user.verificationStatus === 'verified' && (
                        <button
                          onClick={() => handleUpdateStatus(user, 'pending')}
                          className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold text-[11px] transition"
                        >
                          Re-open Review
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
