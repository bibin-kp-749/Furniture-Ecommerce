import { createSlice } from "@reduxjs/toolkit";
import { products } from "../Thunk/ProductThunk";
import{searchProducts,getAllCartItems,addToCart,deleteCart,productById} from "../Thunk/ProductThunk"

const initialState={
    products:[],
    product:{},
    cart:[],
}

export const productSlice=createSlice({
    name:'Products',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(products.fulfilled, (state, action) => {
            state.products = action.payload;
          })
          builder.addCase(productById.fulfilled, (state, action) => {
            state.product = action.payload;
          })
          builder.addCase(searchProducts.fulfilled,(state,action)=>{
            state.products=action.payload;
          })
         builder.addCase(addToCart.fulfilled,(state,action)=>{
            state.cart=action.payload;
            console.log(state.cart);
          })
        builder.addCase(getAllCartItems.fulfilled,(state,action)=>{
            state.cart=action.payload;
            console.log(state.cart);
          })//
        builder.addCase(deleteCart.fulfilled,(state,action)=>{
            alert("Deleted  successfully")
          })
        // builder.addCase(deleteCart.fulfilled,()=>{
        //     window.alert("Item Deleted successfully")
        //     window.location.reload()
        //   })
    },
})
export default productSlice.reducer;