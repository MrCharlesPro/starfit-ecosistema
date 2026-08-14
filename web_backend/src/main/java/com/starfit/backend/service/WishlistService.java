package com.starfit.backend.service;

import com.starfit.backend.model.Product;
import com.starfit.backend.model.User;
import com.starfit.backend.model.WishlistItem;
import com.starfit.backend.repository.ProductRepository;
import com.starfit.backend.repository.UserRepository;
import com.starfit.backend.repository.WishlistItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistItemRepository wishlistItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public List<Product> findByUser(Long userId) {
        return wishlistItemRepository.findByUserIdWithProduct(userId).stream()
            .map(WishlistItem::getProduct)
            .collect(Collectors.toList());
    }

    @Transactional
    public void add(Long userId, Long productId) {
        if (wishlistItemRepository.existsByUserIdAndProductId(userId, productId)) {
            return;
        }
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new NoSuchElementException("Usuario no encontrado"));
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new NoSuchElementException("Producto no encontrado"));

        WishlistItem item = new WishlistItem();
        item.setUser(user);
        item.setProduct(product);
        wishlistItemRepository.save(item);
    }

    @Transactional
    public void remove(Long userId, Long productId) {
        wishlistItemRepository.deleteByUserIdAndProductId(userId, productId);
    }
}
