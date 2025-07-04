// src/pages/AdminDashboard.js
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase"; // your firebase.js setup
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../utils/authConfig";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:8080/api/users/all");
      const data = await res.json();
      setUsers(data);

      const roleCounts = data.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.entries(roleCounts).map(([role, count]) => ({
        role,
        count,
      }));

      setUserStats(chartData);
    };

    const fetchCourses = async () => {
      const res = await fetch("http://localhost:8080/api/courses/all");
      const data = await res.json();
      setCourses(data);
    };

    fetchUsers();
    fetchCourses();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2>⚙️ Admin Dashboard</h2>
        <div style={styles.tabButtons}>
          <button
            onClick={() => setActiveTab("users")}
            style={activeTab === "users" ? styles.activeTab : styles.tab}
          >
            👥 Users
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            style={activeTab === "courses" ? styles.activeTab : styles.tab}
          >
            📚 Courses
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            style={activeTab === "analytics" ? styles.activeTab : styles.tab}
          >
            📈 Analytics
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <AnimatePresence>
          {/* USERS TAB */}
          {activeTab === "users" && (
            <motion.div
              key="users"
              style={styles.section}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
            >
              <h3>👥 All Users</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={idx}>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {/* COURSES TAB */}
          {activeTab === "courses" && (
  <div style={{ textAlign: "center", width: "100%" }}>
    <h2>📚 All Courses</h2>
    <ul style={{ listStyle: "none", padding: 0, width: "150%", margin: "0 auto" }}>
      {courses.map((course, i) => (
        <li key={i} style={{ ...courseStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            {course.title} —{course.description} (<i>{course.fileName}</i>)
          </div>
          <button
            style={{
              padding: "3px 3px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
            onClick={async () => {
              if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
                try {
                  const response = await fetch(`http://localhost:8080/api/courses/delete/${course.id}`, {
                    method: "DELETE",
                  });
                  if (response.ok) {
                    setCourses(courses.filter((c) => c.id !== course.id));
                    alert("✅ Course deleted successfully!");
                  } else {
                    alert("❌ Failed to delete course.");
                  }
                } catch (err) {
                  console.error(err);
                  alert("❌ Error deleting course.");
                }
              }
            }}
          >
            🗑️ Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
)}


          {/* ANALYTICS TAB */}
          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              style={styles.section}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
            >
              <h3>📊 User Role Distribution</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={userStats}>
                  <XAxis dataKey="role" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>

              <h3 style={{ marginTop: "40px" }}> Pie Chart View</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userStats}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                    dataKey="count"
                  >
                    {userStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={["#0088FE", "#00C49F", "#FFBB28"][index % 3]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "url('https://images.unsplash.com/photo-1584697964273-2219b0b3b047') no-repeat center center",
    backgroundSize: "cover",
    fontFamily: "sans-serif",
  },
  sidebar: {
    width: "260px",
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: "30px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
  },
  content: {
    flex: 1,
    padding: "40px",
    backdropFilter: "blur(4px)",
  },
  tabButtons: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  tab: {
    padding: "10px",
    fontSize: "16px",
    background: "#f0f0f0",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  activeTab: {
    padding: "10px",
    fontSize: "16px",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  section: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "800px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
};

// ✅ Place this *after* the styles object
const courseStyle = {
  marginBottom: "10px",
  padding: "10px",
  background: "white",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

export default AdminDashboard;
