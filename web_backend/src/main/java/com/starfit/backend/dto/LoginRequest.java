package com.starfit.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank(message = "El email es requerido")
    @Email(message = "El email no es válido")
    private String email;

    @NotBlank(message = "La contraseña es requerida")
    private String password;
}