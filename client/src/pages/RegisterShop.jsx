// import { useState } from "react";
// import { useShopRegisterMutation } from "../slices/shopSlice.js";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../slices/authSlice";

// function RegisterShop() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [whatsapp, setWhatsapp] = useState("");
//   const [address, setAddress] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   const [searchParams] = useSearchParams();
//   const redirect = searchParams.get("redirect") || "/";

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [shopRegister] = useShopRegisterMutation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       setError("");
//       const res = await shopRegister({
//         name,
//         email,
//         phone,
//         whatsapp,
//         address,
//         password,
//       }).unwrap();

//       dispatch(setCredentials({ ...res }));
//       navigate(redirect);
//     } catch (error) {
//       console.log(error);
//       setError(error?.data?.message || "Registration failed!");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
//     >
//       <h1 className="text-gray-900 text-3xl mt-10 font-medium">Register</h1>
//       <p className="text-gray-500 text-sm mt-2">Create your shop account</p>

//       {error && (
//         <p className="text-red-500 text-sm mt-4 mb-2 text-center">{error}</p>
//       )}

//       <input
//         type="text"
//         placeholder="Name"
//         className="mt-6 w-full h-12 rounded-full border border-gray-300/80 pl-6 text-sm outline-none text-gray-700"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         className="mt-4 w-full h-12 rounded-full border border-gray-300/80 pl-6 text-sm outline-none text-gray-700"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />

//       <input
//         type="text"
//         placeholder="Phone"
//         className="mt-4 w-full h-12 rounded-full border border-gray-300/80 pl-6 text-sm outline-none text-gray-700"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         required
//       />

//       <input
//         type="text"
//         placeholder="WhatsApp"
//         className="mt-4 w-full h-12 rounded-full border border-gray-300/80 pl-6 text-sm outline-none text-gray-700"
//         value={whatsapp}
//         onChange={(e) => setWhatsapp(e.target.value)}
//         required
//       />

//       <input
//         type="text"
//         placeholder="Address"
//         className="mt-4 w-full h-12 rounded-full border border-gray-300/80 pl-6 text-sm outline-none text-gray-700"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         required
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         className="mt-4 w-full h-12 rounded-full border border-gray-300/80 pl-6 text-sm outline-none text-gray-700"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />

//       <input
//         type="password"
//         placeholder="Confirm Password"
//         className="mt-4 w-full h-12 rounded-full border border-gray-300/80 pl-6 text-sm outline-none text-gray-700"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         required
//       />

//       <button
//         type="submit"
//         className="mt-6 mb-10 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
//       >
//         Register
//       </button>
//     </form>
//   );
// }

// export default RegisterShop;

import { useState } from "react";
import { useShopRegisterMutation } from "../slices/shopSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

function RegisterShop() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [whatsapp, setWhatsapp] = useState("");
  // const [address, setAddress] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [error, setError] = useState("");

  // const [searchParams] = useSearchParams();
  // const redirect = searchParams.get("redirect") || "/";
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [ShopRegister] = useShopRegisterMutation();

  // const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (password !== confirmPassword) {
  //         setError("Passwords do not match");
  //         return;
  //     }

  //     try {
  //         setError("");
  //         const res = await ShopRegister({
  //             name,
  //             email,
  //             phone,
  //             whatsapp,
  //             address,
  //             password,
  //         }).unwrap();

  //         dispatch(setCredentials({ ...res }));
  //         navigate(redirect);
  //     } catch (error) {
  //         setError(error?.data?.message || "Registration failed!");
  //         console.log(error)
  //     }
  // };
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
  // const [searchParams] = useSearchParams();
  // const redirect = searchParams.get("redirect") || "/admin";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ShopRegister] = useShopRegisterMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await ShopRegister({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        whatsapp: form.whatsapp,
        address: form.address,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      navigate("/admin");
    } catch (error) {
      setError(error?.data?.message || "Registration failed!");
      console.log(error, "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl w-full mx-auto text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
    >
      <h1 className="text-gray-900 text-3xl mt-10 font-medium">Register</h1>
      <p className="text-gray-500 text-sm mt-2 mb-4">
        Create your shop account
      </p>

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

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full h-12 rounded-full border border-gray-300/80 pl-6 text-sm outline-none text-gray-700"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full h-12 rounded-full border border-gray-300/80 pl-6 text-sm outline-none text-gray-700"
          value={form.confirmPassword}
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
        <Link to="" className="text-indigo-500 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterShop;
