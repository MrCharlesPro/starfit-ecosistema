import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/services/product.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class WishlistComponent implements OnInit {
  private wishlistService = inject(WishlistService);

  products = signal<Product[]>([]);
  loadError = signal(false);

  ngOnInit(): void {
    this.cargar();
  }

  quitar(product: Product): void {
    const anterior = this.products();
    this.products.set(anterior.filter((p) => p.id !== product.id));
    this.wishlistService.quitar(product.id).subscribe({
      error: () => {
        this.products.set(anterior);
      }
    });
  }

  private cargar(): void {
    this.wishlistService.obtenerWishlist().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loadError.set(false);
      },
      error: () => {
        this.loadError.set(true);
      }
    });
  }
}

