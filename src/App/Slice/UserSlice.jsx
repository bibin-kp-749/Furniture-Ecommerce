import {createSlice} from '@reduxjs/toolkit'
import  {loginUser,getAllUsers,registerUser,blockUser, unBlockUser}  from '../Thunk/Userthunk';

const initialState={
    user:[],
    jwt:'',
}

export const userSlice=createSlice({
    name:'all',
    initialState,
    extraReducers: (builder) => {
        // builder.addCase(users.fulfilled,(state,action)=>{
        //     state.user=action.payload
        // })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.jwt=action.payload
        })
        builder.addCase(getAllUsers.fulfilled,(state,action)=>{
            state.user=action.payload;
        })
        builder.addCase(registerUser.fulfilled,(state,action)=>{
            state.user=[...state.user,action.payload]
        })
        builder.addCase(blockUser.fulfilled,()=>{
            window.alert("user blocked")
        })
        builder.addCase(unBlockUser.fulfilled,()=>{
            window.alert("user Un blocked")
        })
      },
})

export default userSlice.reducer
