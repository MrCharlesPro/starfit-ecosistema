import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import Fuse from 'fuse.js';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/api/products';
  private allProducts: Product[] = [];
  private fuseIndex: Fuse<Product> | null = null;

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap((products) => {
        this.allProducts = products;
        this.fuseIndex = new Fuse(products, {
          keys: ['name', 'description', 'category'],
          threshold: 0.35,
          ignoreLocation: true,
          minMatchCharLength: 2
        });
      })
    );
  }

  buscarProductos(term: string): Product[] {
    const query = (term ?? '').trim();

    if (!this.fuseIndex) {
      return this.allProducts;
    }

    if (!query) {
      return this.allProducts;
    }

    return this.fuseIndex.search(query).map((result) => result.item);
  }

  obtenerProducto(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
