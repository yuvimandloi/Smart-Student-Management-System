package com.project.ssms.service;

import com.project.ssms.dto.RegisterRequest;
import com.project.ssms.model.Student;
import com.project.ssms.model.User;
import com.project.ssms.repository.StudentRepository;
import com.project.ssms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    public User login(String username, String password) {

        User user = userRepository
                .findByUsername(username)
                .orElse(null);

        if (user != null &&
                user.getPassword().equals(password)) {

            return user;
        }

        return null;
    }

    public String register(RegisterRequest request) {

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Username already exists";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setRole("STUDENT");

        userRepository.save(user);

        Student student = new Student();
        student.setName(request.getName());
        student.setEmail(request.getEmail());
        student.setUsername(request.getUsername());
        student.setCourse(request.getCourse());
        student.setYear(request.getYear());
        student.setAttendance("0%");
        student.setFeesStatus("Pending");
        student.setMarks("0");

        studentRepository.save(student);

        return "Registration Successful";
    }
}