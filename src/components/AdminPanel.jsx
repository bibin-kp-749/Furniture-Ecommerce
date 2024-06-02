import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TotalRevenue, TotalProductsPurchased, OrderDetailsByAdmin } from '../App/Thunk/ProductThunk'
import '../css/component.css'
const AdminPanel = () => {
  const [userId, setUserId] = useState(0);
  console.log(userId);
  const revenue = useSelector(state => state.product.TotalRevenue);
  const Users = useSelector(state => state.user.user);
  const numberOfOrders = useSelector(state => state.product.totalProductPurchased);
  const details = useSelector(state => state.product.OrderDetails);
  console.log(details);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(TotalRevenue())
    dispatch(TotalProductsPurchased())
  })
  const OrderDetails = (id) => {
    dispatch(OrderDetailsByAdmin(id))
  }
  return (
    <div>
      <div className="stats border-0">
        <div className="stat bar">
          <div className="stat-figure text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>
          <div className="stat-title text-rose-900">Number Of Users</div>
          <div className="stat-value text-gray-900">{Users.length / 1000}K</div>
          <div className="stat-desc text-gray-500">21% more than last month</div>
        </div>

        <div className="stat bar">
          <div className="stat-figure ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 320 512" className="inline-block w-8 h-8 stroke-current"><path d="M308 96c6.6 0 12-5.4 12-12V44c0-6.6-5.4-12-12-12H12C5.4 32 0 37.4 0 44v44.7c0 6.6 5.4 12 12 12h85.3c27.3 0 48.3 10 61 27.3H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h158.8c-6.2 36.1-33 58.6-74.8 58.6H12c-6.6 0-12 5.4-12 12v53c0 3.3 1.4 6.5 3.9 8.8l165.1 152.4a12 12 0 0 0 8.1 3.2h82.6c10.9 0 16.2-13.4 8.1-20.8L116.9 319.9c76.5-2.3 131.1-53.4 138.3-127.9H308c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-58.7c-3.5-11.5-8.3-22.2-14.3-32H308z"/></svg>
          </div>
          <div className="stat-title text-rose-900">Total Revenue Generated</div>
          <div className="stat-value text-gray-900">{revenue / 1000}K</div>
          <div className="stat-desc text-gray-500">20% more than last month</div>
        </div>

        <div className="stat  bar">
          <div className="stat-figure ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="Blue" viewBox="0 0 640 512" className="inline-block w-8 h-8 stroke-current "><path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"/></svg>
          </div>
          <div className="stat-title text-rose-900">Number Of Order/day</div>
          <div className="stat-value text-gray-900">{numberOfOrders / 1000}K</div>
          <div className="stat-desc text-gray-500">21% more than last month</div>
        </div>

        <div className="stat  bar">
          <div className="stat-value text-gray-900">76%</div>
          <div className="stat-title text-rose-900">Order Placed</div>
          <div className="stat-desc text-gray-500">31 Order remaining</div>
        </div>
      </div>
      <br />
      <br />
      <div>
        <div className="radial-progress text-red-800" style={{ "--value": "75", "--size": "15rem", "--thickness": "4px" }} role="progressbar">75% <br />
        Expected Growth</div>
        <div className="radial-progress m-12 text-green-700" style={{ "--value": "60", "--size": "15rem", "--thickness": "1.5rem" }} role="progressbar">60% <br />
        Current Status
        </div>
        <br />
        <label htmlFor="ip">Enter UserId</label><br />
        <input type="text" id='ip' placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={e => setUserId(e.target.value)} />
        <button className='bg-slate-600' onClick={() => OrderDetails(userId)}>Submit</button><br /><br />
        <br /><br />
        <br />
        <br />
        {
          details &&
          details.map(e => {
            return (
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
