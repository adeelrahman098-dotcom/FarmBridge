import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { MarketplaceProvider } from './context/MarketplaceContext';

import RoleSwitcherBar from './components/common/RoleSwitcherBar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ToastContainer from './components/common/ToastContainer';

// Public Pages
import HomePage from './pages/public/HomePage';
import MarketplacePage from './pages/public/MarketplacePage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import HowItWorksPage from './pages/public/HowItWorksPage';
import AboutPage from './pages/public/AboutPage';
import LoginPage from './pages/public/LoginPage';
import SignUpPage from './pages/public/SignUpPage';

// Farmer Pages
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import FarmerProducts from './pages/farmer/FarmerProducts';
import FarmerOffers from './pages/farmer/FarmerOffers';
import FarmerOrders from './pages/farmer/FarmerOrders';
import FarmerEarnings from './pages/farmer/FarmerEarnings';

// Buyer Pages
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import BuyerOffers from './pages/buyer/BuyerOffers';
import BuyerOrders from './pages/buyer/BuyerOrders';
import BuyerSaved from './pages/buyer/BuyerSaved';
import BuyerHistory from './pages/buyer/BuyerHistory';

// Transport Pages
import TransportDashboard from './pages/transport/TransportDashboard';
import AvailableJobs from './pages/transport/AvailableJobs';
import ActiveDeliveries from './pages/transport/ActiveDeliveries';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserVerification from './pages/admin/UserVerification';
import ProductModeration from './pages/admin/ProductModeration';
import ComplaintsManager from './pages/admin/ComplaintsManager';
import FinancialReports from './pages/admin/FinancialReports';

// Shared Pages
import MessagesPage from './pages/shared/MessagesPage';
import NotificationsPage from './pages/shared/NotificationsPage';
import ProfileSettingsPage from './pages/shared/ProfileSettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <MarketplaceProvider>
            <div className="min-h-screen flex flex-col bg-cream-50 text-slate-800">
              <RoleSwitcherBar />
              <Navbar />

              <main className="flex-1">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/marketplace" element={<MarketplacePage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />

                  {/* Farmer routes */}
                  <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
                  <Route path="/farmer/products" element={<FarmerProducts />} />
                  <Route path="/farmer/offers" element={<FarmerOffers />} />
                  <Route path="/farmer/orders" element={<FarmerOrders />} />
                  <Route path="/farmer/earnings" element={<FarmerEarnings />} />

                  {/* Buyer routes */}
                  <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
                  <Route path="/buyer/offers" element={<BuyerOffers />} />
                  <Route path="/buyer/orders" element={<BuyerOrders />} />
                  <Route path="/buyer/saved" element={<BuyerSaved />} />
                  <Route path="/buyer/history" element={<BuyerHistory />} />

                  {/* Transport routes */}
                  <Route path="/transport/dashboard" element={<TransportDashboard />} />
                  <Route path="/transport/available" element={<AvailableJobs />} />
                  <Route path="/transport/active" element={<ActiveDeliveries />} />

                  {/* Admin routes */}
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/verification" element={<UserVerification />} />
                  <Route path="/admin/moderation" element={<ProductModeration />} />
                  <Route path="/admin/complaints" element={<ComplaintsManager />} />
                  <Route path="/admin/reports" element={<FinancialReports />} />

                  {/* Shared routes */}
                  <Route path="/messages" element={<MessagesPage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/profile" element={<ProfileSettingsPage />} />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
              <ToastContainer />
            </div>
          </MarketplaceProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
