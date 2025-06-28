// src/pages/Signup.js

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // 🔐 Create user in Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);

      // 🛠️ Save email & role to backend MySQL
      await fetch("http://localhost:8080/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      });

      // 💾 Store role locally
      localStorage.setItem("userRole", role);

      alert(`🎉 Signup Successful as ${role}!`);
      navigate("/dashboard");
    } catch (error) {
      alert("Signup Error: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2>Signup</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 👤 Role Dropdown */}
        <select
          style={styles.input}
          onChange={(e) => setRole(e.target.value)}
          value={role}
        >
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Admin">Admin</option>
        </select>

        <button style={styles.button} onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundImage: `url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1170&auto=format&fit=crop")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formBox: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    margin: "10px",
    width: "250px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
