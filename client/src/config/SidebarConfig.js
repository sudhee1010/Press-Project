export const sidebars = {
  superadmin: [
    { label: "Shop Approval", path: "/superadmin/shop-list" },
    { label: "Logout", path: "/superadmin/logout" },
    // { label: "Employees", path: "/superadmin/employees" },
  ],
  admin: [
    // { label: "Dashboard", path: "/admin" },
    { label: "Register", path: "/admin/register" },
    { label: "Create order", path: "/admin/create-order" },
    { label: "Logout", action: "logout" },
    // { label: "Payments", path: "/admin/payments" },
  ],
  designer: [
    { label: "Design Orders", path: "/designer/orders" },
    { label: "Invoices", path: "/designer/invoices" },
  ],
};
