import { apiSlice } from "./apiSlice";
import { ORDER_URL } from "../../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new order (Walk-In)
    createWalkInOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body: data,
        credentials: "include", // for cookie-based auth
      }),
    }),

    // Get all orders for a shop
    getOrders: builder.query({
      query: (shopId) => ({
        url: `${ORDER_URL}?shopId=${shopId}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    // Get single order by ID
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        credentials: "include",
      }),
    }),

    // Update order
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ORDER_URL}/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    // Delete order (admin use)
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateWalkInOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApiSlice;
