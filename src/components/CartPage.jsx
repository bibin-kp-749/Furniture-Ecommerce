import React, { useEffect, useState } from 'react'
import '../css/component.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartItems } from '../App/Thunk/ProductThunk';
import Cookies from 'js-cookie';

const CartPage = () => {
    const dispatch = useDispatch();
    const carts = useSelector(state => state.product.cart);
    const userid = localStorage.getItem('id');
    const [totalprice, setTotalprice] = useState(0);
    const token = Cookies.get('token');
    useEffect(() => {
        // let totalPrice = 0;
        // carts.forEach(e => {
        //     if (e.userid == userid) {
        //         totalPrice += e.quantity * e.price;
        //     }
        // });
        // setTotalprice(totalPrice);
        dispatch(getAllCartItems(token));
    }, [])
    return (
        <div className='mt-48 flex flex-col items-center'>{
            carts &&
            carts.map((e, i) => {
                if (e.userid == userid) {
                    return (
                        <div key={i} className="card  flex  self-center  card-side bg-gray-100 rounded-sm justify-center flex-wrap mt-5 sm:w-5/6">
                            <figure><img className=' w-80 h-56 rounded-md sm:min-h-64 ' src={`https://localhost:7288${e.image}`} alt="Movie" /></figure>
                            <div className="card-body ">
                                <div><h2 className='text-2xl font-bold text-gray-800'>{e.productName}</h2>
                                    <p className='text-gray-600 text-lg '>{e.productCaption}</p></div>
                                <div>
                                    <p>Quantity : {e.quantity}</p>
                                    <p className='text-xl font-bold text-gray-400'>PRICE - ₹{e.originalPrice} </p>
                                </div>
                                <div className="card-actions justify-end">
                                    <button className="btn cartbtn " onClick={() => dispatch(deleteCart(e.id))}>DELETE</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
            <div className='my-12'><p className='text-black font-medium'>TOTAL PRICE : ₹{totalprice}</p></div>
            <button className="purchase-btn cartbtn max-w-72 min-h-14">Purchace</button>
        </div>

    )
}

export default CartPage
