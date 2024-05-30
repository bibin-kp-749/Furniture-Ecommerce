import React, { memo, useEffect, useState } from 'react'
import '../css/component.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartItems, ConfirmPayment, deleteCartItem, updateQuantityInCart, InitializePayment } from '../App/Thunk/ProductThunk';
import Cookies from 'js-cookie';

const CartPage = () => {
    const dispatch = useDispatch();
    const carts = useSelector(state => state.product.cart);
    const token = Cookies.get('token');
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[phoneNumber,setPhoneNumber]=useState();
    const[city,setCity]=useState();
    const[amount,setAmount]=useState(0)
    useEffect(() => {
        dispatch(getAllCartItems(token));
    },[])
    const updateCount = (productid, value) => {
        dispatch(updateQuantityInCart({ productId: productid, value: value, token: token }));
    }
    //-----------------------------------------------------------
    const handleRazorpayPayment = async () => {
        const data = {};
        const response = await dispatch(InitializePayment({ name: "bibin", email: "bibin@gmail.com", phoneNumber: 1234567890, address: "bbjjjjjjjbb", amount: 200 })).then(res => res.payload);
        const options = {
            key: `rzp_test_n2WhJM0xSFTrwb`,
            amount: response.amount,
            name: 'bibin',
            description: 'Pro Membership',
            order_id: response.id,
            handler: (response) => {
                dispatch(ConfirmPayment(response))
            },
            prefill: {
                name: "TESTUSER",
                email: "testuser@mail.com",
            },
            theme: {
                color: '#F37254'
            }
        };
        const rzp1 = new window.Razorpay(options);
        console.log(options);
        rzp1.open();
    }
    console.log(amount);
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
                                <button onClick={() => updateCount(e.productId, 1)}>Add</button>
                                <button onClick={() => updateCount(e.productId, -1)}>Minus</button>
                                <p className='text-xl font-bold text-gray-400'>PRICE - ₹{e.quantity * e.originalPrice} </p>
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn cartbtn " onClick={() => dispatch(deleteCartItem({ id: e.productId, token: token }))}>DELETE</button>
                            </div>
                        </div>
                    </div>
                )
            }
            )}
            <div className='my-12'><p className='text-black font-medium'>TOTAL PRICE : ₹ {amount}</p></div>
            <label htmlFor="my_modal_7" className="btn">Purchase</label>
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <label className="input input-bordered flex items-center gap-2">
                        Name
                        <input type="text" className="grow"  required/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Email
                        <input type="text" className="grow"  required/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Phone
                        <input type="text" className="grow"  required/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        City
                        <input type="text" className="grow"  required/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Address
                        <input type="text" className="grow"  required/>
                    </label>
                    <button className="purchase-btn cartbtn max-w-72 min-h-14" onClick={handleRazorpayPayment}>Purchace</button>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </div>

    )
}

export default memo(CartPage)
