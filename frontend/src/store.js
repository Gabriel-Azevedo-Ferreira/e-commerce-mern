import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./slice/apiSlice";
import cartSlice from "./slice/cartSlice";
import authSlice from "./slice/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
