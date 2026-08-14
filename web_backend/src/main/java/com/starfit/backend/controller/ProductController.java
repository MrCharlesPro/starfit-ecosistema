package com.starfit.backend.controller;

import com.starfit.backend.dto.ProductRequest;
import com.starfit.backend.model.Product;
import com.starfit.backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> findAll(@RequestParam(required = false) String search) {
        return ResponseEntity.ok(productService.findAll(search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Product> create(@Valid @RequestBody ProductRequest request) {
        Product created = productService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
