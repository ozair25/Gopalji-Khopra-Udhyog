/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Industries from './components/Industries';
import WhyChooseUs from './components/WhyChooseUs';
import QualityControl from './components/QualityControl';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';

import ProtectedRoute from './components/ProtectedRoute';
import { ADMIN_SECURITY_PATHS } from './config/adminPaths';

function MainSite() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <WhyChooseUs />
        <Industries />
        <QualityControl />
        <AboutUs />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainSite />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Secret Login Route */}
        <Route
          path={ADMIN_SECURITY_PATHS.LOGIN}
          element={<Login />}
        />

        {/* Secret Admin Dashboard */}
        <Route
          path={ADMIN_SECURITY_PATHS.DASHBOARD}
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
