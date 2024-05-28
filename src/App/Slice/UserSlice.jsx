import {createSlice} from '@reduxjs/toolkit'
import  {deleteUser,loginUser,getAllUsers,registerUser,userBlock}  from '../Thunk/Userthunk';

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
        builder.addCase(userBlock.fulfilled,()=>{
            window.alert("user blocked")
        })
      },
})

export default userSlice.reducer
