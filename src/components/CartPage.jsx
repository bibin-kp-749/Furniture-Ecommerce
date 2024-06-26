import React, { memo, useEffect, useState } from 'react'
import '../css/component.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartItems, createOrder, ConfirmPayment, deleteCartItem, updateQuantityInCart, InitializePayment } from '../App/Thunk/ProductThunk';
import Cookies from 'js-cookie';

const CartPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    const [city, setCity] = useState();
    const [amount, setAmount] = useState(0)
    const [address, setAddress] = useState('');
    const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
    const [orderCreated, setOrderCreated] = useState(false);
    const dispatch = useDispatch();
    const carts = useSelector(state => state.product.cart);
    const paymentStatus = useSelector(state => state.product.paymentStatus);
    const token = Cookies.get('token');

    useEffect(() => {
        dispatch(getAllCartItems(token));
    }, [])

    useEffect(() => {
        const totalAmount = carts.reduce((total, item) => total + item.quantity * item.originalPrice, 0);
        setAmount(totalAmount);
    }, [carts])
    function updateCount(productid, value){
        dispatch(updateQuantityInCart({ productId: productid, value: value, token: token }));
    }

    function getCurrentTimeISO() {
        const now = new Date();
        return now.toISOString();
    }

    const product = carts.map(e => {
        console.log(e);
        return { ProductId: e.productId, quantity: e.quantity };
    })

    const handleRazorpayPayment = async () => {
        console.log(amount,"kkk");
        const response = await dispatch(InitializePayment({ name: name, email: email, phoneNumber: phoneNumber, customerCity: city, address: address, amount: amount })).then(res => res.payload);
        console.log(response, "ll");
        console.log("iam here at");
        const options = {
            key: `rzp_test_n2WhJM0xSFTrwb`,
            amount: 200,
            name: 'bibin',
            description: 'Pro Membership',
            order_id: response.id,
            handler: (response) => {
                dispatch(ConfirmPayment(response)).then(() => { setIsPaymentConfirmed(true); });
            },
            prefill: {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                city: city,
                address: address,
            },
            theme: {
                color: '#F37254'
            }
        };
        const rzp1 = await new window.Razorpay(options);
        await rzp1.open();
    }
    useEffect(() => {
        if (isPaymentConfirmed && paymentStatus.razorpay_order_id && !orderCreated) {
            setIsPaymentConfirmed(false);
            setOrderCreated(true);
            dispatch(createOrder({ orderId: paymentStatus.razorpay_order_id, customerName: name, customerEmail: email, customerPhoneNumber: phoneNumber, customerCity: city, customerHomeAddress: address, orderTime: getCurrentTimeISO(), orderStatus: "Captured", price: amount, transactionId: paymentStatus.razorpay_payment_id, product: product }));
            product.map(e=>{
                dispatch(deleteCartItem(e.ProductId))
            })
        }
    }, [isPaymentConfirmed, paymentStatus])
    return (
        <div className='mt-48 flex flex-col items-center'>{
            carts &&
            carts.map((e, i) => {
                return (
                    <div key={i} className="card  flex  self-center  card-side bg-gray-100 rounded-sm justify-center flex-wrap mt-5 sm:w-5/6">
                        <figure><img className=' w-80 h-56 rounded-md sm:min-h-64 ' src={`https://localhost:7288${e.image}`} alt="Movie" /></figure>
                        <div className="card-body ">
                            <div><h2 className='text-2xl font-bold text-gray-900 underline '>{e.productName}</h2>
                                <p className='text-rose-950 text-lg '>{e.productCaption}</p></div>
                            <div>
                                <div className='flex justify-center'>
                                    <div className='flex'>
                                        <p className='self-center text-rose-950'>Quantity : {e.quantity}&nbsp;&nbsp;</p>
                                    </div>
                                    <div className='flex flex-col p-0 '>
                                        <button onClick={() => updateCount(e.productId, 1)}><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.881 16H7.119a1 1 0 0 1-.772-1.636l4.881-5.927a1 1 0 0 1 1.544 0l4.88 5.927a1 1 0 0 1-.77 1.636Z" />
                                        </svg>
                                        </button>
                                        <button onClick={() => updateCount(e.productId, -1)}>
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.119 8h9.762a1 1 0 0 1 .772 1.636l-4.881 5.927a1 1 0 0 1-1.544 0l-4.88-5.927A1 1 0 0 1 7.118 8Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <p className='text-xl font-bold text-gray-900'>PRICE - ₹{e.quantity * e.originalPrice} </p>
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn cartbtn bg-rose-950 text-white hover:bg-white hover:text-rose-950" onClick={() => dispatch(deleteCartItem(e.productId))}>DELETE</button>
                            </div>
                        </div>
                    </div>
                )
            }
            )}
            <div className='my-12'><p className='text-black font-medium'>TOTAL PRICE : ₹ {amount}</p></div>
            <label htmlFor="my_modal_7" className="btn  bg-rose-950 text-white hover:bg-white hover:text-rose-950">Purchase</label>
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <label className="input input-bordered flex items-center gap-2">
                        Name
                        <input type="text" className="grow" required onChange={e => setName(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Email
                        <input type="text" className="grow" required onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Phone
                        <input type="text" className="grow" required onChange={e => setPhoneNumber(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        City
                        <input type="text" className="grow" required onChange={e => setCity(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Address
                        <input type="text" className="grow" required onChange={e => setAddress(e.target.value)} />
                    </label>
                    <button className="purchase-btn cartbtn max-w-72 min-h-14" onClick={handleRazorpayPayment}>Purchace</button>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </div>

    )
}

export default memo(CartPage)
