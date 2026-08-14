package com.starfit.backend.service;

import com.starfit.backend.dto.ProductRequest;
import com.starfit.backend.model.Product;
import com.starfit.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> findAll(String search) {
        if (search == null || search.isBlank()) {
            return productRepository.findAll();
        }
        return productRepository.searchByNameOrCategory(search.trim());
    }

    public Product findById(Long id) {
        return productRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Producto no encontrado"));
    }

    public Product create(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImageUrl(request.getImageUrl());
        product.setCategory(request.getCategory());
        product.setStock(request.getStock());
        return productRepository.save(product);
    }
}
