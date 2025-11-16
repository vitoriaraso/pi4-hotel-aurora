// Interface para o resumo do Hotel
export interface HotelResumoDTO {
  id: number;
  nome: string;
}

// Corresponde ao seu InstalacaoResponseDTO
  export interface InstalacaoResponseDTO {
  id: number;
  nome: string;
  isDisponivel: boolean;
  descricao: string;
  tipo: string;
  numeroQuarto: string | null;
  dataCadastro: string; // Vem como string "dd/MM/yyyy HH:mm:ss"
  hotel: HotelResumoDTO;
}

// Corresponde ao seu InstalacaoRequest
export interface InstalacaoRequest {
  nome: string;
  isDisponivel: boolean;
  descricao: string;
  tipo: string;
  categoria: string;
  numeroQuarto: string | null;
  id_hotel: number;
}

// Corresponde ao seu InstalacaoUpdateRequest
export interface InstalacaoUpdateRequest {
  isDisponivel: boolean;
}

// Corresponde ao seu OrcamentoResponseDTO
export interface OrcamentoResponseDTO {
  classe: string;
  categoria: string;
  valorFinal: number;
}

// Corresponde ao seu InstalacaoResumoDTO (útil para o model de Reserva)
export interface InstalacaoResumoDTO {
  id: number;
  nome: string;
  descricao: string;
}

// Enum dos tipos de instalações
export enum TipoInstalacao {
  AUDITORIO = 'AUDITORIO',
  QUARTO = 'QUARTO',
  SALAODECONFERENCIA = 'SALAODECONFERENCIA',
  SALAODEEVENTOS = 'SALAODEEVENTOS',
  SAUNA = 'SAUNA',
  SPA = 'SPA'
}

// Mapa de exibição
export const TipoInstalacaoLabel: Record<TipoInstalacao, string> = {
  [TipoInstalacao.AUDITORIO]: 'Auditório',
  [TipoInstalacao.QUARTO]: 'Quarto',
  [TipoInstalacao.SALAODECONFERENCIA]: 'Sala de Conferência',
  [TipoInstalacao.SALAODEEVENTOS]: 'Salão de Eventos',
  [TipoInstalacao.SAUNA]: 'Sauna',
  [TipoInstalacao.SPA]: 'SPA',
};

// --- Dicionários de Categorias (Baseado nos seus Enums Java) ---
// Criamos um mapa de 'valor' (o que a API espera) para 'exibição' (o que o usuário vê)
export const CategoriaAuditorio = {
  ANFITEATRO: 'Anfiteatro',
  TEATRO: 'Teatro',
  CONGRESSO: 'Congresso'
};
export const CategoriaQuarto = {
  PRESIDENCIAL: 'Presidencial',
  DELUXE: 'Deluxe',
  EXECUTIVO: 'Executivo',
  STANDARD: 'Standard'
};
export const CategoriaSalaConferencia = {
  BOARDROOM: 'Boardroom',
  TRAINING: 'Training',
  CO_WORKING: 'Co-working'
};
export const CategoriaSalaoEventos = {
  CASAMENTO: 'Casamento',
  FESTA_INFANTIL: 'Festa Infantil',
  FORMATURA: 'Formatura',
  CORPORATIVO: 'Corporativo'
};
export const CategoriaSauna = {
  SECA: 'Seca',
  VAPOR: 'Vapor',
  INFRAVERMELHO: 'Infravermelho',
  MISTA: 'Mista'
};
export const CategoriaSpa = {
  HIDROTERAPIA: 'Hidroterapia',
  TERAPEUTICO: 'Terapêutico',
  DETOX: 'Detox'
};

// --- O MAPA MESTRE ---
// Conecta o Tipo (Select 1) ao seu respectivo dicionário de Categorias (Select 2)
export const CategoriaPorTipo: Record<TipoInstalacao, Record<string, string>> = {
  [TipoInstalacao.AUDITORIO]: CategoriaAuditorio,
  [TipoInstalacao.QUARTO]: CategoriaQuarto,
  [TipoInstalacao.SALAODECONFERENCIA]: CategoriaSalaConferencia,
  [TipoInstalacao.SALAODEEVENTOS]: CategoriaSalaoEventos,
  [TipoInstalacao.SAUNA]: CategoriaSauna,
  [TipoInstalacao.SPA]: CategoriaSpa
};
