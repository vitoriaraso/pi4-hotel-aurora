import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EspacosRequestDTO, EspacosResponseDTO } from '../../models/espacos/espacos.model';

// Re-exporta os modelos para facilitar a importação
export * from '../../models/espacos/espacos.model';

@Injectable({
  providedIn: 'root'
})
export class EspacosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/api/espacos';

  getEspacos(): Observable<EspacosResponseDTO[]> {
    return this.http.get<EspacosResponseDTO[]>(this.apiUrl);
  }

  getEspacoById(id: number): Observable<EspacosResponseDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<EspacosResponseDTO>(url);
  }

  deleteEspaco(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  cadastrarEspaco(data: EspacosRequestDTO): Observable<void> {
    return this.http.post<void>(this.apiUrl, data);
  }

}
