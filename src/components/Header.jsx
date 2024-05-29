import React from 'react'
import Navbar from './Navbar'
import NavLink from './NavLink'
import { useJwt } from 'react-jwt'
import Cookies from 'js-cookie'

const Header = () => {
  const token = Cookies.get('token');
  const {decodedToken}=useJwt(token);
  const role=decodedToken?.role
  if(role!="Admin")
  return (
    <div className='header-section z-50'>
      <Navbar />
      <NavLink />
    </div>
  )
}

export default Header
