// src/main/java/com/learningapp/backend/model/User.java

package com.learningapp.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String role;
}
