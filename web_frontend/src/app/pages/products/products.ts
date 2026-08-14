import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../../core/services/product.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private wishlistService = inject(WishlistService);

  products = signal<Product[]>([]);
  wishlistIds = signal<Set<number>>(new Set());
  searchTerm = '';
  loadError = signal(false);

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarWishlist();
  }

  onSearchChange(term: string): void {
    this.products.set(this.productService.buscarProductos(term));
  }

  estaEnWishlist(productId: number): boolean {
    return this.wishlistIds().has(productId);
  }

  toggleWishlist(product: Product): void {
    const ids = new Set(this.wishlistIds());
    if (ids.has(product.id)) {
      ids.delete(product.id);
      this.wishlistIds.set(ids);
      this.wishlistService.quitar(product.id).subscribe({
        error: () => this.wishlistIds.update((current) => new Set(current).add(product.id))
      });
    } else {
      ids.add(product.id);
      this.wishlistIds.set(ids);
      this.wishlistService.agregar(product.id).subscribe({
        error: () =>
          this.wishlistIds.update((current) => {
            const reverted = new Set(current);
            reverted.delete(product.id);
            return reverted;
          })
      });
    }
  }

  private cargarProductos(): void {
    this.productService.obtenerProductos().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loadError.set(false);
      },
      error: () => {
        this.loadError.set(true);
      }
    });
  }

  private cargarWishlist(): void {
    this.wishlistService.obtenerWishlist().subscribe({
      next: (products) => {
        this.wishlistIds.set(new Set(products.map((p) => p.id)));
      },
      error: () => {
        // Silencioso: si falla, simplemente no se marcan corazones activos
      }
    });
  }
}

