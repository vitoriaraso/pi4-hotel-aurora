/**
 * Enum para os tipos de espaços, correspondendo ao backend.
 */
export enum TipoEspacos {
  PISCINA = 'PISCINA',
  REFEITORIO = 'REFEITORIO',
  LOBBY = 'LOBBY',
  SALADEJOGOS = 'SALADEJOGOS',
  SALAODETV = 'SALAODETV',
  ACADEMIA = 'ACADEMIA',
  JARDIM = 'JARDIM',
  PLAYGROUND = 'PLAYGROUND',
  QUADRAPOLIESPORTIVA = 'QUADRAPOLIESPORTIVA',
  SALADELEITURA = 'SALADELEITURA',
  ESPACOKIDS = 'ESPACOKIDS',
  TERRACO = 'TERRACO',
  CINEMA = 'CINEMA'
}

/**
 * Dicionário (Record) para mapear os valores do enum
 * para nomes de exibição amigáveis (labels).
 */
export const TipoEspacosLabel: Record<TipoEspacos, string> = {
  [TipoEspacos.PISCINA]: 'Piscina',
  [TipoEspacos.REFEITORIO]: 'Refeitório',
  [TipoEspacos.LOBBY]: 'Lobby',
  [TipoEspacos.SALADEJOGOS]: 'Sala de Jogos',
  [TipoEspacos.SALAODETV]: 'Salão de TV',
  [TipoEspacos.ACADEMIA]: 'Academia',
  [TipoEspacos.JARDIM]: 'Jardim',
  [TipoEspacos.PLAYGROUND]: 'Playground',
  [TipoEspacos.QUADRAPOLIESPORTIVA]: 'Quadra Poliesportiva',
  [TipoEspacos.SALADELEITURA]: 'Sala de Leitura',
  [TipoEspacos.ESPACOKIDS]: 'Espaço Kids',
  [TipoEspacos.TERRACO]: 'Terraço',
  [TipoEspacos.CINEMA]: 'Cinema'
};

/**
 * Interface que representa o payload para criar um novo espaço.
 * Corresponde ao record `EspacosRequestDTO` do backend.
 */
export interface EspacosRequestDTO {
  tipoEspacos: TipoEspacos;
  descricao: string;
  id_hotel: number;
}

/**
 * Interface para a representação resumida de um Hotel.
 * Corresponde ao record `HotelResumoDTO` do backend.
 * (Ajuste os campos se o seu DTO for diferente)
 */
export interface HotelResumoDTO {
  id: number;
  nome: string;
  // Adicione outros campos se houver (ex: cidade, uf)
}

/**
 * Interface que representa a resposta da API ao buscar um ou mais espaços.
 * Corresponde ao record `EspacosResponseDTO` do backend.
 */
export interface EspacosResponseDTO {
  id: number;
  tipoEspacos: TipoEspacos;
  descricao: string;
  dataCadastro: string; // Vem como string no formato "dd/MM/yyyy HH:mm:ss"
  hotel: HotelResumoDTO;
}
