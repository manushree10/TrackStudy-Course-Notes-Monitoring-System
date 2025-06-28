// src/components/AdminRoute.js

import React from "react";
import { Navigate } from "react-router-dom";

// AdminRoute is like a security guard for admin-only pages!
export default function AdminRoute({ children }) {
  // Get user's role from localStorage (where you stored it at signup/login)
  const role = localStorage.getItem("userRole");

  // If the user is not an admin, block access and send to login
  if (role !== "Admin") {
    alert("Access Denied ❌ - Admins only!");
    return <Navigate to="/login" replace />;
  }

  // If user is an Admin, allow access
  return children;
}
