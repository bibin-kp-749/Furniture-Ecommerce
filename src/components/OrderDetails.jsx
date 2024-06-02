import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Orderdetails } from '../App/Thunk/ProductThunk';

const OrderDetails = () => {
  const dispatch= useDispatch();
  const details=useSelector(state=>state.product.OrderDetails);
  useEffect(()=>{
    dispatch(Orderdetails());
  },[])
  return (
    details&&
      details.map(e=>{
        // return(<div>
        //   <div className="card card-side bg-base-100 shadow-xl">
        //     <figure><img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
        //     <div className="card-body">
        //       <h2 className="card-title">New movie is released!</h2>
        //       <p>Click the button to watch on Jetflix app.</p>
        //       <div className="card-actions justify-end">
        //         <button className="btn btn-primary">Watch</button>
        //       </div>
        //     </div>
        //   </div>
        // </div>);
      })
  )
}

export default OrderDetails
