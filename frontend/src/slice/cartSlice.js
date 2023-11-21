import { createSlice } from "@reduxjs/toolkit";
import { retry } from "@reduxjs/toolkit/query";

const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethods: "PayPal" };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem)
        state.cartItems = state.cartItems.map((x) =>
          x._id === item._id ? item : x
        );
      else state.cartItems = [...state.cartItems, item];
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== itemId);
      return updateCart(state);
    },
    saveShippingAdress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice;

const updateCart = (state) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10);
  state.taxPrice = addDecimals(0.15 * state.itemsPrice);
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
  );
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
