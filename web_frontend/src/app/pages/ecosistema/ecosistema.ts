import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcosistemaService, Rutina } from '../../core/services/ecosistema.service';
import { ActividadWidgetComponent } from '../../core/widgets/actividad-widget/actividad-widget';

@Component({
  selector: 'app-ecosistema',
  standalone: true,
  imports: [CommonModule, ActividadWidgetComponent],
  templateUrl: './ecosistema.html',
  styleUrl: './ecosistema.css'
})
export class EcosistemaComponent implements OnInit {
  rutinas = signal<Rutina[]>([]);
  rutinasError = signal(false);

  constructor(private ecosistemaService: EcosistemaService) {}

  ngOnInit(): void {
    this.cargarRutinas();
  }

  iconoRutina(nombre: string): string {
    const n = (nombre ?? '').toLowerCase();
    if (n.includes('yoga')) return '🧘';
    if (n.includes('spinning') || n.includes('bici') || n.includes('ciclismo')) return '🚴';
    if (n.includes('correr') || n.includes('cardio') || n.includes('running')) return '🏃';
    if (n.includes('pesas') || n.includes('fuerza') || n.includes('peso')) return '🏋️';
    if (n.includes('hiit') || n.includes('interval')) return '🔥';
    if (n.includes('estira') || n.includes('flexibil') || n.includes('movilidad')) return '🤸';
    if (n.includes('nata')) return '🏊';
    return '💪';
  }

  private cargarRutinas(): void {
    this.ecosistemaService.obtenerRutinas().subscribe({
      next: (rutinas) => {
        this.rutinas.set(rutinas);
        this.rutinasError.set(false);
      },
      error: () => {
        this.rutinasError.set(true);
      }
    });
  }
}

