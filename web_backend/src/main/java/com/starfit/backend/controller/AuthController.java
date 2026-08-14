package com.starfit.backend.controller;

import com.starfit.backend.dto.AuthResponse;
import com.starfit.backend.dto.LoginRequest;
import com.starfit.backend.dto.RegisterRequest;
import com.starfit.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        int status = response.isSuccess() ? 201 : 400;
        return ResponseEntity.status(status).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        int status = response.isSuccess() ? 200 : 401;
        return ResponseEntity.status(status).body(response);
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("StarFit Backend OK");
    }
}