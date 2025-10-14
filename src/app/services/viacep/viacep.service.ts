import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

// Interface para tipar a resposta da API
export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean; // A API retorna esta propriedade quando o CEP não é encontrado
}

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://viacep.com.br/ws';

  constructor() { }

  /**
   * Consulta um CEP na API do ViaCEP.
   * @param cep O CEP a ser consultado (apenas números).
   * @returns Um Observable com os dados do endereço.
   */
  consultarCep(cep: string): Observable<ViaCepResponse> {
    // Monta a URL da requisição GET
    const url = `${this.API_URL}/${cep}/json/`;
    console.log(`Buscando CEP em: ${url}`);
    return this.http.get<ViaCepResponse>(url);
  }
}
