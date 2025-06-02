import React, { useEffect, useState } from "react";
import {
  useCustomerProfileQuery,
  useUpdateCustomerMutation,
} from "../slices/onlineSlice";
import { toast } from "react-toastify";

const CustomerProfileScreen = () => {
  const { data, isLoading, error,refetch } = useCustomerProfileQuery();
  const [updateCustomer] = useUpdateCustomerMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
  });

   useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        whatsapp: data.whatsapp || "",
        address: data.address || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomer(formData).unwrap();
      toast.success("Profile updated successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error fetching profile</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
        <InputField label="Email" name="email" value={formData.email} type="email" onChange={handleChange} />
        <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
        <InputField label="Whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
        <InputField label="Address" name="address" value={formData.address} onChange={handleChange} />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring"
    />
  </div>
);

export default CustomerProfileScreen;
