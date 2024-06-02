import React, { useState } from 'react'
import '../css/component.css'
import { AddWishList } from '../App/Thunk/ProductThunk'
import { useDispatch } from 'react-redux'

const Cards = ({ value, color }) => {
    const dispatch=useDispatch();
    const [res,setRes]=useState(false);
    if(res==true)
        color="red";
    return (
        <div >
            <div className="card product-card  w-72 glass p-0 m-5 ">
                <figure><img src={value.image} alt="Furniture Image" className='text-black' /></figure>
                <div className="card-body">
                    <p className='text-gray-700 font-semibold font-sans text-xl '>{value.productName}</p>
                    <p className='text-gray-900 font-medium font-mono mb-3'>{value.productCaption}</p>
                    <p className='text-gray-800 font-mono font-semibold '>PRICE : ₹{value.originalPrice}</p>
                    <div className="card-actions justify-end">
                        <button className="text-gray-400" >View More... </button>
                        <button onClick={()=>dispatch(AddWishList(value.productId)).then(res=>setRes(res.payload))}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={`${color}`} viewBox="0 0 24 24" stroke="black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards
