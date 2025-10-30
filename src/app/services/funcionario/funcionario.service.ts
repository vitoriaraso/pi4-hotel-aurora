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
   * Busca a lista completa de todos os funcionários.
   */
  getFuncionarios(): Observable<FuncionarioResponseDTO[]> {
    return this.http.get<FuncionarioResponseDTO[]>(this.apiUrl);
  }

  /**
   * Busca um funcionário específico pelo seu ID.
   */
  getFuncionarioById(id: number): Observable<FuncionarioResponseDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<FuncionarioResponseDTO>(url);
  }

  /**
   * Atualiza os dados de um funcionário existente.
   */
  atualizarFuncionario(id: number, data: FuncionarioUpdateRequest): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, data);
  }

  /**
   * Exclui um funcionário pelo seu ID.
   */
  deleteFuncionario(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  /**
   * Cadastra um novo funcionário.
   */
  cadastrarFuncionario(data: FuncionarioRequest): Observable<FuncionarioResponseDTO> {
    return this.http.post<FuncionarioResponseDTO>(this.apiUrl, data);
  }
}
