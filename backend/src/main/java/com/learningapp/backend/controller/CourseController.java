package com.learningapp.backend.controller;

import com.learningapp.backend.model.Course;
import com.learningapp.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    // ✅ Upload course with file
    @PostMapping("/upload")
    public ResponseEntity<String> uploadCourse(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("file") MultipartFile file) {

        try {
            File uploadDir = new File("uploads");
            if (!uploadDir.exists()) {
                boolean created = uploadDir.mkdirs();
                System.out.println(created ? "✅ Created uploads folder." : "❌ Failed to create uploads folder.");
            }

            String filePath = uploadDir.getAbsolutePath() + File.separator + file.getOriginalFilename();
            File savedFile = new File(filePath);
            file.transferTo(savedFile);

            Course course = new Course();
            course.setTitle(title);
            course.setDescription(description);
            course.setFileName(file.getOriginalFilename());

            courseRepository.save(course);

            return ResponseEntity.ok("✅ Course uploaded and saved!");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("❌ Upload failed: " + e.getMessage());
        }
    }

    // 📚 Get all courses
    @GetMapping("/all")
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // 📥 Download course file
    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        try {
            filename = java.net.URLDecoder.decode(filename, "UTF-8");

            Path filePath = Paths.get("uploads").resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (MalformedURLException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // ❌ Course Delete API
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) {
            courseRepository.deleteById(id);
            return ResponseEntity.ok("Deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
        }
    }
}
