import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./slice/apiSlice";
import cartSlice from "./slice/cartSlice";

console.log(cartSlice);

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
