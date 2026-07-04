package com.project.ssms.controller;

import com.project.ssms.model.Student;
import com.project.ssms.dto.StudentDTO;
import com.project.ssms.dto.ApiResponse;
import com.project.ssms.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import jakarta.validation.Valid;

import com.project.ssms.repository.StudentRepository;
import java.util.Optional;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3002"}) // ✅ FIXED
public class StudentController {

    @Autowired
    private StudentService service;

    @Autowired
    private StudentRepository studentRepository;

    // POST
    @PostMapping
    public ResponseEntity<ApiResponse<Student>> addStudent(@Valid @RequestBody Student student) {
        Student saved = service.saveStudent(student);
        return ResponseEntity.ok(new ApiResponse<>("Student added successfully", saved));
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<ApiResponse<List<StudentDTO>>> getAllStudents() {
        return ResponseEntity.ok(
                new ApiResponse<>("Students fetched successfully", service.getAllStudents())
        );
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentDTO>> getStudentById(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ApiResponse<>("Student fetched successfully", service.getStudentById(id))
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentDTO>> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody Student student) {

        Student updated = service.updateStudent(id, student);

        StudentDTO dto = new StudentDTO();
        dto.setId(updated.getId());
        dto.setName(updated.getName());
        dto.setEmail(updated.getEmail());
        dto.setCourse(updated.getCourse());
        dto.setYear(updated.getYear());
        dto.setAttendance(updated.getAttendance());
        dto.setFeesStatus(updated.getFeesStatus());
        dto.setMarks(updated.getMarks());

        return ResponseEntity.ok(
                new ApiResponse<>("Student updated successfully", dto)
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteStudent(@PathVariable Long id) {
        service.deleteStudent(id);
        return ResponseEntity.ok(
                new ApiResponse<>("Student deleted successfully", null)
        );

    }
    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getStudentProfile(
            @PathVariable String username) {

        Optional<Student> student =
                studentRepository.findByUsername(username);

        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        }

        return ResponseEntity.badRequest()
                .body("Student Not Found");
    }
}