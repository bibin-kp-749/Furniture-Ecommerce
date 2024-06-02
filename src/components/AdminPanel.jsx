import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TotalRevenue,TotalProductsPurchased,OrderDetailsByAdmin } from '../App/Thunk/ProductThunk'

const AdminPanel = () => {
    const [userId,setUserId]=useState(0);
    console.log(userId);
    const revenue=useSelector(state=>state.product.TotalRevenue);
    const Users=useSelector(state=>state.user.user);
    const numberOfOrders=useSelector(state=>state.product.totalProductPurchased);
    const details=useSelector(state=>state.product.OrderDetails);
    console.log(details);
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(TotalRevenue())
        dispatch(TotalProductsPurchased())
    })
    const OrderDetails=(id)=>{
        dispatch(OrderDetailsByAdmin(id))
    }
  return (
    <div>
      <div className="stats shadow">
  <div className="stat bg-slate-200">
    <div className="stat-figure text-primary ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
    </div>
    <div className="stat-title">Number Of Users</div>
    <div className="stat-value text-primary">{Users.length/1000}K</div>
    <div className="stat-desc">21% more than last month</div>
  </div>
  
  <div className="stat bg-slate-200">
    <div className="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    </div>
    <div className="stat-title">Total Revenue Generated</div>
    <div className="stat-value text-secondary">{revenue/1000}K</div>
    <div className="stat-desc">20% more than last month</div>
  </div>
  
  <div className="stat bg-slate-200">
    <div className="stat-figure text-primary ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
    </div>
    <div className="stat-title">Number Of Order/day</div>
    <div className="stat-value text-primary">{numberOfOrders/1000}K</div>
    <div className="stat-desc">21% more than last month</div>
  </div>

  <div className="stat bg-slate-200">
    <div className="stat-value">76%</div>
    <div className="stat-title">Order Placed</div>
    <div className="stat-desc text-secondary">31 Order remaining</div>
  </div>
</div>
<br />
<br/>
<div>
<label htmlFor="ip">Enter UserId</label><br />
  <input type="text" id='ip' placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={e=>setUserId(e.target.value)}/>
  <button className='bg-slate-600' onClick={()=>OrderDetails(userId)}>Submit</button><br /><br />
  <br /><br />
  <div className="radial-progress" style={{ "--value": "70", "--size": "12rem", "--thickness": "2px" }} role="progressbar">70%</div>
<div className="radial-progress" style={{ "--value": "70", "--size": "12rem", "--thickness": "2rem" }} role="progressbar">70%</div>
<br />
<br />
  {
    details&&
    details.map(e=>{
        return(
            <>
            <p>{e.orderId}</p>
            <p>{e.transactionId}</p>
            <p>{e.customerName}</p>
            <p>{e.customerPhoneNumber}</p>
            <p>{e.customerEmail}</p>
            <p>{e.customerHomeAddress}</p>
            <p>{e.orderTime}</p>
            <p>{e.orderStatus}</p>
            <p>{e.quantity}</p> <br /><br />
            </>
        )
    })
  }
</div>
    </div>
  )
}

export default AdminPanel
