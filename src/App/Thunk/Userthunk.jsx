import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Method for user registration
export const  registerUser=createAsyncThunk('registerUser',async({username,phone,email,password})=>{
    const res=await axios.post('https://localhost:7288/api/User/RegisterUser',{username,email,password});
    console.log("register success fully");
})
//Method for login user
export const loginUser=createAsyncThunk('loginUser',async(user)=>{
    const res=await axios.post('https://localhost:7288/api/User/login',user);
    return res.data;
})
//Method for getting all users
export const getAllUsers=createAsyncThunk('getAllUsers',async()=>{
    const res=await axios.get('https://localhost:7288/api/User/get-all');
    console.log(res);
    return res.data
})
export const deleteUser=createAsyncThunk('deleteUser',async(id)=>{
    const res=await axios.delete(`http://localhost:8000/person/${id}`)
    alert("person deleted")
})
export const deleteProduct=createAsyncThunk('deleteProduct',async(id)=>{
    const res=await axios.delete(`http://localhost:8000/products/${id}`)
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
export const addToCart=createAsyncThunk('addToCart',async({userid,quantity, ...value })=>{
    const res=axios.post(`http://localhost:8000/cart`, {userid,quantity, ...value });
    return res.data
})