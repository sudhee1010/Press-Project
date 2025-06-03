import { CUSTOMERS_URL } from "../../constants.js";
import { apiSlice } from "./apiSlice.js";

export const onlineSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    customerLogin: builder.mutation({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/signin`,
        method: "POST",
        body: data,
      }),
    }),
    customerRegister: builder.mutation({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    customerLogout: builder.mutation({
      query: () => ({
        url: `${CUSTOMERS_URL}/logout`,
        method: "POST",
      }),
    }),
    CustomerProfile: builder.query({
      query: () => ({
        url: `${CUSTOMERS_URL}/getOnlineCustomerProfile`,
        method: "GET",
      }),
      providesTags: ["Customer"],
      refetchOnMountOrArgChange: true,
    }),

    CustomerProfileid: builder.query({
      query: (userId) => ({
        url: `${CUSTOMERS_URL}/${userId}`,
        method: "GET",
        body: data,
      }),
    }),


    getCustomer: builder.query({
      query: () => ({
        url: CUSTOMERS_URL,
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),
    deleteCustomer: builder.mutation({
      query: (userId) => ({
        url: `${CUSTOMERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
    getCustomerDetails: builder.query({
      query: (userId) => ({
        url: `${CUSTOMERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    // updateCustomer: builder.mutation({
    //   query: (data) => ({
    //     url: `${CUSTOMERS_URL}/${data.userId}`,
    //     method: "PUT",
    //     body: "data",
    //   }),
    //   invalidatesTags: ["Users"],
    // }),

    updateCustomer: builder.mutation({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/updateOnlineCustomer`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCustomerLoginMutation,
  useCustomerRegisterMutation,
  useCustomerLogoutMutation,
  useLazyCustomerProfileQuery,
  useCustomerProfileQuery,
  useGetCustomerQuery,
  useDeleteCustomerMutation,
  useGetCustomerDetailsQuery,
  useUpdateCustomerMutation,
} = onlineSlice;
