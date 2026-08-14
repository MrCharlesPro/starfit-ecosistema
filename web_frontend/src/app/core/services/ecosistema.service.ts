import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  obtenerRutinas(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(`${this.apiUrl}/rutinas`);
  }

  obtenerActividad(): Observable<ActividadActual> {
    return this.http.get<ActividadActual>(`${this.apiUrl}/actividad`);
  }
}
