import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProducts, products, deleteProduct } from '../App/Thunk/ProductThunk'

const AdminProductCard = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [category, setCategory] = useState("all");
  const product = useSelector(state => state.product.products);
  console.log(product);
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
      <div className='mb-12 overflow-auto no-scrollbar sm:mr-5' >
        <ul className='no-scrollbar flex w-fit sm:w-full  justify-evenly  text-rose-950 bg-gray-200 items-center h-10 align-middle overflow-scroll rounded-lg cursor-pointer'>
          <li className='min-w-32 hover:font-semibold' onClick={() => setCategory("offers")}>Offers</li>
          <li className='min-w-32 hover:font-semibold' onClick={() => setCategory("living")}>Living</li>
          <li className='min-w-32 hover:font-semibold' onClick={() => setCategory("bedrooms")}>Bedrooms</li>
          <li className='min-w-32 hover:font-semibold' onClick={() => setCategory("dining set")}>Dining Sets</li>
          <li className='min-w-48 hover:font-semibold' onClick={() => setCategory("office")}>Study and Office Furniture</li>
          <li className='min-w-32 hover:font-semibold' onClick={() => setCategory("collection")}>Collections</li>
        </ul>
      </div>
      <div className='flex justify-end mr-5'>
      <label className="input input-bordered flex items-center gap-2 w-96 bg-white border-rose-950">
        <input type="text" className="grow bg-rose-950 flex " onChange={e => setSearch(e.target.value)} placeholder="Search" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
      </label>
      </div>
      <br /><br />
      {
        product &&
        product.map((e, i) => {
          return (
            <div key={i} className='mb-8 flex justify-center md:4/6'>
              <div className="card card-side bg-gray-200 shadow-xl flex flex-wrap p-0 rounded-md sm:w-5/6 md:2/6">
                <figure className='max-w-full'><img src={e.image} alt="Movie" className='w-full rounded-md sm:w-60 md:w-full md:h-72' /></figure>
                <div className="card-body sm:flex-1 md:flex-1 flex justify-center">
                  <h2 className="card-title flex justify-center text-rose-950">{e.productName}</h2>
                  <p className='font-mono'>{e.productCaption}</p>
                  <p>Quantity : {e.stock}</p>
                  <p>{e.originalPrice}</p>
                  <p></p>
                  <div className="card-actions justify-end">
                    <Link to={`addproduct/${e.productId}`}><button className="btn bg-rose-950 text-white hover:bg-white hover:text-rose-950 hover:border-rose-950" >Edit</button></Link>
                    <button className="btn bg-rose-950 text-white hover:bg-white hover:text-rose-950 hover:border-rose-950" onClick={() => Delete(e.productId)}>Delete</button>
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
