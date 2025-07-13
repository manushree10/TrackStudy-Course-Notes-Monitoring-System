// src/main/java/com/learningapp/backend/repository/UserRepository.java

package com.learningapp.backend.repository;

import com.learningapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
