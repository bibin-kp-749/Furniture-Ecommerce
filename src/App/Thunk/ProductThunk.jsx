import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Method for get all products
export const products=createAsyncThunk('allproducts',async()=>{
    const res= await axios.get('https://localhost:7288/api/Product/GetAllProducts');
   return res.data;
})
//Method for get product by Id
export const productById=createAsyncThunk('productById',async(id)=>{
    const res=await axios.get(`https://localhost:7288/api/Product/ProductId?ProductId=${id}`);
    return res.data
})
//Method for searching product 
export const searchProducts=createAsyncThunk('searchProducts',async(product)=>{
    const res=await axios.get(`https://localhost:7288/api/Product/searchItem?searchItem=${product}`);
    return res.data;
})
//Method for AddToCart
export const addToCart=createAsyncThunk('addToCart',async({id,token})=>{
    const res=await axios.post(`https://localhost:7288/api/Cart/${id}`,null,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    });
})
//Method for showing cart Items
export const getAllCartItems=createAsyncThunk('getAllCartItems',async(token)=>{
    const res=await axios.get(`https://localhost:7288/api/Cart/get-all`,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    })
    return res.data;
})
//Method to delete the cartItems
export const  deleteCartItem=createAsyncThunk('deleteCartItem',async({id,token})=>{
    const res=await axios.delete(`https://localhost:7288/api/Cart/remove-product?productId=${id} `,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    })
    return res.data
})
//Method for Update Quantity in cart
export const  updateQuantityInCart=createAsyncThunk('updateQuantityInCart',async({productId,value,token})=>{
    const res=await axios.put(`https://localhost:7288/api/Cart/Update-Count?productId=${productId}&value=${value}`,null,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    window.alert("added succesfully")
    return res.data
})
export const  addproduct=createAsyncThunk('addProducts',async({category,type,name,caption,price,url})=>{
    const res=await axios.post('http://localhost:8000/products',{category,type,name,caption,price,url})
    window.alert("added succesfully")
    return res.data
})
export const  updateProduct=createAsyncThunk('updateProduct',async({category,type,name,caption,price,url,id})=>{
    const res=await axios.put(`http://localhost:8000/products/${id}`,{id,category,type,name,caption,price,url})
    window.alert("updated succesfully")
    return res.data
})
export const  cartProduct=createAsyncThunk('cartProduct',async()=>{
    const res=await axios.get('http://localhost:8000/cart')
    return res.data
})
export const  userBlock=createAsyncThunk('userBlock',async({id,current})=>{
    const res=await axios.patch(`http://localhost:8000/person/${id}`, { status: !current })
    console.log("successfully blocked");
})
export const  deleteCart=createAsyncThunk('deleteCart',async(id)=>{
    console.log(id);
    const res=await axios.delete(`http://localhost:8000/cart/${id}`)
    console.log("Item deleted");
})
