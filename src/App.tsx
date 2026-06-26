/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Global / layout utilities (loaded eagerly to prevent UI-flicker or early route blocks)
import ScrollToTop from './components/ScrollToTop';
import FloatingInquiryPanel from './components/FloatingInquiryPanel';
import ProtectedRoute from './components/ProtectedRoute';
import { ADMIN_SECURITY_PATHS } from './config/adminPaths';

// Lazy-loaded pages to achieve code-splitting for PageSpeed metrics
const MainSite = lazy(() => import('./pages/MainSite'));
const ProductsServices = lazy(() => import('./pages/ProductsServices'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Login = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div style={{minHeight:'100vh', backgroundColor:'#E3D3BE'}} />}>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/products-services" element={<ProductsServices />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          
          {/* Secure Unpredictable Admin Access Slugs */}
          <Route path={ADMIN_SECURITY_PATHS.LOGIN} element={<Login />} />
          <Route 
            path={ADMIN_SECURITY_PATHS.DASHBOARD} 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Legacy & Decoy Route Rederiction to Cloak Portal Existence */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/admin" element={<Navigate to="/" replace />} />

          {/* Catch-all route redirecting to Home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <FloatingInquiryPanel />
    </Router>
  );
}
