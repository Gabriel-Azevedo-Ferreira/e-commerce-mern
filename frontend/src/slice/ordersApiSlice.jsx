import { ORDERS_URL } from "../constants";
import apiSlice from "./apiSlice";

export const ordersAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({ url: ORDERS_URL, method: "POST", body: order }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersAPISlice;
