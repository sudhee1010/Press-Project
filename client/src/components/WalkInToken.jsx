import React, { useState } from "react";
import { useGenerateWalkInTokenMutation } from "../slices/walkinTokenSlice"; // adjust path as needed

const WalkInToken = () => {
  const [triggerGenerateToken, { data, error, isLoading }] = useGenerateWalkInTokenMutation();
  const [token, setToken] = useState(null);

  const handleGenerateToken = async () => {
    try {
      const result = await triggerGenerateToken().unwrap();
      setToken(result.token); // assuming response is { token: "TKN-0001" }
    } catch (err) {
      console.error("Token generation failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800">
        Walk-in Customer Token
      </h2>

      <button
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg disabled:opacity-50"
        onClick={handleGenerateToken}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Token"}
      </button>

      {token && (
        <div className="mt-4 text-center bg-green-100 border border-green-300 rounded-lg p-4 w-full max-w-xs">
          <p className="text-gray-700 font-semibold">Token Number:</p>
          <p className="text-2xl font-bold text-green-800">{token}</p>
        </div>
      )}

      {error && (
        <div className="text-center bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg w-full max-w-xs">
          {error?.data?.message || "Something went wrong"}
        </div>
      )}
    </div>
  );
};

export default WalkInToken;
