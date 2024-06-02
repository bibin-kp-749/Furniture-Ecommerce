import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../App/Thunk/Userthunk'
import Cookies from 'js-cookie'

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const token = useSelector(state => state.user.jwt);
  let count = 0;
  const submit = () => {
    dispatch(loginUser(data));
  }
  token &&
    Cookies.set('token', token, { expires: 7, secure: true });
  return (
    <div>
      <label className="input reg-input input-bordered flex items-center gap-2 mb-4  bg-white rounded-md border-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="loginsvg w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
        <input type="text" className="grow" placeholder="Email" onChange={e => {
          setData({ ...data, Email: e.target.value })
        }} />
      </label>
      <label className="input reg-input input-bordered flex items-center gap-2 mb-4 bg-white rounded-md border-blue-400 ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="loginsvg w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
        <input type="password" className="grow" placeholder='Password' onChange={e => {
          setData({ ...data, Password: e.target.value })
        }} />
      </label>
      <div className='flex justify-between'>
        <button className="login-btn w-28 h-10 sm:h-12  font-bold md:mt-2.5   btn-xs sm:btn-sm md:btn-sm lg:btn-md" onClick={submit}>Login</button>
        <button className='text-gray-500 text-sm mt-3 mr-2 hover:text-black font-bold btn-xs sm:btn-sm md:btn-sm lg:btn-md' onClick={() => navigate('/register')}>Create Account</button>
      </div>
    </div>
  )
}

export default LoginForm
