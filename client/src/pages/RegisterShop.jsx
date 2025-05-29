import { useState ,useEffect} from "react";
import { useShopRegisterMutation } from "../slices/shopSlice.js";
import { Link, useNavigate } from "react-router-dom";

function RegisterShop() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    whatsapp: "",
    address: "",
  });

//   const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const navigate = useNavigate();
  const [ShopRegister] = useShopRegisterMutation();

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
    if (!whatsapp) newErrors.whatsapp = "WhatsApp number is required";
    if (!address.trim()) newErrors.address = "Address is required";

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      if (password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      else if (!/[a-z]/.test(password))
        newErrors.password = "Password must include a lowercase letter";
      else if (!/[A-Z]/.test(password))
        newErrors.password = "Password must include an uppercase letter";
      else if (!/\d/.test(password))
        newErrors.password = "Password must include a number";
      else if (!/[@$!%*?&]/.test(password))
        newErrors.password =
          "Password must include a special character (@$!%*?&)";
    }

    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

    useEffect(() => {
      if (Object.keys(touched).length > 0) {
        setErrors(validate());
      }
    }, [form, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setForm({ ...form, [name]: value });
     setForm((prev) => ({ ...prev, [name]: value }));
    // setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
      const res = await ShopRegister({
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        phone: form.phone,
        whatsapp: form.whatsapp,
        address: form.address,
      }).unwrap();

      console.log(res);
      navigate("/thank-you");

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        whatsapp: "",
        address: "",
      });
    } catch (error) {
    //   setError(error?.data?.error || "Registration failed!");
      console.log(error, "error");
    }
  };

  const inputClass = (field) =>
    `w-full rounded-full border px-4 py-2.5 mt-1 transition ${
      errors[field] && touched[field]
        ? "border-red-500"
        : "border-gray-300 focus:border-indigo-500"
    }`;

  const errorText = (field) =>
    errors[field] && touched[field] ? (
      <p className="text-xs text-red-500 mt-1">{errors[field]}</p>
    ) : null;


 

  

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl w-full mx-auto text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
    >
      <h1 className="text-gray-900 text-3xl mt-10 font-medium">Register</h1>
      <p className="text-gray-500 text-sm mt-2 mb-4">
        Create your shop account
      </p>

      {/* {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>} */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("name")}
            // required
          />
          {errorText("name")}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("email")}
            // required
          />
          {errorText("email")}
        </div>
        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("phone")}
            // required
          />
          {errorText("phone")}
        </div>
        <div>
          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp"
            value={form.whatsapp}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("whatsapp")}
            // required
          />
          {errorText("whatsapp")}
        </div>
        <div className="md:col-span-2">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("address")}
            // required
          />
          {errorText("address")}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("password")}
            // required
          />
          {errorText("password")}
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("confirmPassword")}
            // required
          />
          {errorText("confirmPassword")}
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
        <Link to="/login-shop" className="text-indigo-500 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterShop;
