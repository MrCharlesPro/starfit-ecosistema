import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.service';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = `${environment.apiUrl}/wishlist`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private get userId(): number | null {
    return this.authService.session()?.userId ?? null;
  }

  obtenerWishlist(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { params: { userId: this.userId ?? '' } });
  }

  agregar(productId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${productId}`, null, { params: { userId: this.userId ?? '' } });
  }

  quitar(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`, { params: { userId: this.userId ?? '' } });
  }
}
