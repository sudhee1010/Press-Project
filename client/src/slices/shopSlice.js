import { SHOP_URL } from "../../constants.js";
import { apiSlice } from "./apiSlice.js";


export const ShopApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    Shoplogin: builder.mutation({
      query: (data) => ({
        url: `${SHOP_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    ShopRegister: builder.mutation({
      query: (data) => ({
        url: `${SHOP_URL}/createPrintingUnit`,
        method: "POST",
        body: data,
      }),
    }),
    logoutShop: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    ShopProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: "data",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useShopRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = ShopApiSlice;
