import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface PlanSeleccionado {
  planId: string;
  planName: string;
  price: number;
  cardLast4: string;
  paidAt: string;
}

const PREFIX = 'starfit_subscription_';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  obtenerPlan(userId: number): PlanSeleccionado | null {
    if (!this.isBrowser) return null;
    const stored = localStorage.getItem(PREFIX + userId);
    return stored ? JSON.parse(stored) : null;
  }

  guardarPlan(userId: number, plan: PlanSeleccionado): void {
    if (!this.isBrowser) return;
    localStorage.setItem(PREFIX + userId, JSON.stringify(plan));
  }
}
