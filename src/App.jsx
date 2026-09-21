import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';

import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { FitnessJourney } from './pages/FitnessJourney';
import { Recommendations } from './pages/Recommendations';
import { JoinCoach } from './pages/JoinCoach';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { Legal } from './pages/Legal';

import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Profile } from './pages/auth/Profile';
import { AdminDashboard } from './pages/admin/AdminDashboard';

export function App() {
  return (
    <div className="app-container">
      {/* Universal Navigation with Dual Experience Switcher */}
      <Navbar />

      {/* Main View Area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/fitness-journey" element={<FitnessJourney />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/join-coach" element={<JoinCoach />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/legal" element={<Legal />} />

          {/* Authentication & Profile */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin Dashboard Placeholder */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Fallback to Home for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Toast Notification Alert */}
      <Toast />

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}

export default App;
