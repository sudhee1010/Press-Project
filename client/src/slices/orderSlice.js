import { apiSlice } from "./apiSlice";
import { ORDER_URL } from "../../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new order (Walk-In)
    CreateOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body: data,
        credentials: "include", // for cookie-based auth
      }),
    }),

    // Get all orders for a shop
    getAllOrders: builder.query({
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
  useCreateOrderMutation,
  usegetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApiSlice;


// import { apiSlice } from "./apiSlice";
// import { ORDER_URL } from "../../constants";

// export const orderApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // Create Walk-In Order
//     createWalkInOrder: builder.mutation({
//       query: (data) => ({
//         url: `${ORDER_URL}`,
//         method: "POST",
//         body: data,
//       }),
//     }),

//     // Get All Orders for a Shop
//     getOrders: builder.query({
//       query: (shopId) => `${ORDER_URL}?shopId=${shopId}`,
//       keepUnusedDataFor: 5,
//     }),

//     // Get Order by ID
//     getOrderById: builder.query({
//       query: (id) => `${ORDER_URL}/${id}`,
//     }),

//     // Update Order
//     updateOrder: builder.mutation({
//       query: ({ id, data }) => ({
//         url: `${ORDER_URL}/${id}`,
//         method: "PUT",
//         body: data,
//       }),
//     }),

//     // Delete Order
//     deleteOrder: builder.mutation({
//       query: (id) => ({
//         url: `${ORDER_URL}/${id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

// export const {
//   useCreateWalkInOrderMutation,
//   useGetOrdersQuery,
//   useGetOrderByIdQuery,
//   useUpdateOrderMutation,
//   useDeleteOrderMutation,
// } = orderApiSlice;
