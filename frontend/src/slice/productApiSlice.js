import apiSlice from "./apiSlice.js";
import { PRODUCT_URL } from "../constants.js";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({ query: () => ({ url: PRODUCT_URL }) }),
  }),
});

export const { useGetProductsQuery } = productsApiSlice;
