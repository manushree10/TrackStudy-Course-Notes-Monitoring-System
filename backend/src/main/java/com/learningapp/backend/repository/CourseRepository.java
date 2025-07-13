package com.learningapp.backend.repository;

import com.learningapp.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
    // You get save(), findAll(), findById(), etc. for free!
}
