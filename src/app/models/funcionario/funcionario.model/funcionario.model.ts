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
