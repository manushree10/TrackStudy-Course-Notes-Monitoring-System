import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";


export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  const navigate = useNavigate();

  // 🔐 Switch Tabs
  const toggleMode = () => {
    setIsSignup(!isSignup);
  };

  // 🔐 Email/Password Signup
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Save to backend
      await fetch("http://localhost:8080/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      localStorage.setItem("userRole", role);
      alert("✅ Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("❌ Signup failed: " + error.message);
    }
  };

  // 🔑 Email/Password Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("❌ Login failed: " + error.message);
    }
  };

  // 🔐 Google Auth
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save to backend if new
      await fetch("http://localhost:8080/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, role: "Student" }),
      });

      localStorage.setItem("userRole", "Student");
      navigate("/dashboard");
    } catch (error) {
      alert("❌ Google Auth Error: " + error.message);
    }
  };

  // 🔐 GitHub Auth
  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save to backend if new
      await fetch("http://localhost:8080/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, role: "Student" }),
      });

      localStorage.setItem("userRole", "Student");
      navigate("/dashboard");
    } catch (error) {
      alert("❌ GitHub Auth Error: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2>{isSignup ? "Sign Up" : "Log In"}</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {isSignup && (
          <select style={styles.input} onChange={(e) => setRole(e.target.value)} value={role}>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
          </select>
        )}

        <button style={styles.button} onClick={isSignup ? handleSignup : handleLogin}>
          {isSignup ? "Sign Up" : "Log In"}
        </button>

        <p style={{ marginTop: "10px" }}>
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <span onClick={toggleMode} style={{ color: "blue", cursor: "pointer" }}>
            {isSignup ? "Login" : "Sign up"}
          </span>
        </p>

        <hr />

        <button style={styles.socialButton} onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
        <button style={{ ...styles.socialButton, backgroundColor: "#333" }} onClick={handleGithubLogin}>
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundImage: `url("https://plus.unsplash.com/premium_photo-1725408151382-c61346b6a6cd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formBox: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "320px",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    width: "100%",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
  socialButton: {
    padding: "10px",
    width: "100%",
    backgroundColor: "#4285F4",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
