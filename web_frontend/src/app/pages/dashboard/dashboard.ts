import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { PlanSeleccionado, SubscriptionService } from '../../core/services/subscription.service';
import { ActividadWidgetComponent } from '../../core/widgets/actividad-widget/actividad-widget';

interface ActivityLog {
  date: string;
  activity: string;
  duration: string;
  calories: number;
}

interface PlanOpcion {
  id: string;
  name: string;
  price: number;
  features: string[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ActividadWidgetComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private subscriptionService = inject(SubscriptionService);
  private fb = inject(FormBuilder);

  userName = 'Invitado';
  private userId = 0;

  planes: PlanOpcion[] = [
    {
      id: 'basico',
      name: 'Básico',
      price: 299,
      features: ['Acceso a sala de pesas', 'Horario diurno 6AM-10PM', '1 evaluación física mensual']
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 499,
      features: ['Acceso total 24/7', 'Clases grupales ilimitadas', 'Plan nutricional básico']
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 799,
      features: ['Todo lo de Pro', 'Entrenador personal 2x semana', 'Plan nutricional avanzado']
    }
  ];

  planActual = signal<PlanSeleccionado | null>(null);
  mostrarFormularioPago = signal(false);
  planEnProceso = signal<PlanOpcion | null>(null);
  pagoExitoso = signal(false);

  pagoForm: FormGroup = this.fb.group({
    cardName: ['', [Validators.required, Validators.minLength(3)]],
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
  });

  stats = [
    { label: 'Visitas este mes', value: 14, icon: '📅' },
    { label: 'Calorías quemadas', value: '8,420', icon: '🔥' },
    { label: 'Plan actual', value: 'Sin plan', icon: '⭐' },
    { label: 'Próxima clase', value: 'Spinning 6PM', icon: '🚴' }
  ];

  activityLog: ActivityLog[] = [
    { date: '24 Jun', activity: 'Spinning', duration: '45 min', calories: 420 },
    { date: '22 Jun', activity: 'Pesas - Tren superior', duration: '60 min', calories: 380 },
    { date: '20 Jun', activity: 'Yoga', duration: '50 min', calories: 210 },
    { date: '18 Jun', activity: 'Cardio HIIT', duration: '30 min', calories: 350 }
  ];

  ngOnInit(): void {
    const session = this.authService.session();
    this.userName = session?.fullName ?? 'Invitado';
    this.userId = session?.userId ?? 0;

    if (this.userId) {
      const plan = this.subscriptionService.obtenerPlan(this.userId);
      this.planActual.set(plan);
      this.actualizarStatPlan(plan);
    }
  }

  elegirPlan(plan: PlanOpcion): void {
    this.planEnProceso.set(plan);
    this.mostrarFormularioPago.set(true);
    this.pagoExitoso.set(false);
    this.pagoForm.reset();
  }

  cancelarPago(): void {
    this.mostrarFormularioPago.set(false);
    this.planEnProceso.set(null);
  }

  confirmarPago(): void {
    if (this.pagoForm.invalid) {
      this.pagoForm.markAllAsTouched();
      return;
    }

    const plan = this.planEnProceso();
    if (!plan) return;

    const cardNumber: string = this.pagoForm.value.cardNumber;
    const nuevoPlan: PlanSeleccionado = {
      planId: plan.id,
      planName: plan.name,
      price: plan.price,
      cardLast4: cardNumber.slice(-4),
      paidAt: new Date().toISOString()
    };

    // Simulado: no se valida contra ninguna pasarela de pago real
    this.subscriptionService.guardarPlan(this.userId, nuevoPlan);
    this.planActual.set(nuevoPlan);
    this.actualizarStatPlan(nuevoPlan);
    this.pagoExitoso.set(true);

    setTimeout(() => {
      this.mostrarFormularioPago.set(false);
      this.planEnProceso.set(null);
    }, 1800);
  }

  esPlanActual(planId: string): boolean {
    return this.planActual()?.planId === planId;
  }

  private actualizarStatPlan(plan: PlanSeleccionado | null): void {
    this.stats = this.stats.map((stat) =>
      stat.label === 'Plan actual' ? { ...stat, value: plan?.planName ?? 'Sin plan' } : stat
    );
  }
}
