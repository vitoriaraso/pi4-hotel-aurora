import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ReservaResponseDTO,
  ReservaRequest
} from '../../models/reserva/reserva.model';
import { ClienteService } from '../cliente/cliente.service';


export * from '../../models/reserva/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private http = inject(HttpClient);
  private clienteService = inject(ClienteService);
  private apiUrl = 'http://localhost:8081/api/reservas';

  getReservas(): Observable<ReservaResponseDTO[]> {
    return this.http.get<ReservaResponseDTO[]>(this.apiUrl);
  }

  criarReserva(dadosReserva: ReservaRequest): Observable<ReservaResponseDTO> {
    return this.http.post<ReservaResponseDTO>(this.apiUrl, dadosReserva);
  }
}
