import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import ForgotPassword from "./pages/ForgotPassword.jsx";
// import Unauthorized from "./pages/Unauthorized.jsx";
// import NotFound from "./pages/NotFound.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import RegisterEmploye from "./pages/RegisterEmploye";
import LoginEmployee from "./pages/LoginEmployee";
import store from "./store";
import { Provider } from "react-redux";
import CustomerLogin from "./pages/CustomerLogin";
import RegisterShop from "./pages/RegisterShop";
import ShopLogin from "./pages/ShopLogin";
import AdminDashboard from "./pages/AdminDashboard";
import OnlineCustomerRegisterPage from "./pages/OnlineCustomerRegisterPage";
import ShopApprovalList from "./pages/ShopApprovalList";
import ThankYou from "./pages/Thankyou";
import { roleGuard } from "../utils/roleGuard";
import roleRedirectLoader from "../utils/roleRedirectLoader";
import WalkInOrderForm from "./pages/WalkInOrderForm";
import CustomerProfileScreen from "./pages/CustomerProfileScreen";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import NotFound from "./pages/NotFound";
import WalkInToken from "./components/WalkInToken";
import CustomerDashboard from "./pages/CustomerDashboard";

/*
// Public Pages
import LandingPage from "./pages/public/LandingPage";
import Login from "./pages/public/Login";
import CustomerRegister from "./pages/public/CustomerRegister";
import ShopRegister from "./pages/public/ShopRegister";
import ResetPassword from "./pages/public/ResetPassword";
import Terms from "./pages/public/Terms";
import Privacy from "./pages/public/Privacy";
import PendingApproval from "./pages/public/PendingApproval";


// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import CustomerList from "./pages/admin/CustomerList";
import TokenManagement from "./pages/admin/TokenManagement";
import ManageEmployees from "./pages/admin/ManageEmployees";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminActivityLog from "./pages/admin/AdminActivityLog";

// Super Admin Pages
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import ShopList from "./pages/superadmin/ShopList";
import ApproveShopRequests from "./pages/superadmin/ApproveShopRequests";
import ManageRoles from "./pages/superadmin/ManageRoles";
import SuperAdminProfile from "./pages/superadmin/SuperAdminProfile";

// Customer Pages
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CreateOrder from "./pages/customer/CreateOrder";
import MyOrders from "./pages/customer/MyOrders";
import CustomerProfile from "./pages/customer/CustomerProfile";
import CustomerSupport from "./pages/customer/CustomerSupport";
*/

const router = createBrowserRouter([
  {
    path: "/",
    loader: roleRedirectLoader,
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login-customer", element: <CustomerLogin /> },
      { path: "register-customer", element: <OnlineCustomerRegisterPage /> },
      { path: "register-shop", element: <RegisterShop /> },
      { path: "login-shop", element: <ShopLogin /> },
      { path: "login-employee", element: <LoginEmployee /> },
      { path: "thank-you", element: <ThankYou /> },
      { path: "*", element: <NotFound /> },
      // { path: 'reset-password/:token', element: <ResetPassword /> },
      // { path: 'terms', element: <Terms /> },
      // { path: 'privacy', element: <Privacy /> },
      // { path: 'pending-approval', element: <PendingApproval /> },
      // { path: 'unauthorized', element: <Unauthorized /> },
      // { path: '*', element: <NotFound /> },
    ],
  },
  { path: "login-superadmin", element: <SuperAdminLogin /> },
  {
    path: "/admin",
    element: <DashboardLayout />,
    loader: () => roleGuard(["admin"]),
    children: [
      { index: true, element: <AdminDashboard /> },
      //  { path: 'orders', element: <WalkInOrderForm/> },
      { path: "register", element: <RegisterEmploye /> },
      { path: "create-order", element: <WalkInOrderForm /> },
      { path: "logout", element: <WalkInOrderForm /> },
      { path: "token", element: <WalkInToken /> },

      // { path: 'customers', element: <CustomerList /> },
      // { path: 'tokens', element: <TokenManagement /> },
      // { path: 'employees', element: <ManageEmployees /> },
      // { path: 'profile', element: <AdminProfile /> },
      // { path: 'activity-log', element: <AdminActivityLog /> },
    ],
  },
  {
    path: "/superadmin",
    element: <DashboardLayout />,
    loader: () => roleGuard(["superadmin"]),
    children: [
      { index: true, element: <SuperAdminDashboard /> },
      { path: "shop-list", element: <ShopApprovalList /> },
      // { path: "shops", element: <ShopList /> },
      // { path: "approve-shops", element: <ApproveShopRequests /> },
      // { path: "roles", element: <ManageRoles /> },
      // { path: "profile", element: <SuperAdminProfile /> },
    ],
  },
  {
    path: "/customer",
    element: <DashboardLayout />,
    // loader: customerLoader,
    children: [
      { index: true, element: <CustomerDashboard /> },
      { path: "profile", element: <CustomerProfileScreen /> },
      // { path: "orders", element: <MyOrders /> },
      // { path: "profile", element: <CustomerProfile /> },
      // { path: "support", element: <CustomerSupport /> },
    ],
  },
]);

export default router;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
