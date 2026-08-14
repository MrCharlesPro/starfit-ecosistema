import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  message: string;
  userId: number;
  fullName: string;
  email: string;
  success: boolean;
}

const SESSION_KEY = 'starfit_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Estado reactivo de sesión, compartido por toda la app (ej. navbar)
  session = signal<AuthResponse | null>(this.isBrowser ? this.readStoredSession() : null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password });
  }

  register(data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
  }

  saveSession(user: AuthResponse): void {
    if (this.isBrowser) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }
    this.session.set(user);
  }

  getSession(): AuthResponse | null {
    return this.session();
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(SESSION_KEY);
    }
    this.session.set(null);
  }

  isLoggedIn(): boolean {
    return !!this.session();
  }

  private readStoredSession(): AuthResponse | null {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  }
}
