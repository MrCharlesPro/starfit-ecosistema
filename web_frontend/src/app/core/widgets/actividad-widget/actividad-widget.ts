import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription, of, timer } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ActividadActual, EcosistemaService } from '../../services/ecosistema.service';

/**
 * ActividadWidgetComponent
 *
 * Este widget muestra el estado en tiempo real del wearable conectado a la app.
 * Se conecta al mock_api de la API del wearable mediante EcosistemaService,
 * consumiendo el endpoint http://localhost:3000/api/actividad. El componente es
 * reutilizable y puede incorporarse en cualquier vista del frontend, como el
 * dashboard o la página de ecosistema, sin duplicar la lógica de polling.
 */
@Component({
  selector: 'app-actividad-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="actividad-widget" aria-live="polite">
      <header class="actividad-widget__header">
        <h2>Actividad en vivo</h2>
      </header>

      <article class="actividad-widget__panel" *ngIf="actividad() && !actividadError()">
        <dl class="actividad-widget__stats">
          <div class="actividad-widget__stat">
            <dt>❤️ BPM</dt>
            <dd>{{ actividad()?.bpm }}</dd>
          </div>
          <div class="actividad-widget__stat">
            <dt>👣 Pasos</dt>
            <dd>{{ actividad()?.pasos }}</dd>
          </div>
          <div class="actividad-widget__stat">
            <dt>🔥 Calorías</dt>
            <dd>{{ actividad()?.caloriasQuemadas }}</dd>
          </div>
        </dl>
        <p class="actividad-widget__updated">Última actualización: {{ actividad()?.ultimaActualizacion }}</p>
      </article>

      <p class="actividad-widget__offline" *ngIf="actividadError()">📡 Sin conexión con el dispositivo</p>
    </section>
  `,
  styles: [
    `
      .actividad-widget {
        display: block;
        padding: 1.5rem;
        border-radius: 18px;
        background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
        border: 1px solid rgba(255,255,255,0.08);
        margin-bottom: 2rem;
      }

      .actividad-widget__header h2 {
        margin: 0 0 1rem;
        font-size: 1.5rem;
      }

      .actividad-widget__stats {
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
      }

      .actividad-widget__stat {
        background: rgba(0, 0, 0, 0.15);
        border-radius: 14px;
        padding: 1rem;
      }

      .actividad-widget__stat dt {
        font-size: 0.82rem;
        opacity: 0.8;
        margin-bottom: 0.5rem;
      }

      .actividad-widget__stat dd {
        margin: 0;
        font-size: 1.7rem;
        font-weight: 700;
      }

      .actividad-widget__updated {
        margin-top: 0.75rem;
        opacity: 0.8;
      }

      .actividad-widget__offline {
        margin: 0;
        font-weight: 600;
      }
    `
  ]
})
export class ActividadWidgetComponent implements OnInit, OnDestroy {
  actividad = signal<ActividadActual | null>(null);
  actividadError = signal(false);

  private pollingSub?: Subscription;

  constructor(private ecosistemaService: EcosistemaService) {}

  ngOnInit(): void {
    this.pollingSub = timer(0, 2000)
      .pipe(
        switchMap(() => this.ecosistemaService.obtenerActividad().pipe(catchError(() => of(null))))
      )
      .subscribe((actividad) => this.actualizarActividad(actividad));
  }

  ngOnDestroy(): void {
    this.pollingSub?.unsubscribe();
  }

  private actualizarActividad(actividad: ActividadActual | null): void {
    if (actividad) {
      this.actividad.set(actividad);
      this.actividadError.set(false);
      return;
    }

    this.actividadError.set(true);
  }
}
