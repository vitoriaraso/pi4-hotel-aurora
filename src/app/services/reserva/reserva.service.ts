import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReservaRequest, ReservaResponseDTO } from '../../models/reserva/reserva.model';
import { ClienteService } from '../cliente/cliente.service';

// Re-exporta os modelos para facilitar a importação
export * from '../../models/reserva/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private http = inject(HttpClient);
  private clienteService = inject(ClienteService);
  private apiUrl = 'http://localhost:8081/api/reservas';

  /**
   * Busca a lista de todas as reservas (Admin/Func)
   */
  getReservas(): Observable<ReservaResponseDTO[]> {
    return this.http.get<ReservaResponseDTO[]>(this.apiUrl);
  }

  /**
   * Cadastra uma nova reserva.
   * O backend retorna o DTO criado.
   */
  cadastrarReserva(data: ReservaRequest): Observable<ReservaResponseDTO> {
    return this.http.post<ReservaResponseDTO>(this.apiUrl, data);
  }

  /**
   * Busca os detalhes completos das reservas de um cliente específico.
   * @param clienteId O ID do cliente.
   */
  getReservasPorCliente(clienteId: number): Observable<ReservaResponseDTO[]> {
    return forkJoin({
      cliente: this.clienteService.getClienteById(clienteId),
      todasAsReservas: this.getReservas()
    }).pipe(
      map(resultados => {
        const { cliente, todasAsReservas } = resultados;
        const idsReservasDoCliente = new Set(cliente.reservas.map(r => r.id));
        const reservasFiltradas = todasAsReservas.filter(reserva =>
          idsReservasDoCliente.has(reserva.id)
        );
        return reservasFiltradas;
      })
    );
  }

  // Seus DTOs não incluem DELETE ou PUT, então esses métodos não serão adicionados.
}
