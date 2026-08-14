package com.starfit.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "El nombre es requerido")
    @Size(min = 3, message = "El nombre debe tener al menos 3 caracteres")
    private String fullName;

    @NotBlank(message = "El email es requerido")
    @Email(message = "El email no es válido")
    private String email;

    @Pattern(regexp = "^[0-9]{10}$", message = "El teléfono debe tener 10 dígitos")
    private String phone;

    @NotBlank(message = "La contraseña es requerida")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;
}