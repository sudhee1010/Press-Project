import { SHOP_URL } from "../../constants.js";
import { apiSlice } from "./apiSlice.js";


export const ShopApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    Shoplogin: builder.mutation({
      query: (data) => ({
        url: `${SHOP_URL}/signin`,
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
        url: `${USERS_URL}/adminlogout`,
        method: "POST",
      }),
    }),
        // Add get all units
    getAllUnits: builder.query({
      query: () => ({
        url: `${SHOP_URL}/getallunits`,
      }),
      keepUnusedDataFor: 5,
    }),
    // Add verify unit
    verifyUnit: builder.mutation({
      query: (id) => ({
        url: `${SHOP_URL}/${id}/verify`,
        method: "PUT",
      }),
    }),
    // Add reject unit
    rejectUnit: builder.mutation({
      query: (id) => ({
        url: `${SHOP_URL}/${id}/reject`,
        method: "PUT",
      }),
    }),
    // Add delete unit
    deleteUnit: builder.mutation({
      query: (id) => ({
        url: `${SHOP_URL}/deleteunit/${id}`,
        method: "DELETE",
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
  useShoploginMutation,
  useShopRegisterMutation,
  useLogoutShopMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useGetAllUnitsQuery,
  useVerifyUnitMutation,
  useRejectUnitMutation,
  useDeleteUnitMutation,
} = ShopApiSlice;
