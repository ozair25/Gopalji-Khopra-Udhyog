/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global / layout utilities (loaded eagerly to prevent UI-flicker or early route blocks)
import ScrollToTop from './components/ScrollToTop';
import FloatingInquiryPanel from './components/FloatingInquiryPanel';
import ProtectedRoute from './components/ProtectedRoute';

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
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Suspense>
      <FloatingInquiryPanel />
    </Router>
  );
}
