// src/main/java/com/learningapp/backend/controller/UserController.java

package com.learningapp.backend.controller;

import com.learningapp.backend.model.User;
import com.learningapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Get all users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Create user (called from signup page)
    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        userRepository.save(user);
        return ResponseEntity.ok("✅ User saved to DB!");
    }
}
