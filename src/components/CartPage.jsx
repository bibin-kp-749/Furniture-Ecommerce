import React, { memo, useEffect} from 'react'
import '../css/component.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartItems,deleteCartItem,updateQuantityInCart } from '../App/Thunk/ProductThunk';
import Cookies from 'js-cookie';

const CartPage =() => {
    const dispatch = useDispatch();
    const carts = useSelector(state => state.product.cart);
    const token = Cookies.get('token');
    useEffect(() => {
        dispatch(getAllCartItems(token));
    },[])
    const updateCount=(productid,value)=>{
        dispatch(updateQuantityInCart({productId:productid,value:value,token:token}));
    }
    return (
        <div className='mt-48 flex flex-col items-center'>{
            carts &&
            carts.map((e, i) => {
                    return (
                        <div key={i} className="card  flex  self-center  card-side bg-gray-100 rounded-sm justify-center flex-wrap mt-5 sm:w-5/6">
                            <figure><img className=' w-80 h-56 rounded-md sm:min-h-64 ' src={`https://localhost:7288${e.image}`} alt="Movie" /></figure>
                            <div className="card-body ">
                                <div><h2 className='text-2xl font-bold text-gray-800'>{e.productName}</h2>
                                    <p className='text-gray-600 text-lg '>{e.productCaption}</p></div>
                                <div>
                                    <p>Quantity : {e.quantity}</p>
                                    <button onClick={()=>updateCount(e.productId,1)}>Add</button> 
                                    <button onClick={()=>updateCount(e.productId,-1)}>Minus</button>
                                    <p className='text-xl font-bold text-gray-400'>PRICE - ₹{e.quantity*e.originalPrice} </p>
                                </div>
                                <div className="card-actions justify-end">
                                    <button className="btn cartbtn " onClick={() => dispatch(deleteCartItem({id:e.productId,token:token}))}>DELETE</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            )}
            <div className='my-12'><p className='text-black font-medium'>TOTAL PRICE : ₹</p></div>
            <button className="purchase-btn cartbtn max-w-72 min-h-14">Purchace</button>
        </div>

    )
}

export default memo(CartPage)
