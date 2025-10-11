import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export enum TipoCliente {
  FISICO = 'FISICO',
  JURIDICO = 'JURIDICO'
}

export interface ReservaResumoDTO {
  id: number;
  // TODO: terminar de colocar os campos aqui das reservas
}

export interface ClienteResumoDTO {
  id: number;
  nome: string;
  email: string;
}

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
  dataCadastro: string; // LocalDateTime vira um string no json
  reservas: ReservaResumoDTO[];
}

export interface ClienteUpdateRequest{
  nome: string;
  email: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string; // ? -> indica que é opcional
  bairro: string;
  localidade: string;
  uf: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/api/clientes';

  constructor() {  }

  /**
   * Atualiza os dados do cliente físico
   *
   * @param id ID do cliente
   */
  atualizarCliente(id: number, clienteData: ClienteUpdateRequest): Observable<void> {
    const url = `${this.apiUrl}/fisico/${id}`;
    return this.http.put<void>(url, clienteData);
  }

  /**
   * Lista todos os clientes
   *
   * @return Lista de clientes
   */
  getClientes(): Observable<ClienteResponseDTO[]> {
    return this.http.get<ClienteResponseDTO[]>(this.apiUrl);
  }

  /**
   * Lista o cliente conforme id
   *
   * @param id ID do cliente, físico ou jurídico
   * @return json do cliente
   */
  getClienteById(id: number): Observable<ClienteResponseDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ClienteResponseDTO>(url);
  }
}
