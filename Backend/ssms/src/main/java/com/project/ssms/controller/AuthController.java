package com.project.ssms.controller;

import com.project.ssms.dto.ApiResponse;
import com.project.ssms.dto.LoginRequest;
import com.project.ssms.dto.RegisterRequest;
import com.project.ssms.model.User;
import com.project.ssms.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002"
})
public class AuthController {

    @Autowired
    private AuthService authService;

    // LOGIN API
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<User>> login(
            @RequestBody LoginRequest request) {

        User user = authService.login(
                request.getUsername(),
                request.getPassword()
        );

        if (user != null) {
            return ResponseEntity.ok(
                    new ApiResponse<>("Login Successful", user)
            );
        }

        return ResponseEntity.badRequest().body(
                new ApiResponse<>("Invalid Username or Password", null)
        );
    }

    // REGISTER API
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(
            @RequestBody RegisterRequest request) {

        String result = authService.register(request);

        if (result.equals("Registration Successful")) {

            return ResponseEntity.ok(
                    new ApiResponse<>(result, null)
            );
        }

        return ResponseEntity.badRequest().body(
                new ApiResponse<>(result, null)
        );
    }
}