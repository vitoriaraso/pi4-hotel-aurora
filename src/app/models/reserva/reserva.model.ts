export interface ReservaResumoDTO {
  id: number;
  checkIn: string;
  checkOut: string;
}

export interface ReservaResponseDTO {
  id: number;
  tipoPagamento: string;
  valorTotal: number;
  status: string;
  checkIn: string;
  checkOut: string;
  dataCadastro: string;
  cliente: { id: number; nome: string; };
  funcionario: { id: number; nome: string; };
  instalacaoAlugavel: { id: number; nome: string; };
}

export interface ReservaRequest {
  tipoPagamento: TipoPagamento;
  statusReserva: StatusReserva;
  checkIn: string; // Enviar como string no formato ISO (ex: "2025-10-22T14:00:00")
  checkOut: string;
  clienteId: number;
  funcionarioId: number;
  instalacaoAlugavelId: number;
}

export enum TipoPagamento {
  CREDITO = 'CREDITO',
  DEBITO = 'DEBITO',
  PIX = 'PIX',
  DINHEIRO = 'DINHEIRO',
}
export enum StatusReserva {
  ATIVA = 'ATIVA',
  CANCELADA = 'CANCELADA',
  FINALIZADA = 'FINALIZADA',
}
