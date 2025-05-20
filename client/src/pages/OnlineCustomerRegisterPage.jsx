import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useCustomerRegisterMutation } from "../slices/onlineSlice";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";

const OnlineCustomerRegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    whatsapp: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerRegister] = useCustomerRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!form.password || form.password.length < 10 || !/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/[0-9]/.test(form.password) || !/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/~`]/.test(form.password)) {
      setError("Password should have 1 uppercase, 1 lowercase, 1 special character, 1 number, and at least 10 characters");
      return
    }

    try {
      const res = await customerRegister({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        whatsapp: form.whatsapp,
        address: form.address,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      setError(error?.data?.message || "Registration failed!");
      console.log(error, "error")
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl w-full mx-auto text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
    >
      <h1 className="text-gray-900 text-3xl mt-10 font-medium">Register</h1>
      <p className="text-gray-500 text-sm mt-2 mb-4">Create your account</p>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full h-12 rounded-full border border-gray-300/80 pl-6 text-sm outline-none text-gray-700"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full h-12 rounded-full border border-gray-300/80 pl-6 text-sm outline-none text-gray-700"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full h-12 rounded-full border border-gray-300/80 pl-6 pr-12 text-sm outline-none text-gray-700"
            value={form.password}
            onChange={handleChange}
            required
            title="Password should have 1 uppercase, 1 lowercase, 1 special character, 1 number, and at least 10 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>


        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full h-12 rounded-full border border-gray-300/80 pl-6 pr-12 text-sm outline-none text-gray-700"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            title="Password should have 1 uppercase, 1 lowercase, 1 special character, 1 number, and at least 10 characters"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>


        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="w-full h-12 rounded-full border border-gray-300/80 pl-6 text-sm outline-none text-gray-700"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp"
          className="w-full h-12 rounded-full border border-gray-300/80 pl-6 text-sm outline-none text-gray-700"
          value={form.whatsapp}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full h-12 rounded-full border border-gray-300/80 pl-6 text-sm outline-none text-gray-700 col-span-1 md:col-span-2"
          value={form.address}
          onChange={handleChange}
          required
        />
      </div>



      <button
        type="submit"
        className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
      >
        Register
      </button>

      <p className="text-gray-500 text-sm mt-4 mb-10">
        Already have an account?{" "}
        <Link to="/login-customer" className="text-indigo-500 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default OnlineCustomerRegisterPage;
