// utils/roleRedirectLoader.js
import store from "../src/store.js";
import { redirect } from "react-router-dom";

export default function roleRedirectLoader() {
  const user = store.getState().auth.userInfo;

  if (user) {
    const role = user.role;

    if (role === "admin") return redirect("/admin");
    if (role === "superadmin") return redirect("/superadmin");
    if (role === "designer") return redirect("/designer");
    if (role === "printing") return redirect("/printing");
    if (role === "production") return redirect("/production");
  }

  return null; // Let it load normally if no user
}
