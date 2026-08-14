package com.starfit.backend.controller;

import com.starfit.backend.model.Product;
import com.starfit.backend.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<List<Product>> findByUser(@RequestParam Long userId) {
        return ResponseEntity.ok(wishlistService.findByUser(userId));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<Void> add(@PathVariable Long productId, @RequestParam Long userId) {
        wishlistService.add(userId, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> remove(@PathVariable Long productId, @RequestParam Long userId) {
        wishlistService.remove(userId, productId);
        return ResponseEntity.noContent().build();
    }
}
