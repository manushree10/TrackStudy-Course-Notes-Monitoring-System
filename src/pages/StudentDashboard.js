import React, { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/courses/all")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("❌ Error fetching courses:", err));
  }, []);

  return (
    <div>
      <h3>📚 Student Dashboard</h3>
      <p>View available courses:</p>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <strong>{course.title}</strong> - {course.description} <br />
            <a
            href={`http://localhost:8080/api/courses/download/${encodeURIComponent(course.fileName)}`}
            target="_blank"
            rel="noopener noreferrer"
            >
  📥 Download
</a>

          </li>
        ))}
      </ul>
    </div>
  );
}
