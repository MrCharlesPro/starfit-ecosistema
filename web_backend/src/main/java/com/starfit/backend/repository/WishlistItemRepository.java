package com.starfit.backend.repository;

import com.starfit.backend.model.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {
    List<WishlistItem> findByUserId(Long userId);
    boolean existsByUserIdAndProductId(Long userId, Long productId);
    void deleteByUserIdAndProductId(Long userId, Long productId);

    @Query("SELECT w FROM WishlistItem w JOIN FETCH w.product WHERE w.user.id = :userId")
    List<WishlistItem> findByUserIdWithProduct(@Param("userId") Long userId);
}
