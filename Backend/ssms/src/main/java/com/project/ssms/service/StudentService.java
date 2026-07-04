package com.project.ssms.service;

import com.project.ssms.model.Student;
import com.project.ssms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.ssms.exception.ResourceNotFoundException;
import java.util.List;
import com.project.ssms.dto.StudentDTO;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    // SAVE
    public Student saveStudent(Student student) {
        return repository.save(student);
    }

    // GET ALL
    public List<StudentDTO> getAllStudents() {

        return repository.findAll()
                .stream()
                .map(student -> {

                    StudentDTO dto = new StudentDTO();
                    dto.setId(student.getId());
                    dto.setName(student.getName());
                    dto.setEmail(student.getEmail());
                    dto.setCourse(student.getCourse());
                    dto.setYear(student.getYear());

                    dto.setAttendance(student.getAttendance());
                    dto.setFeesStatus(student.getFeesStatus());
                    dto.setMarks(student.getMarks());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    // GET BY ID
    public StudentDTO getStudentById(Long id) {
        Student student = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setName(student.getName());
        dto.setEmail(student.getEmail());
        dto.setCourse(student.getCourse());
        dto.setYear(student.getYear());
        dto.setAttendance(student.getAttendance());
        dto.setFeesStatus(student.getFeesStatus());
        dto.setMarks(student.getMarks());

        return dto;
    }

    // UPDATE
    public Student updateStudent(Long id, Student student) {

        Student existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        existing.setName(student.getName());
        existing.setEmail(student.getEmail());
        existing.setCourse(student.getCourse());
        existing.setYear(student.getYear());

        existing.setAttendance(student.getAttendance());
        existing.setFeesStatus(student.getFeesStatus());
        existing.setMarks(student.getMarks());

        return repository.save(existing);
    }


    // DELETE
    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }


}


