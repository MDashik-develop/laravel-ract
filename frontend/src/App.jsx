import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/common/Home'
import Shop from './components/common/Shop'
import Login from './components/admin/Login'
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './components/admin/Dashboard'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth'
//Cetagory
import { default as ShowCategories } from './components/admin/category/Show'
import { default as CreateCategories } from './components/admin/category/Create'
import { default as EditCategories } from './components/admin/category/Edit'
//Brand
import { default as ShowBrand } from './components/admin/brand/Show'
import { default as CreateBrand } from './components/admin/brand/Create'
import { default as EditBrand } from './components/admin/brand/Edit'
//Product
import { default as ShowProduct } from './components/admin/product/Show'
import { default as CreateProduct } from './components/admin/product/Create'
import { default as EditProduct } from './components/admin/product/Edit'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <AdminRequireAuth>
              <Dashboard />
            </AdminRequireAuth>
          } />

          {/* Category */}
          <Route path="/admin/categories" element={
            <AdminRequireAuth>
              <ShowCategories />
            </AdminRequireAuth>
          } />
          <Route path="/admin/categories/create" element={
            <AdminRequireAuth>
              <CreateCategories />
            </AdminRequireAuth>
          } />
          <Route path="/admin/categories/edit/:id" element={
            <AdminRequireAuth>
              <EditCategories />
            </AdminRequireAuth>
          } />

          {/* Brand */}
          <Route path="/admin/brands" element={
            <AdminRequireAuth>
              <ShowBrand />
            </AdminRequireAuth>
          } />
          <Route path="/admin/brands/create" element={
            <AdminRequireAuth>
              <CreateBrand />
            </AdminRequireAuth>
          } />
          <Route path="/admin/brands/edit/:id" element={
            <AdminRequireAuth>
              <EditBrand />
            </AdminRequireAuth>
          } />

          {/* Product */}
          <Route path="/admin/products" element={
            <AdminRequireAuth>
              <ShowProduct />
            </AdminRequireAuth>
          } />
          <Route path="/admin/products/create" element={
            <AdminRequireAuth>
              <CreateProduct />
            </AdminRequireAuth>
          } />
          <Route path="/admin/products/edit/:id" element={
            <AdminRequireAuth>
              <EditProduct />
            </AdminRequireAuth>
          } />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
