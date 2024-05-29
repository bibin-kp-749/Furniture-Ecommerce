import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

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
    const token = Cookies.get('token');
    const res=await axios.get('https://localhost:7288/api/User/get-all',{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    });
    console.log(res.data);
    return res.data;
})
//Method for Blocking User
export const blockUser=createAsyncThunk('blockUser',async({id})=>{
    console.log(id);
    const token = Cookies.get('token');
    console.log(token);
    const res=await axios.put(`https://localhost:7288/api/User/blockUser?id=${id}`,null,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    alert("person Blocked")
})
//Method for Unblocking User
export const unBlockUser=createAsyncThunk('unBlockUser',async({id})=>{
    console.log(id);
    const token = Cookies.get('token');
    console.log(token);
    const res=await axios.put(`https://localhost:7288/api/User/unblockUser?id=${id}`,null,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    })
    alert("person unBlocked")
})
// //Method for Delete User
// export const deleteUser=createAsyncThunk('deleteUser',async(id)=>{
//     const res=await axios.delete(`http://localhost:8000/person/${id}`)
//     alert("person deleted")
// })
