// src/pages/TeacherDashboard.js

import React, { useState } from "react";

const BACKEND_URL = "http://localhost:8080/api/courses/upload";

export default function TeacherDashboard() {
  const [courseTitle, setCourseTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [courses, setCourses] = useState([]);

  const handleUpload = async () => {
    if (!courseTitle || !description || !file) {
      alert("Please enter all fields and select a file.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("title", courseTitle);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      alert(result);

      if (response.ok) {
        // Add new course to list
        const newCourse = {
          title: courseTitle,
          description: description,
          fileName: file.name,
        };
        setCourses([...courses, newCourse]);

        // Reset form
        setCourseTitle("");
        setDescription("");
        setFile(null);
        document.getElementById("fileInput").value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Upload failed. Check backend connection.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h3>📝 Teacher Dashboard</h3>
      <p>Upload a new course:</p>

      <input
        type="text"
        placeholder="Course Title"
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.textarea}
      />

      <input
        id="fileInput"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={styles.input}
      />

      <button onClick={handleUpload} style={styles.button}>
        Upload Course
      </button>

      <h4 style={{ marginTop: "30px" }}>📋 Uploaded Courses:</h4>
      <ul>
        {courses.map((course, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <strong>{course.title}</strong> ({course.fileName})<br />
            {course.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  input: {
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    height: "80px",
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
    marginBottom: "20px",
  },
};
