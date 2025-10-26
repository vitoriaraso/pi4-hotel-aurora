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

  getTodasAsReservas(): Observable<ReservaResponseDTO[]> {
    return this.http.get<ReservaResponseDTO[]>(this.apiUrl);
  }

  criarReserva(dadosReserva: ReservaRequest): Observable<ReservaResponseDTO> {
    return this.http.post<ReservaResponseDTO>(this.apiUrl, dadosReserva);
  }

  /**
   * Busca os detalhes completos das reservas de um cliente específico.
   * @param clienteId O ID do cliente.
   */
  getReservasPorCliente(clienteId: number): Observable<ReservaResponseDTO[]> {
    // forkJoin executa ambas as requisições em paralelo, otimizando o tempo.
    return forkJoin({
      cliente: this.clienteService.getClienteById(clienteId),
      todasAsReservas: this.getTodasAsReservas()
    }).pipe(
      map(resultados => {
        const { cliente, todasAsReservas } = resultados;

        // 1. Pega apenas os IDs das reservas que estão no objeto do cliente.
        const idsReservasDoCliente = new Set(cliente.reservas.map(r => r.id));

        // 2. Filtra a lista completa de reservas, retornando apenas aquelas
        //    cujo ID pertence ao cliente.
        const reservasFiltradas = todasAsReservas.filter(reserva =>
          idsReservasDoCliente.has(reserva.id)
        );

        return reservasFiltradas;
      })
    );
  }
}
