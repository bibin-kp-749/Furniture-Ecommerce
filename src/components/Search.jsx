import React, {useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchProducts } from '../App/Thunk/ProductThunk'
import { Link } from 'react-router-dom'

const Search = () => {
    const dispatch = useDispatch();
    const values = useSelector(state => state.product.products);
    const search = useSelector(state => state.search.search);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(searchProducts(search));
    }, [search])
    return (
        <div className='flex flex-wrap justify-evenly mt-24'>
            {
                values && values.map((e,i) => {
                        return (
                            <Link key={i} to={`${e.productId}`}>
                            <div key={i} className="card w-80 glass p-0 m-5">
                                <figure><img src={`https://localhost:7288${e.image}`} alt="Furniture Image" className='text-black' /></figure>
                                <div className="card-body">
                                <h1 className='text-black'>{e.productName}</h1>
                                    <p className='text-black'>{e.productCaption}</p>
                                    <p className='text-black'>PRICE : ₹{e.originalPrice}</p>
                                    <br />
                                    <div className="card-actions justify-end">
                                        <button className="  text-gray-600" onClick={() => navigate(`/products/${e.id}`)}>view more</button>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        )
                })
            }
        </div>
    )
}

export default Search
