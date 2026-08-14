import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Rutina {
  id: number;
  nombre: string;
  duracionMin: number;
  caloriasEstimadas: number;
  nivel: string;
  video: string;
  imagen: string;
}

export interface ActividadActual {
  pasos: number;
  bpm: number;
  caloriasQuemadas: number;
  ultimaActualizacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class EcosistemaService {
  private apiUrl = environment.mockApiUrl;

  constructor(private http: HttpClient) {}

  obtenerRutinas(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(`${this.apiUrl}/rutinas`);
  }

  obtenerActividad(): Observable<ActividadActual> {
    return this.http.get<ActividadActual>(`${this.apiUrl}/actividad`);
  }
}
