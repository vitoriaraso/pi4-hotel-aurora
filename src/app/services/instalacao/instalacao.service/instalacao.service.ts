import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  InstalacaoRequest,
  InstalacaoResponseDTO,
  InstalacaoUpdateRequest, OrcamentoResponseDTO
} from '../../../models/instalacao/instalacao.model/instalacao.model';

@Injectable({
  providedIn: 'root'
})
export class InstalacaoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/api/instalacoes';

  getInstalacoes(): Observable<InstalacaoResponseDTO[]> {
    return this.http.get<InstalacaoResponseDTO[]>(this.apiUrl);
  }

  getInstalacaoById(id: number): Observable<InstalacaoResponseDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<InstalacaoResponseDTO>(url);
  }

  // O update do seu backend retorna o DTO atualizado
  atualizarDisponibilidade(id: number, data: InstalacaoUpdateRequest): Observable<InstalacaoResponseDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<InstalacaoResponseDTO>(url, data);
  }

  deleteInstalacao(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  // O POST do seu backend retorna 201 Created (void)
  cadastrarInstalacao(data: InstalacaoRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, data);
  }

  // Método para o endpoint de orçamento
  simularOrcamento(tipo: string, classe: string): Observable<OrcamentoResponseDTO> {
    const params = new HttpParams()
    .set('classe', classe)
    .set('tipo', tipo);
    const url = `${this.apiUrl}/orcamento`;
    return this.http.get<OrcamentoResponseDTO>(url, { params });
  }
}
