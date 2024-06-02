import React from 'react'
import { useDispatch } from 'react-redux';
import { RemoveWishListItem } from '../App/Thunk/ProductThunk';

const WishListCard = ({value}) => {
    let color="white";
    const dispatch=useDispatch();
    console.log(value,"wishlist");
    return (
        <div className="card w-60 bg-base-100 shadow-xl image-full p-0 m-2 justify-end">
            <figure><img src={`https://localhost:7288${value.image}`} alt="Shoes" /></figure>
            <div className="card-body">
                <p></p>
                <div className="card-actions justify-end">
                    <button onClick={()=>dispatch(RemoveWishListItem(value.productId))}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={`${color}`} viewBox="0 0 24 24" stroke="black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WishListCard
