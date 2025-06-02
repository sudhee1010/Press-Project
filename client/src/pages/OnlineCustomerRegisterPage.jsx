import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useCustomerRegisterMutation } from "../slices/onlineSlice";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
  // const [success, setSuccess] = useState("");
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerRegister] = useCustomerRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const successNotify = (msg) => toast.success(msg, { position: "bottom-right" });
  const errorNotify = (msg) => toast.error(msg, { position: "bottom-right" });



  const validate = () => {
    const newErrors = {};

    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      whatsapp,
      address,
    } = form;

    if (!name.trim()) newErrors.name = "Name is required";

    if (!email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!phone) newErrors.phone = "Phone number is required";
    if (!/^\d{10}$/.test(phone)) newErrors.phone = "Invalid phone number";

    if (!whatsapp) newErrors.whatsapp = "WhatsApp number is required";
    if (!/^\d{10}$/.test(whatsapp)) newErrors.whatsapp = "Invalid WhatsApp number";

    if (!address.trim()) newErrors.address = "Address is required";

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      if (password.length < 10)
        newErrors.password = "Password must be at least 10 characters";
      else if (!/[a-z]/.test(password))
        newErrors.password = "Password must include a lowercase letter";
      else if (!/[A-Z]/.test(password))
        newErrors.password = "Password must include an uppercase letter";
      else if (!/\d/.test(password))
        newErrors.password = "Password must include a number";
      else if (!/[@$!%*?&]/.test(password))
        newErrors.password ="Password must include a special character (@$!%*?&)";
    }

    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";



    return newErrors;
  };

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      setError(validate());
    }
  }, [form, touched]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  ///for red border if field is incorrect
  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      errorNotify("Passwords do not match");
      setError("Passwords do not match");
      return;
    }
    if (!form.password || form.password.length < 10 || !/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/[0-9]/.test(form.password) || !/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/~`]/.test(form.password)) {
      setError("Password should have 1 uppercase, 1 lowercase, 1 special character, 1 number, and at least 10 characters");
      errorNotify(
        "Password must have 1 uppercase, 1 lowercase, 1 special character, 1 number, and at least 10 characters"
      );
      return
    }


    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        phone: true,
        whatsapp: true,
        address: true,
      });
      return;
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
      // setError("Registration successful!")
      successNotify("Registration successful!");
      setTimeout(() => {
        navigate(redirect);
      }, 1500);

    } catch (error) {
      const errorMessage = error?.data?.message || "Registration failed!";
      errorNotify(errorMessage);
      setError(errorMessage)
      console.log(error, "error")
    }
  };

  const inputClass = (field) =>
    `w-full rounded-full border px-4 py-2.5 mt-1 transition ${error[field] && touched[field]
      ? "border-red-500"
      : "border-gray-300 focus:border-indigo-500"
    }`;

  const errorText = (field) =>
    error[field] && touched[field] ? (
      <p className="text-xs text-red-500 mt-1">{error[field]}</p>
    ) : null;




  return (
    <div>
      <ToastContainer position='bottom-right' />
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full mx-auto text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">Register</h1>
        <p className="text-gray-500 text-sm mt-2 mb-4">Create your account</p>

        {typeof error === "string" && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onBlur={handleBlur}
              className={inputClass("name")}
              value={form.name}
              onChange={handleChange}
              required
            />
            {errorText("name")}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onBlur={handleBlur}
              className={inputClass("email")}
              value={form.email}
              onChange={handleChange}
              required
            />
            {errorText("email")}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onBlur={handleBlur}
              className={inputClass("password")}
              value={form.password}
              onChange={handleChange}
              required
              title="Password should have 1 uppercase, 1 lowercase, 1 special character, 1 number, and at least 10 characters"
            />
            {errorText("password")}

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
              onBlur={handleBlur}
              className={inputClass("confirmPassword")}
              value={form.confirmPassword}
              onChange={handleChange}
              required
              title="Password should have 1 uppercase, 1 lowercase, 1 special character, 1 number, and at least 10 characters"
            />
            {errorText("confirmPassword")}

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onBlur={handleBlur}
              className={inputClass("phone")}
              value={form.phone}
              onChange={handleChange}
              required
            />
            {errorText("phone")}
          </div>

          <div>
            <input
              type="text"
              name="whatsapp"
              placeholder="WhatsApp"
              onBlur={handleBlur}
              className={inputClass("whatsapp")}
              value={form.whatsapp}
              onChange={handleChange}
              required
            />
            {errorText("whatsapp")}
          </div>

          <div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              onBlur={handleBlur}
              className={inputClass("address")}
              value={form.address}
              onChange={handleChange}
              required
            />
            {errorText("address")}
          </div>
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
    </div>
  );
};

export default OnlineCustomerRegisterPage;
