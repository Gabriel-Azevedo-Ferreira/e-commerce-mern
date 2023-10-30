import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export default createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Products", "Order", "User"],
  endpoints: (build) => ({}),
});
