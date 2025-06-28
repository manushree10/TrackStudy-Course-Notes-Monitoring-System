// src/pages/Dashboard.js

import React from "react";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";
import AdminDashboard from "./AdminDashboard";


export default function Dashboard() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const role = localStorage.getItem("userRole") || "Unknown";

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("userRole");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Welcome, {role}! 👋</h2>
        <p>You are logged in as: <strong>{user?.email}</strong></p>
        {role === "Student" && <StudentDashboard />}
       {role === "Teacher" && <TeacherDashboard />}
        {role === "Admin" && <AdminDashboard />}

        <button style={styles.button} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundImage: `url("https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "300px"
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  }
};
