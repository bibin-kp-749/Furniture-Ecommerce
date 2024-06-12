import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../css/component.css'
import { useDispatch, useSelector } from 'react-redux'
import { productById,Categories, UpdateProduct, addproduct, getTypes } from '../App/Thunk/ProductThunk'

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(state => state.product.product);
  const categories = useSelector(state => state.product.categories);
  const types=useSelector(state=>state.product.types)
  console.log(types,"hey there");
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState({ id: null, name: '' });
  const [caption, setCaption] = useState('')
  const [type, setType] = useState({id:null,});
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [stock, setStock] = useState(1);
  console.log(caption, url, category, type, price, name, stock);
  const { id } = useParams();
  useEffect(() => {
    dispatch(productById(id));
    dispatch(Categories());
     dispatch(getTypes());
  },[])
  useEffect(() => {
    if (product) {
      setUrl(product.image || '');
      setCategory(product.category || '');
      setCaption(product.productCaption || '');
      setName(product.productName || '');
      setPrice(product.originalPrice || '');
      setType(product.type || '');
    }
  }, [product])
  const formData = new FormData();
  formData.append('ProductName', name);
  formData.append('ProductCaption', caption);
  formData.append('Type', type);
  formData.append('OriginalPrice', price);
  formData.append('Category', category.id);
  formData.append('Image', url);
  formData.append('stock', stock);
  const AddProduct = async () => {
    await dispatch(addproduct(formData));
  }
  const updateProduct = () => {
    dispatch(UpdateProduct({ id: id, formData: formData }));
  }
  const handleItemClickCategory = (id, name) => {
    setCategory({ id, name })
  }
  const handleItemClickItem=(id,name)=>{
    setType
  }
  console.log(categories);
  return (
    <div className='m-auto w-11/12 flex justify-center md:min-w-full '>
      <div className='mt-14  flex flex-col justify-center items-center ' style={{ width: '100%' }}>
        <label className="input input-bordered flex border-rose-950 bg-white items-center gap-2 m-3 w-80 sm:w-96 md:w-5/12 md:h-16">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='brown' className="addproduct-svg w-4 h-4 opacity-70"><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" /></svg>
          <input type="file" className="grow text-gray-400" placeholder="category" onChange={e => setUrl(e.target.files[0])} />
        </label>
        <label className="input input-bordered flex border-rose-950 bg-white items-center gap-2 m-3 w-80 sm:w-96 md:w-5/12 md:h-16">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='brown' className="addproduct-svg w-4 h-4 opacity-70"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /></svg>
          <input type="text" className="grow" value={name} placeholder='Name' onChange={e => setName(e.target.value)} />
        </label>
        <label className="input input-bordered flex border-rose-950 bg-white items-center gap-2 m-3 w-80 sm:w-96 md:w-5/12 md:h-16">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill='brown' className="addproduct-svg w-4 h-4 opacity-70"><path d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 208c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48s21.5-48 48-48zm144 48c0-26.5 21.5-48 48-48c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48z" /></svg>
          <input type="text" className="grow" value={caption} placeholder='caption' onChange={e => setCaption(e.target.value)} />
        </label>
        <label tabIndex={0} role="button" className="input input-bordered dropdown dropdown-bottom flex border-rose-950 bg-white items-center gap-2 m-3 w-80 sm:w-96 md:w-5/12 md:h-16">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="brown" className="addproduct-svg w-4 h-4 opacity-70">
            <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
          </svg>
          <span>{category.name || 'category'}</span>
          <div>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {
                categories &&
                categories.map(e => {
                  return (
                    <li onClick={() => handleItemClick(e.categoryId, e.categoryName)}><a>{e.categoryName}</a></li>
                  )
                })
              }
            </ul>
          </div>
        </label>
        <label tabIndex={0} role="button" className="input input-bordered dropdown dropdown-bottom flex border-rose-950 bg-white items-center gap-2 m-3 w-80 sm:w-96 md:w-5/12 md:h-16">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='brown' className="addproduct-svg w-4 h-4 opacity-70"><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" /></svg>
          <div>
          <span>{category.name || 'Type'}</span>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {
                types &&
                types.map(e => {
                  return (
                    <li onClick={() => handleItemClick(e.id, e.typeName)}><a>{e.typeName}</a></li>
                  )
                })
              }
            </ul>
          </div>
        </label>
        <label className="input input-bordered flex border-rose-950 bg-white items-center gap-2 m-3  w-80 sm:w-96 md:w-5/12 md:h-16">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill='brown' className="addproduct-svg w-4 h-4 opacity-70"><path d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z" /></svg>
          <input type="number" className="grow" value={price} placeholder='Price' onChange={e => setPrice(e.target.value)} />
        </label>
        <label className="input input-bordered flex border-rose-950 bg-white items-center gap-2 m-3  w-80 sm:w-96 md:w-5/12 md:h-16">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill='brown' className="addproduct-svg w-4 h-4 opacity-70"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z" /></svg>
          <input type="number" className="grow" value={stock} placeholder='Stock' onChange={e => setStock(e.target.value)} />
        </label>
        <div className='flex my-3 mx-32 justify-start pb-3'>
          <button className={`login-btn h-10 min-w-24 ${id != undefined ? "hidden" : null}`} onClick={AddProduct}>ADD</button>
          <button className={`login-btn h-10 min-w-24 ${id == undefined ? "hidden" : null}`} onClick={updateProduct}>UPDATE</button>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
