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
import UserProfile from './pages/UserProfile.jsx'
import NotFound from './pages/NotFound.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import AccountSettings from './pages/AccountSettings.jsx'
// Admin Components
import AdminLayout from './components/admin/AdminLayout.jsx'
import AdminProducts from './pages/admin/AdminProducts.jsx'
import AdminAddProduct from './pages/admin/AdminAddProduct.jsx'
import AdminEditProduct from './pages/admin/AdminEditProduct.jsx'
import AdminOrders from './pages/admin/AdminOrders.jsx'
import AdminOrderDetails from './pages/admin/AdminOrderDetails.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import MyOrders from './pages/MyOrders.jsx'


import { Toaster } from 'react-hot-toast'

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Toaster position="top-right" />
      {!isAdminRoute && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order-success' element={<OrderSuccess />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/login' element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/account-settings' element={<AccountSettings />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='products' element={<AdminProducts />} />
            <Route path='products/add' element={<AdminAddProduct />} />
            <Route path='products/edit/:id' element={<AdminEditProduct />} />
            <Route path='orders' element={<AdminOrders />} />
            <Route path='order/:id' element={<AdminOrderDetails />} />
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
