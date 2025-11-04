// src/app/services/funcionario/funcionario.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FuncionarioRequest, FuncionarioResponseDTO, FuncionarioUpdateRequest } from '../../models/funcionario/funcionario.model/funcionario.model';

// Re-exporta os modelos para facilitar a importação
export * from '../../models/funcionario/funcionario.model/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private http = inject(HttpClient);
  // O endpoint base para todas as operações de funcionário
  private apiUrl = 'http://localhost:8081/api/funcionario'; // Ajuste se for diferente

  /**
   * Busca a lista de todos os funcionários ATIVOS.
   */
  getAtivos(): Observable<FuncionarioResponseDTO[]> {
    return this.http.get<FuncionarioResponseDTO[]>(this.apiUrl);
  }

  /**
   * Busca a lista de todos os funcionários INATIVOS.
   */
  getInativos(): Observable<FuncionarioResponseDTO[]> {
    return this.http.get<FuncionarioResponseDTO[]>(`${this.apiUrl}/inativos`);
  }

  /**
   * Busca um funcionário ATIVO específico pelo seu ID.
   */
  getAtivoById(id: number): Observable<FuncionarioResponseDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<FuncionarioResponseDTO>(url);
  }

  /**
   * Busca um funcionário INATIVO específico pelo seu ID.
   */
  getInativoById(id: number): Observable<FuncionarioResponseDTO> {
    const url = `${this.apiUrl}/inativos/${id}`;
    return this.http.get<FuncionarioResponseDTO>(url);
  }

  /**
   * Faz o soft-delete (desativa) do funcionário.
   */
  desativarFuncionario(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  /**
   * Reativa um funcionário inativo.
   */
  reativarFuncionario(id: number): Observable<void> {
    const url = `${this.apiUrl}/reativar/${id}`;
    return this.http.patch<void>(url, null); // Requisição PATCH sem corpo
  }

  /**
   * Atualiza os dados de um funcionário existente.
   */
  atualizarFuncionario(id: number, data: FuncionarioUpdateRequest): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, data);
  }

  /**
   * Cadastra um novo funcionário (requisição POST).
   */
  cadastrarFuncionario(data: FuncionarioRequest): Observable<any> { // O retorno é void (201)
    return this.http.post(this.apiUrl, data);
  }
}
