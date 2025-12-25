import React from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import AboutUs from './pages/About.jsx'
import ContactUs from './pages/Contact.jsx'
import Register from './pages/Register.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'
import Login from './pages/Login.jsx'
import ProductDetails from './pages/ProductDetails.jsx'

// Admin Components
import AdminLayout from './components/admin/AdminLayout.jsx'
import AdminProducts from './pages/admin/AdminProducts.jsx'
import AdminAddProduct from './pages/admin/AdminAddProduct.jsx'
import AdminEditProduct from './pages/admin/AdminEditProduct.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'


const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/login' element={<Login />} />

        {/* Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/products" replace />} />
            <Route path='products' element={<AdminProducts />} />
            <Route path='products/add' element={<AdminAddProduct />} />
            <Route path='products/edit/:id' element={<AdminEditProduct />} />
          </Route>
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
