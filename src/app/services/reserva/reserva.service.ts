import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export enum TipoPagamento {
  CARTAO_CREDITO = 'CARTAO_CREDITO',
  CARTAO_DEBITO = 'CARTAO_DEBITO',
  PIX = 'PIX',
  BOLETO = 'BOLETO',
  DINHEIRO = 'DINHEIRO',
}

export enum StatusReserva {
  PENDENTE = 'PENDENTE',
  CONFIRMADA = 'CONFIRMADA',
  CANCELADA = 'CANCELADA',
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
}

export interface ReservaRequest {
  tipoPagamento: TipoPagamento;
  statusReserva: StatusReserva;
  checkIn: string;
  checkOut: string;
  clienteId: number;
  funcionarioId: number;
  instalacaoAlugavelId: number;
}

export interface ReservaResumoDTO {
  id: number;
  checkIn: string;
  checkOut: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/api/reservas';
}
