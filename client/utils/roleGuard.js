// utils/roleGuard.js
import store from "../src/store.js";
import { redirect } from "react-router-dom";

// Role-based guard
export const roleGuard = (allowedRoles = []) => {
  const state = store.getState();
  const user = state.auth?.userInfo;
  // console.log(state);
  console.log(user);
  if (!user) {
    // Not logged in
    return redirect("/");
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but unauthorized
    return redirect("/unauthorized");
  }

  // All good
  return null;
};
