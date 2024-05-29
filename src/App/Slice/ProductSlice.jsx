import { createSlice } from "@reduxjs/toolkit";
import { products } from "../Thunk/ProductThunk";
import{searchProducts,ConfirmPayment,deleteProduct,InitializePayment,getAllCartItems,addToCart,deleteCartItem,productById,updateQuantityInCart,getWishList,addproduct} from "../Thunk/ProductThunk"

const initialState={
    products:[],
    product:{},
    cart:[],
    wishList:[],
    orderId:'',
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
          })
        builder.addCase(deleteCartItem.fulfilled,(state,action)=>{
            console.log(action.payload);
            alert("Deleted  successfully")
          })
        builder.addCase(updateQuantityInCart.fulfilled,(state,action)=>{
            window.alert("Updated")
            window.location.reload()
          })
          builder.addCase(getWishList.fulfilled,(state,action)=>{
            state.wishList=action.payload;
          })
          builder.addCase(addproduct.fulfilled,()=>{
            console.log("Added successfully");
          })
          builder.addCase(deleteProduct.fulfilled,()=>{
            console.log("Deleted successsfully successfully");
          })
          builder.addCase(InitializePayment.fulfilled,(state,action)=>{
            state.orderId=action.payload;
        })
        builder.addCase(ConfirmPayment.fulfilled,(state,action)=>{
          console.log(action.payload);
      })
    },
})
export default productSlice.reducer;