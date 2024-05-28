import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../Slice/UserSlice'
import productSlice from '../Slice/ProductSlice'
import search from '../Slice/searchSlice'

export const store=configureStore({
    reducer:{
      user:userSlice,
      product:productSlice,
      search
    }
})