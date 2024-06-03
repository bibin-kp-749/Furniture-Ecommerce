import { createSlice } from "@reduxjs/toolkit";
import { products } from "../Thunk/ProductThunk";
import { Orderdetails,searchProducts,AddWishList,TotalProductsPurchased,OrderDetailsByAdmin,TotalRevenue,RemoveWishListItem, createOrder, ConfirmPayment, deleteProduct, InitializePayment, getAllCartItems, addToCart, deleteCartItem, productById, updateQuantityInCart, getWishList, addproduct } from "../Thunk/ProductThunk"

const initialState = {
  products: [],
  product: {},
  cart: [],
  wishList: [],
  paymentStatus: {},
  TotalRevenue:0,
  totalProductPurchased:0,
  OrderDetails:[]
}

export const productSlice = createSlice({
  name: 'Products',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(products.fulfilled, (state, action) => {
      state.products = action.payload;
    })
    builder.addCase(productById.fulfilled, (state, action) => {
      state.product = action.payload;
    })
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    })
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      console.log(state.cart);
    })
    builder.addCase(getAllCartItems.fulfilled, (state, action) => {
      state.cart = action.payload;
    })
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      console.log(action.payload);
      alert("Deleted  successfully")
    })
    builder.addCase(updateQuantityInCart.fulfilled, (state, action) => {
      // window.alert("Updated")
      // window.location.reload()
      console.log("hi");
    })
    builder.addCase(getWishList.fulfilled, (state, action) => {
      state.wishList = action.payload;
    })
    builder.addCase(addproduct.fulfilled, () => {
      console.log("Added successfully");
    })
    builder.addCase(deleteProduct.fulfilled, () => {
      console.log("Deleted successsfully successfully");
    })
    builder.addCase(InitializePayment.fulfilled, (state, action) => {
      state.OrderDetails = action.payload;
      console.log(state.OrderDetails, "InitializePaymentbibin");
    })
    builder.addCase(ConfirmPayment.fulfilled, (state, action) => {
      state.paymentStatus = action.payload;
      console.log(action.payload, "ConfirmPaymentbibin");
    })
    builder.addCase(createOrder.fulfilled, (state, action) => {
      console.log("created");
    })
    builder.addCase(RemoveWishListItem.fulfilled, (state, action) => {
      console.log("Removed");
    })
    builder.addCase(TotalRevenue.fulfilled, (state, action) => {
      state.TotalRevenue=action.payload;
    })
    builder.addCase(TotalProductsPurchased.fulfilled, (state, action) => {
      state.totalProductPurchased=action.payload;
    })
    builder.addCase(OrderDetailsByAdmin.fulfilled, (state, action) => {
      state.OrderDetails=action.payload;
    })
    builder.addCase(Orderdetails.fulfilled, (state, action) => {
      state.OrderDetails=action.payload;
    })
    builder.addCase(AddWishList.fulfilled, (state, action) => {
      alert("added successfully");
    })
  },
})
export default productSlice.reducer;