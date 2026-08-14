package com.starfit.backend.service;

import com.starfit.backend.dto.AuthResponse;
import com.starfit.backend.dto.LoginRequest;
import com.starfit.backend.dto.RegisterRequest;
import com.starfit.backend.model.User;
import com.starfit.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {
        // Verificar si el email ya existe
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse("El email ya está registrado", null, null, null, false);
        }

        // Crear el usuario
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        User saved = userRepository.save(user);

        return new AuthResponse(
            "¡Cuenta creada con éxito!",
            saved.getId(),
            saved.getFullName(),
            saved.getEmail(),
            true
        );
    }

    public AuthResponse login(LoginRequest request) {
        // Buscar usuario por email
        User user = userRepository.findByEmail(request.getEmail())
            .orElse(null);

        if (user == null) {
            return new AuthResponse("Correo o contraseña incorrectos", null, null, null, false);
        }

        // Verificar contraseña
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            return new AuthResponse("Correo o contraseña incorrectos", null, null, null, false);
        }

        return new AuthResponse(
            "Login exitoso",
            user.getId(),
            user.getFullName(),
            user.getEmail(),
            true
        );
    }
}