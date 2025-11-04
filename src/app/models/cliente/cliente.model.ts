import { ReservaResumoDTO } from '../reserva/reserva.model';

/**
 * Enum para representar os tipos de cliente.
 * Os valores devem corresponder exatamente aos do backend.
 * ATENÇÃO: Corrigido para 'PESSOA_FISICA' e 'PESSOA_JURIDICA' para ser consistente com o resto do projeto.
 */
export enum TipoCliente {
  FISICA = 'FISICA',
  JURIDICA = 'JURIDICA',
}

/**
 * Interface base com campos comuns para cadastro de clientes.
 */
interface ClienteBaseRequest {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
}

/**
 * Payload para cadastrar um cliente pessoa física.
 */
export interface ClienteFisicoRequest extends ClienteBaseRequest {
  cpf: string;
}

/**
 * Payload para cadastrar um cliente pessoa jurídica.
 */
export interface ClienteJuridicoRequest extends ClienteBaseRequest {
  cnpj: string;
}

/**
 * Interface que representa a resposta da API para um cliente.
 */
export interface ClienteResponseDTO {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  localidade: string;
  uf: string;
  cpf: string | null;
  cnpj: string | null;
  tipoCliente: TipoCliente;
  dataCadastro: string;
  reservas: ReservaResumoDTO[];
  ativo: boolean;
}

export interface ClienteResponseDTOAdmin1 {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  tipoCliente: TipoCliente;
  dataCadastro: string;
}

/**
 * Payload para a requisição de atualização de um cliente.
 */
export interface ClienteUpdateRequest {
  nome: string;
  email: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
}
