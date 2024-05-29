import React  from 'react'
import './App.css'
import AddProduct from './components/AddProduct'
import Hero from './components/Hero'
import Admin from './pages/Admin'
import CartPage from './components/CartPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Products from './components/Products'
import RegisterPage from './pages/RegisterPage'
import Search from './components/Search'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import {useJwt} from "react-jwt"
import Cookies from 'js-cookie'


function App() {
  const token = Cookies.get('token');
  const {decodedToken,isExpired}=useJwt(token);
  const role=decodedToken?.role
  return (
    <>
      <div>
          <Header />
          <Routes>
            {role=="Admin" ? <Route path='/admin' element={<Admin />} /> : null}
            <Route path='/' element={<HomePage />} />
            <Route path='products' element={<Products />} />
            <Route path='products/:id' element={<Hero />} />
            {token ? "/" : <Route path='login' element={<LoginPage />} />}
            <Route path='register' element={<RegisterPage />} />
            <Route path='cart' element={<CartPage />} />
            <Route path='search' element={<Search />} />
            <Route path='admin/addproduct' element={<AddProduct />} />
            <Route path='admin/addproduct/:id' element={<AddProduct/>}/>
            {/* <Route path='/admin' element={<Admin />} />
            <Route path='/' element={<HomePage />} />
            <Route path='products' element={<Products />} />
            <Route path='products/:id' element={<Hero />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='cart' element={<CartPage />} />
            <Route path='search' element={<Search />} />
            <Route path='admin/addproduct' element={<AddProduct />} />
            <Route path='admin/addproduct/:id' element={<AddProduct/>}/> */}
          </Routes>
          <Footer />
      </div>




    </>
  )
}

export default App
