// import React from 'react'
// import { useState } from "react";
// // import { useRegisterMutation } from "../slices/usersApiSlice";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../slices/authSlice";

// function OnlineCustomerRegisterPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [whatsapp, setWhatsapp] = useState("");
//   const [address, setAddress] = useState("");

//   const [searchParams] = useSearchParams();
//   const redirect = searchParams.get("redirect") || "/";
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // const [register] = useRegisterMutation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setError("");
//     // Example registration logic
//     console.log("Username:", name);
//     console.log("Email:", email);
//     console.log("Password:", password);
//     console.log("Role:", role);

//     try {
//       const res = await register({ name, email, password, phone, whatsapp, address}).unwrap();
//       dispatch(setCredentials({ ...res }));
//       //   toast.success("Registration successful");
//       console.log("register successfull");
//       navigate(redirect);
//     } catch (error) {
//       //   toast.error(error?.data?.message || "Registration failed! ❌");
//       console.log(error);
//     }
//   };

//   return (
//     <div>onlineCustomerRegisterPage</div>
//   )
// }

// export default onlineCustomerRegisterPage






import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useRegisterMutation } from "../slices/usersApiSlice"; 
import "./Register.css"; 

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
  const [register] = useRegisterMutation();

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
      const res = await register({
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
    }
  };

  return (
    <div className="register-container">
      <h2>Customer Registration</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input type="text" name="whatsapp" placeholder="WhatsApp" value={form.whatsapp} onChange={handleChange} />
        <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange}></textarea>
        {error && <div className="error">{error}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default OnlineCustomerRegisterPage;
