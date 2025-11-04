// --- Enums ---
export enum TipoPagamento {
  PIX = 'PIX',
  CREDITO = 'CREDITO',
  DEBITO = 'DEBITO',
  DINHEIRO = 'DINHEIRO'
}

export enum StatusReserva {
  CONFIRMADA = 'CONFIRMADA',
  PENDENTE = 'PENDENTE',
  CANCELADA = 'CANCELADA',
  ATIVA = 'ATIVA',
  FINALIZADA = 'FINALIZADA'
}

// --- Interfaces de Resumo (DTOs Aninhadas) ---
export interface ClienteResumoDTO {
  id: number;
  nome: string;
  email: string;
}

export interface FuncionarioResumoDTO {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
}

export interface InstalacaoResumoDTO {
  id: number;
  nome: string;
  descricao: string;
}

// --- Interfaces Principais ---

// Corresponde ao seu ReservaResponseDTO (o que recebemos da API)
export interface ReservaResponseDTO {
  id: number;
  tipoPagamento: TipoPagamento;
  valorTotal: number;
  statusReserva: StatusReserva;
  checkIn: string; // Vem como "dd/MM/yyyy HH:mm:ss"
  checkOut: string;
  dataCadastro: string;
  cliente: ClienteResumoDTO;
  funcionario: FuncionarioResumoDTO;
  instalacaoAlugavel: InstalacaoResumoDTO;
}

export interface ReservaRequest {
  tipoPagamento: TipoPagamento;
  checkIn: string;
  checkOut: string;
  clienteId: number;
  funcionarioId: number | null;
  instalacaoAlugavelId: number;
}

export interface ReservaResumoDTO {
  id: number;
  checkIn: string;
  checkOut: string;
  statusReserva: StatusReserva;
  valorTotal: number;
}
