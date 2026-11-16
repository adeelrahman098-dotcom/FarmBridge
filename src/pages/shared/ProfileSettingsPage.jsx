import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BANGLADESH_DISTRICTS } from '../../utils/constants';
import { User, ShieldCheck, CheckCircle2, Save } from 'lucide-react';

export default function ProfileSettingsPage() {
  const { currentUser, updateProfile } = useAuth();

  const [name, setName] = useState(currentUser.name || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [district, setDistrict] = useState(currentUser.profile?.district || 'Bogura');
  const [address, setAddress] = useState(currentUser.profile?.address || currentUser.profile?.deliveryAddress || '');
  const [farmOrBusinessName, setFarmOrBusinessName] = useState(
    currentUser.profile?.farmName || currentUser.profile?.businessName || currentUser.profile?.companyName || ''
  );
  const [bio, setBio] = useState(currentUser.profile?.bio || '');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      profile: {
        district,
        address,
        deliveryAddress: currentUser.role === 'buyer' ? address : undefined,
        farmName: currentUser.role === 'farmer' ? farmOrBusinessName : undefined,
        businessName: currentUser.role === 'buyer' ? farmOrBusinessName : undefined,
        companyName: currentUser.role === 'transport' ? farmOrBusinessName : undefined,
        bio
      }
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          Account & Profile Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your contact credentials, official business identity, and delivery coordinates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-sm space-y-6">
        {/* Profile Card Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-cream-200">
          <img
            src={currentUser.avatar}
            alt=""
            className="w-16 h-16 rounded-2xl object-cover border-2 border-cream-300"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-forest-950 text-base">{currentUser.name}</h3>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-forest-100 text-forest-800">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-500">{currentUser.email}</p>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Status: {currentUser.verificationStatus}</span>
            </span>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs bg-cream-50 border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-xs bg-cream-50 border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              {currentUser.role === 'farmer' && 'Farm Name / Cooperative'}
              {currentUser.role === 'buyer' && 'Business / Supermarket Name'}
              {currentUser.role === 'transport' && 'Transport Company Name'}
              {currentUser.role === 'admin' && 'Department'}
            </label>
            <input
              type="text"
              value={farmOrBusinessName}
              onChange={(e) => setFarmOrBusinessName(e.target.value)}
              className="w-full text-xs bg-cream-50 border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Home District</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full text-xs bg-cream-50 border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
            >
              {BANGLADESH_DISTRICTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            {currentUser.role === 'farmer' ? 'Farm Address / Pickup Point' : 'Delivery / Depot Address'}
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full text-xs bg-cream-50 border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
          />
        </div>

        {currentUser.role === 'farmer' && (
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Farm Bio / Agricultural Experience</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell buyers about your farming methods, organic standards..."
              className="w-full text-xs bg-cream-50 border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-cream-200">
          {saved ? (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
            </span>
          ) : (
            <span></span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-forest-900 hover:bg-forest-800 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
