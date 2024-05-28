import { createSlice } from "@reduxjs/toolkit";
import { products } from "../Thunk/ProductThunk";
import{searchProducts,getAllCartItems,addToCart,deleteCartItem,productById,updateQuantityInCart} from "../Thunk/ProductThunk"

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
        builder.addCase(deleteCartItem.fulfilled,(state,action)=>{
            console.log(action.payload);
            alert("Deleted  successfully")
          })
        builder.addCase(updateQuantityInCart.fulfilled,(state,action)=>{
            console.log(action.payload,"jjjjj");
            window.alert("Item Deleted successfully")
            window.location.reload()
          })
    },
})
export default productSlice.reducer;