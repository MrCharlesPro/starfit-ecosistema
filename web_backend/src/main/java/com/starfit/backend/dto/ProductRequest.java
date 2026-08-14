package com.starfit.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {

    @NotBlank(message = "El nombre es requerido")
    private String name;

    private String description;

    @NotNull(message = "El precio es requerido")
    @DecimalMin(value = "0.0", inclusive = true, message = "El precio no puede ser negativo")
    private BigDecimal price;

    private String imageUrl;

    private String category;

    @NotNull(message = "El stock es requerido")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;
}
