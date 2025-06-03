import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetAllUnitsQuery,
  useVerifyUnitMutation,
  useRejectUnitMutation,
} from "../slices/shopSlice"; // Make sure these hooks exist
// import Spinner from "../components/Spinner"; // Optional loading spinner

function ShopApprovalList() {
  const dispatch = useDispatch();
  const { data: shops, isLoading, refetch } = useGetAllUnitsQuery();
//  const x = useGetAllUnitsQuery();
//   console.log(x.data,"shop")
  const [approveShop] = useVerifyUnitMutation();
  const [rejectShop] = useRejectUnitMutation();

  const handleApprove = async (id) => {
    await approveShop(id);
    refetch();
  };

  const handleReject = async (id) => {
    await rejectShop(id);
    refetch();
  };

  if (isLoading) return ;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Shop Approval Panel</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            
            {shops.data?.map((shop) => (
              <tr key={shop._id} className="border-t">
                <td className="py-2 px-4">{shop.name}</td>
                <td className="py-2 px-4">{shop.email}</td>
                <td className="py-2 px-4">{shop.phone}</td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {shop.status}
                </td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleApprove(shop._id)}
                    disabled={shop.status === "approved"}
                    className="px-3 py-1 text-sm text-white bg-green-600 rounded disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(shop._id)}
                    disabled={shop.status === "rejected"}
                    className="px-3 py-1 text-sm text-white bg-red-600 rounded disabled:opacity-50"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShopApprovalList;
