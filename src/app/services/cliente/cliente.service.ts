import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ClienteFisicoRequest,
  ClienteJuridicoRequest,
  ClienteResponseDTO,
  ClienteUpdateRequest,
  TipoCliente
} from '../../models/cliente/cliente.model';

// Re-exporta os modelos para que possam ser importados a partir deste arquivo de serviço.
// Isso corrige os erros de importação nos componentes.
export * from '../../models/cliente/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/api/clientes';

  constructor() { }

  /**
   * Cadastra um novo cliente do tipo Pessoa Física.
   * @param clienteData Os dados do cliente a serem cadastrados.
   */
  cadastrarClienteFisico(clienteData: ClienteFisicoRequest): Observable<void> {
    const url = `${this.apiUrl}/fisico`;
    return this.http.post<void>(url, clienteData);
  }

  /**
   * Cadastra um novo cliente do tipo Pessoa Jurídica.
   * @param clienteData Os dados do cliente a serem cadastrados.
   */
  cadastrarClienteJuridico(clienteData: ClienteJuridicoRequest): Observable<void> {
    const url = `${this.apiUrl}/juridico`;
    return this.http.post<void>(url, clienteData);
  }

  /**
   * Atualiza os dados de um cliente existente.
   * @param id O ID do cliente a ser atualizado.
   * @param tipoCliente O tipo do cliente (PESSOA_FISICA ou PESSOA_JURIDICA).
   * @param clienteData Os novos dados do cliente.
   */
  atualizarCliente(id: number, tipoCliente: TipoCliente, clienteData: ClienteUpdateRequest): Observable<void> {
    // A lógica para determinar o endpoint fica mais segura com o enum importado.
    const endpoint = tipoCliente === TipoCliente.FISICA ? 'fisico' : 'juridico';
    const url = `${this.apiUrl}/${endpoint}/${id}`;

    console.log(`Enviando requisição PUT para ${url}`, clienteData);

    return this.http.put<void>(url, clienteData);
  }

  /**
   * Busca a lista de todos os clientes.
   */
  getClientes(): Observable<ClienteResponseDTO[]> {
    return this.http.get<ClienteResponseDTO[]>(this.apiUrl);
  }

  /**
   * Busca um cliente específico pelo seu ID.
   * @param id O ID do cliente.
   */
  getClienteById(id: number): Observable<ClienteResponseDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ClienteResponseDTO>(url);
  }

  /**
   * Exclui um cliente específico pelo seu ID.
   * @param id O ID do cliente a ser excluído.
   * @returns Um Observable<void> que completa quando a exclusão é bem-sucedida.
   */
  deleteCliente(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

