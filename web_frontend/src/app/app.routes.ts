import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { TermsComponent } from './pages/terms/terms';
import { PrivacyComponent } from './pages/privacy/privacy';
import { EcosistemaComponent } from './pages/ecosistema/ecosistema';
import { ProductsComponent } from './pages/products/products';
import { WishlistComponent } from './pages/wishlist/wishlist';
import { authGuard, guestOnlyGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [guestOnlyGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'ecosistema', component: EcosistemaComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [authGuard] },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '**', redirectTo: '' }
];