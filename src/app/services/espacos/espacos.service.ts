import {inject, Injectable} from '@angular/core';
import { EspacosRequestDTO, EspacosResponseDTO } from '../../models/espacos/espacos.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspacosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/api/espacos'; // Ajuste se a URL for diferente

  /**
   * Cria um novo espaço no sistema.
   * @param dadosEspaco O objeto com os dados do novo espaço.
   */
  cadastrarEspaco(dadosEspaco: EspacosRequestDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, dadosEspaco);
  }

  /**
   * Busca a lista de todos os espaços cadastrados no sistema.
   * @returns Um Observable com um array de todos os espaços.
   */
  listarTodosEspacos(): Observable<EspacosResponseDTO[]> {
    return this.http.get<EspacosResponseDTO[]>(this.apiUrl);
  }
}
