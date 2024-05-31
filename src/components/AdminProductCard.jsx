import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProducts, products,deleteProduct } from '../App/Thunk/ProductThunk'

const AdminProductCard = () => {
  const dispatch = useDispatch();
  const[search,setSearch]=useState();
  const [category, setCategory] = useState("all");
  const product = useSelector(state => state.product.products);
  const Delete = (id) => {
    dispatch(deleteProduct(id));
  }
  useEffect(() => {
    dispatch(products());
  }, [])
  useEffect(() => {
    dispatch(searchProducts(search));
}, [search])
  return (
    <div className='w-80 sm:w-full mt-10'>
      <input type="text"  className='bg-white flex 'onChange={e=>setSearch(e.target.value)}/>
      <div className='mb-12 overflow-auto no-scrollbar sm:mr-5' >
        <ul className='no-scrollbar flex w-fit sm:w-full  justify-evenly  text-gray-800 bg-gray-200 items-center h-10 align-middle overflow-scroll rounded-lg cursor-pointer'>
          <li className='min-w-32 hover:font-semibold' onClick={() => setCategory("offers")}>Offers</li>
          <li className='min-w-32 hover:font-semibold' onClick={() => setCategory("living")}>Living</li>
          <li className='min-w-32 hover:font-semibold' onClick={() => setCategory("bedrooms")}>Bedrooms</li>
          <li className='min-w-32 hover:font-semibold' onClick={() => setCategory("dining set")}>Dining Sets</li>
          <li className='min-w-48 hover:font-semibold' onClick={() => setCategory("office")}>Study and Office Furniture</li>
          <li className='min-w-32 hover:font-semibold' onClick={() => setCategory("collection")}>Collections</li>
        </ul>
      </div>
      {
        product &&
        product.map((e, i) => {
            return (
              <div key={i} className='mb-8 flex justify-center md:4/6'>
                <div className="card card-side bg-gray-200 shadow-xl flex flex-wrap p-0 rounded-md sm:w-5/6 md:2/6">
                  <figure className='max-w-full'><img src={e.image} alt="Movie" className='w-full rounded-md sm:w-60 md:w-full md:h-72' /></figure>
                  <div className="card-body sm:flex-1 md:flex-1">
                    <h2 className="card-title">{e.productName}</h2>
                    <p>{e.productCaption}</p>
                    <p>{e.originalPrice}</p>
                    <div className="card-actions justify-end">
                      <Link to={`addproduct/${e.productId}`}><button className="btn btn-primary" >Edit</button></Link>
                      <button className="btn btn-primary" onClick={() => Delete(e.productId)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )
        })
      }
    </div>
  )
}

export default AdminProductCard
