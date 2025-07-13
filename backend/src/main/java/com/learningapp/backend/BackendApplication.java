package com.learningapp.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;
import java.io.File;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @PostConstruct
    public void createUploadsFolder() {
        File uploadFolder = new File("uploads");

        if (!uploadFolder.exists()) {
            boolean created = uploadFolder.mkdirs();

            if (created) {
                System.out.println("✅ 'uploads/' folder created at: " + uploadFolder.getAbsolutePath());
            } else {
                System.out.println("❌ Failed to create 'uploads/' folder.");
            }
        } else {
            System.out.println("📁 'uploads/' folder already exists at: " + uploadFolder.getAbsolutePath());
        }
    }
}
