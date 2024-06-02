import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

//Method for get all products
export const products=createAsyncThunk('allproducts',async()=>{
    const res= await axios.get('https://localhost:7288/api/Product/GetAllProducts');
   return res.data;
})
//Method for Update product
export const  UpdateProduct=createAsyncThunk('UpdateProduct',async({id,formData})=>{
    console.log(id,formData,"hhhhh");
    try{const token = Cookies.get('token');
    const res=await axios.put(`https://localhost:7288/api/Product/update-product?produtId=${id}`,formData,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    })
    window.alert("updated succesfully")
    return res.data}catch(er){
console.log(er);
    }
})
//method for Add new Product
export const  addproduct=createAsyncThunk('addProducts',async(formdata)=>{
    try{console.log(formdata,"kkkkk");
    const token = Cookies.get('token');
    const res=await axios.post('https://localhost:7288/api/Product/add-product',formdata,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    window.alert("added succesfully")
    return res.data}catch(er){
        console.log(er,"jjj");
    }
})
//Method for Delete Product
export const deleteProduct=createAsyncThunk('deleteProduct',async(id)=>{
    console.log(id);
    const token = Cookies.get('token');
    const res=await axios.delete(`https://localhost:7288/api/Product/delete-product?Id=${id}`,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    });
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
    return res.data
})
//method for getting wishList
export const  getWishList=createAsyncThunk('getWishList',async(token)=>{
    const res=await axios.get(`https://localhost:7288/api/product/wishlist/get-all`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return res.data
})
//method for Add wishList
export const  AddWishList=createAsyncThunk('AddWishList',async(id)=>{
    const token = Cookies.get('token');
    const res=await axios.post(`https://localhost:7288/api/product/wishlist/AddWishList?ProdctId=${id}`,null,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return true;
})
//method for deleting wishList
export const  RemoveWishListItem=createAsyncThunk('RemoveWishListItem',async(id)=>{
    const token = Cookies.get('token');
    console.log(id);
    const res=await axios.delete(`https://localhost:7288/api/product/wishlist/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    console.log(res.data);
    return res.data
})
//method for initializing payment
export const InitializePayment=createAsyncThunk('InitializePayment',async({name,email,phoneNumber,customerCity,address,amount})=>{
    console.log(name,email,phoneNumber,customerCity,address,amount);
    const token = Cookies.get('token');
    const res=await axios.post(`https://localhost:7288/api/Order/GenerateOrder`,{name,email,phoneNumber,customerCity,address,amount},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return res.data
})
//method to confirm payment
export const ConfirmPayment=createAsyncThunk('ConfirmPayment',async(response)=>{
    const token = Cookies.get('token');
    console.log(response,"lloo");
    const res=await axios.post(`https://localhost:7288/api/Order/CapturePayment`,response,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    if(res.data)
    return response;
})
//method to create order
export const createOrder=createAsyncThunk('createOrder',async({orderId,customerName,customerEmail,customerPhoneNumber,customerCity,customerHomeAddress,orderTime,orderStatus,price,transactionId,product})=>{
    const token = Cookies.get('token');
    console.log("Iam here at create oreder");
    console.log(orderId,customerName,customerEmail,customerPhoneNumber,customerCity,customerHomeAddress,orderTime,orderStatus,price,transactionId,product);
    const res=await axios.post(`https://localhost:7288/api/Order/order`,{orderId,customerName,customerEmail,customerPhoneNumber,customerCity,customerHomeAddress,orderTime,orderStatus,price,transactionId,product},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    console.log(res.data);
    return res.data
})
//method to create TotalRevenue
export const TotalRevenue=createAsyncThunk('TotalRevenue',async()=>{
    const token = Cookies.get('token');
    console.log("Iam here at Total revenue");
    const res=await axios.get(`https://localhost:7288/api/Order/Totalrevenue`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    console.log(res.data);
    return res.data
})
//method to create TotalProductsPurchased
export const TotalProductsPurchased=createAsyncThunk('TotalProductsPurchased',async()=>{
    const token = Cookies.get('token');
    console.log("Iam here at Total revenue");
    const res=await axios.get(`https://localhost:7288/api/Order/TotalProductsPurchased`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    console.log(res.data);
    return res.data
})
//method to create TotalProductsPurchased
export const OrderDetailsByAdmin=createAsyncThunk('OrderDetailsByAdmin',async(id)=>{
    const token = Cookies.get('token');
    console.log("Iam here at Total OrderDetailsByAdmin",id);
    const res=await axios.get(`https://localhost:7288/api/Order/OrderDetailsByAdmin?userId=${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    console.log(res.data);
    return res.data
})