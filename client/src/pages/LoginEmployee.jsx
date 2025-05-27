import { useState } from "react";
import { useLoginMutation } from "../slices/usersApiSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

function LoginEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("designer");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

  

    setError("");
    // Example registration logic
    console.log("Username:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", role);

    try {
      const res = await login({ name, email, password, role }).unwrap();
      dispatch(setCredentials({ ...res }));
      //   toast.success("Registration successful");
      console.log("login successfull");
      navigate(redirect);
    } catch (error) {
      //   toast.error(error?.data?.message || "Registration failed! ❌");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Login Now
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

      <input
        id="name"
        className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        id="email"
        className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        id="password"
        className="w-full border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />


      <select
        className="w-full border mt-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      >
        <option value="designer">Designer</option>
        <option value="printer">Printer</option>
        <option value="production">Production</option>
      </select>

      <button
        type="submit"
        className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600/90 active:scale-95 transition py-2.5 rounded-full text-white"
      >
        Login
      </button>
    </form>
  );
}

export default LoginEmployee;
