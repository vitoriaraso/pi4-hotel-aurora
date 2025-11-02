// (Opcional) Interface para o resumo do Hotel, usado na resposta
export interface HotelResumoDTO {
  id: number;
  nome: string;
}

// Corresponde ao seu FuncionarioResponseDTO
export interface FuncionarioResponseDTO {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  dataCadastro: string; // Vem como string "dd/MM/yyyy HH:mm:ss"
  hotel: HotelResumoDTO;
}

// Corresponde ao seu FuncionarioRequest
export interface FuncionarioRequest {
  nome: string;
  cargo: string;
  cpf: string;
  email: string;
  telefone: string;
  senha: string;
  id_hotel: number;
}

// Corresponde ao seu FuncionarioUpdateRequest
export interface FuncionarioUpdateRequest {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
}

/**
 * Enum para os cargos de funcionário.
 * Os valores correspondem exatamente aos do backend.
 */
export enum CargoFuncionario {
  // Alta Gestão
  GERENTE_GERAL = 'GERENTE_GERAL',
  DIRETOR_FINANCEIRO = 'DIRETOR_FINANCEIRO',
  DIRETOR_OPERACOES = 'DIRETOR_OPERACOES',

  // Gerência Média
  GERENTE_HOSPEDAGEM = 'GERENTE_HOSPEDAGEM',
  GERENTE_RECEPCAO = 'GERENTE_RECEPCAO',
  GERENTE_RESERVAS = 'GERENTE_RESERVAS',
  GERENTE_EVENTOS = 'GERENTE_EVENTOS',
  GERENTE_AB = 'GERENTE_AB',
  GOVERNANTA_EXECUTIVA = 'GOVERNANTA_EXECUTIVA',
  CHEFE_MANUTENCAO = 'CHEFE_MANUTENCAO',
  CHEF_EXECUTIVO = 'CHEF_EXECUTIVO',
  CHEF_SEGURANCA = 'CHEF_SEGURANÇA', // Cuidado com o acento, se no Java for 'Ç', aqui também deve ser

  // Supervisão
  SUPERVISOR_RECEPCAO = 'SUPERVISOR_RECEPCAO',
  AUDITOR_NOTURNO = 'AUDITOR_NOTURNO',
  COORDENADOR_EVENTOS = 'COORDENADOR_EVENTOS',
  MAITRE = 'MAITRE',

  // Operacional
  RECEPCIONISTA = 'RECEPCIONISTA',
  ANALISTA_RESERVAS = 'ANALISTA_RESERVAS',
  CONCIERGE = 'CONCIERGE',
  ANALISTA_FINANCEIRO = 'ANALISTA_FINANCEIRO',
  COMPRADOR = 'COMPRADOR'
}

/**
 * Dicionário (Record) para mapear os valores do enum
 * para nomes de exibição amigáveis (labels).
 */
export const CargoFuncionarioLabel: Record<CargoFuncionario, string> = {
  // Alta Gestão
  [CargoFuncionario.GERENTE_GERAL]: 'Gerente Geral',
  [CargoFuncionario.DIRETOR_FINANCEIRO]: 'Diretor Financeiro',
  [CargoFuncionario.DIRETOR_OPERACOES]: 'Diretor de Operações',

  // Gerência Média
  [CargoFuncionario.GERENTE_HOSPEDAGEM]: 'Gerente de Hospedagem',
  [CargoFuncionario.GERENTE_RECEPCAO]: 'Gerente de Recepção',
  [CargoFuncionario.GERENTE_RESERVAS]: 'Gerente de Reservas',
  [CargoFuncionario.GERENTE_EVENTOS]: 'Gerente de Eventos',
  [CargoFuncionario.GERENTE_AB]: 'Gerente de A&B',
  [CargoFuncionario.GOVERNANTA_EXECUTIVA]: 'Governanta Executiva',
  [CargoFuncionario.CHEFE_MANUTENCAO]: 'Chefe de Manutenção',
  [CargoFuncionario.CHEF_EXECUTIVO]: 'Chef Executivo',
  [CargoFuncionario.CHEF_SEGURANCA]: 'Chefe de Segurança',

  // Supervisão
  [CargoFuncionario.SUPERVISOR_RECEPCAO]: 'Supervisor de Recepção',
  [CargoFuncionario.AUDITOR_NOTURNO]: 'Auditor Noturno',
  [CargoFuncionario.COORDENADOR_EVENTOS]: 'Coordenador de Eventos',
  [CargoFuncionario.MAITRE]: 'Maître',

  // Operacional
  [CargoFuncionario.RECEPCIONISTA]: 'Recepcionista',
  [CargoFuncionario.ANALISTA_RESERVAS]: 'Analista de Reservas',
  [CargoFuncionario.CONCIERGE]: 'Concierge',
  [CargoFuncionario.ANALISTA_FINANCEIRO]: 'Analista Financeiro',
  [CargoFuncionario.COMPRADOR]: 'Comprador'
};
