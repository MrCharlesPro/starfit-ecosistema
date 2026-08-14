import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Plan {
  name: string;
  price: number;
  features: string[];
  highlighted: boolean;
  color: string;
}

interface Feature {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  plans: Plan[] = [
    {
      name: 'Básico',
      price: 299,
      features: ['Acceso a sala de pesas', 'Horario diurno 6AM-10PM', '1 evaluación física mensual', 'Acceso a app móvil'],
      highlighted: false,
      color: '#3b82f6'
    },
    {
      name: 'Pro',
      price: 499,
      features: ['Acceso total 24/7', 'Clases grupales ilimitadas', 'Evaluación mensual', 'Plan nutricional básico', 'Descuento en productos'],
      highlighted: true,
      color: '#ffd700'
    },
    {
      name: 'Elite',
      price: 799,
      features: ['Todo lo de Pro', 'Entrenador personal 2x semana', 'Plan nutricional avanzado', 'Acceso a spa y sauna', 'Asesoría dedicada'],
      highlighted: false,
      color: '#6d28d9'
    }
  ];

  features: Feature[] = [
    {
      icon: 'dumbbell',
      title: 'Equipo de punta',
      text: 'Máquinas y pesas de última generación certificadas internacionalmente.'
    },
    {
      icon: 'trainer',
      title: 'Entrenadores certificados',
      text: 'Acompañamiento profesional de expertos en fitness y wellness.'
    },
    {
      icon: 'clock',
      title: 'Horario flexible',
      text: 'Abierto 24/7 en planes Pro y Elite, adaptado a tu rutina.'
    },
    {
      icon: 'nutrition',
      title: 'Asesoría nutricional',
      text: 'Planes alimenticios personalizados por nutricionistas certificados.'
    }
  ];

  getFeatureIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      dumbbell: 'M8 4H6v2H4v2h2v10H4v2h2v2h2v-2h8v2h2v-2h2v-2h-2V8h2V6h-2V4h-2v2h-8V4z',
      trainer: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z',
      clock: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-5-3V7z',
      nutrition: 'M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1-11h2v5h-2z'
    };
    return icons[iconName] || icons['dumbbell'];
  }
}