// src/app/models/hotel/hotel.model.ts

// --- Interfaces "Stub" ---
// Precisamos definir a "forma" mínima desses objetos
// que vêm aninhados dentro do HotelResponseDTO.
// Se você já tem esses modelos em outros arquivos, pode importá-los.
export interface EspacosResponseDTO {
  id: number;
  tipoEspacos: string;
  descricao: string;
}

export interface AlugavelResponseDTO { // Baseado na nossa refatoração anterior
  id: number;
  nome: string;
  isDisponivel: boolean;
  tipo: string;
}

// --- Modelos Principais ---

// Corresponde ao seu HotelResponseDTO
export interface HotelResponseDTO {
  id: number;
  nome: string;
  espacos: EspacosResponseDTO[];
  instalacaoAlugaveis: AlugavelResponseDTO[];
}

// Corresponde ao seu HotelRequestDTO
// (Usado para Criar e Atualizar)
export interface HotelRequestDTO {
  nome: string;
}

// Corresponde ao seu HotelResumoDTO
export interface HotelResumoDTO {
  id: number;
  nome: string;
}
