import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-sm h-[400px] text-center">
      <p className="font-medium text-lg text-indigo-500">404 Error</p>
      <h2 className="md:text-6xl text-4xl font-semibold text-gray-800">Page Not Found</h2>
      <p className="text-base mt-4 text-gray-500">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="flex items-center gap-4 mt-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-indigo-500 hover:bg-indigo-600 px-7 py-2.5 text-white rounded active:scale-95 transition-all"
        >
          Go back home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
