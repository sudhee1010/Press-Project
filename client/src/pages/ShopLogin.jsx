

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useShoploginMutation } from "../slices/shopSlice";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";

function ShopLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const [ShopLogin, { isLoading }] = useShoploginMutation();

  const validate = () => {
    const newErrors = {};
    const { email, password } = form;

    if (!email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format";

    if (!password) {
      newErrors.password = "Password is required";
    }
    // } else {
    //   if (password.length < 10)
    //     newErrors.password = "Password must be at least 10 characters";
    //   else if (!/[a-z]/.test(password))
    //     newErrors.password = "Password must include a lowercase letter";
    //   else if (!/[A-Z]/.test(password))
    //     newErrors.password = "Password must include an uppercase letter";
    //   else if (!/\d/.test(password))
    //     newErrors.password = "Password must include a number";
    //   else if (!/[@$!%*?&]/.test(password))
    //     newErrors.password = "Password must include a special character (@$!%*?&)";
    // }

    return newErrors;
  };

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      setError(validate());
    }
  }, [form, touched]);

  const checkPasswordCriteria = (password) => {
    setPasswordCriteria({
      length: password.length >= 10,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    });
  };



  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "password") {
      checkPasswordCriteria(value);
    }
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      setTouched({ email: true, password: true });
      return;
    }

    try {
      const res = await ShopLogin(form).unwrap();
      dispatch(setCredentials(res.user));
      navigate(redirect);
    } catch (err) {
      console.log("Login error:", err);

      const backendErrors = err?.data?.errors || {};
      const message = err?.data?.message || "";

      if (backendErrors.approval) {
        setError("Your account is not approved yet. Please wait.");
      } else if (backendErrors.email) {
        setError("Email not found.");
      } else if (backendErrors.password) {
        setError("Incorrect password.");
      } else if (message.includes("not approved")) {
        setError("Your account is not approved yet. Please wait.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  // const inputClass = (field) =>
  //   `w-full rounded-full border px-4 py-2.5 mt-1 transition bg-transparent outline-none text-sm ${error[field] && touched[field]
  //     ? "border-red-500"
  //     : "border-gray-300 focus:border-indigo-500"
  //   }`;

  const errorText = (field) =>
    error[field] && touched[field] ? (
      <p className="text-xs text-red-500 mt-1">{error[field]}</p>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[384px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white mx-auto mt-10 shadow-md"
    >
      <h1 className="text-gray-900 text-3xl mt-10 font-medium">Shop Login</h1>
      <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>

      {typeof error === "string" && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

      <div className="w-full mt-6">
        <div className="flex items-center bg-white border border-gray-300/80 h-12 rounded-full pl-6 gap-2">
          <FiMail className="text-gray-500" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="w-full bg-transparent outline-none text-sm"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
            aria-label="Email"
          />
        </div>
        {errorText("email")}
      </div>


      <div className="w-full mt-4">
        <div className="relative flex items-center bg-white border border-gray-300/80 h-12 rounded-full pl-6 gap-2">
          <FiLock className="text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full bg-transparent outline-none text-sm"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="current-password"
            aria-label="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 text-gray-500"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {errorText("password")}

        {/* Password criteria display */}
        {form.password && (
          <div className="bg-gray-50 p-3 mt-2 rounded-md text-left border text-xs">
            <ul className="space-y-1">
              <li className={passwordCriteria.length ? "text-green-600" : "text-gray-400"}>
                • At least 10 characters
              </li>
              <li className={passwordCriteria.lowercase ? "text-green-600" : "text-gray-400"}>
                • Contains lowercase letter
              </li>
              <li className={passwordCriteria.uppercase ? "text-green-600" : "text-gray-400"}>
                • Contains uppercase letter
              </li>
              <li className={passwordCriteria.number ? "text-green-600" : "text-gray-400"}>
                • Contains number
              </li>
              <li className={passwordCriteria.specialChar ? "text-green-600" : "text-gray-400"}>
                • Contains special character (@$!%*?&)
              </li>
            </ul>
          </div>
        )}
      </div>




      <div className="mt-5 text-left text-indigo-500">
        <Link to="/forgot-password" className="text-sm hover:underline">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <p className="text-gray-500 text-sm mt-3 mb-11">
        Don’t have an account?{" "}
        <Link to="/register-shop" className="text-indigo-500 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default ShopLogin;

