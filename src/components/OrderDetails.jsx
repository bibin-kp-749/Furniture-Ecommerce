import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Orderdetails } from '../App/Thunk/ProductThunk';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const details = useSelector(state => state.product.OrderDetails);
  useEffect(() => {
    dispatch(Orderdetails());
  }, [])
  return (
    <div className='mt-32'>
      {
    details &&
    details.map(e => {
      return (
        <div className='flex justify-center'>
          <div className="card card-side m-10 bg-base-100 shadow-xl max-h-96 w-8/12">
            <figure><img className='h-96' src={`https://localhost:7288${e.image}`} alt="Movie" /></figure>
            <div className="card-body">
              <h2 className="card-title">{e.productName}</h2>
              <p>{e.quantity}</p>
              <p>Price : {e.price}</p>
              <p>Time : {e.orderTime}</p>
              <p>Status : {e.orderStatus}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Watch</button>
              </div>
            </div>
          </div>
        </div>
      );
    })
  }
    </div>
  )
}

export default OrderDetails
