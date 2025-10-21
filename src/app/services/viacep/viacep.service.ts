import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
    const url = `${this.API_URL}/${cep}/json/`;
    console.log(`Buscando CEP em: ${url}`);
    return this.http.get<ViaCepResponse>(url);
  }

  /**
   * Retorna um Validador Assíncrono para campos de CEP.
   * O validador consulta a API do ViaCEP para verificar se o CEP é válido.
   */
  cepValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const cep = control.value;

      // Se o campo estiver vazio ou não passar na validação síncrona (pattern), não faz a chamada
      if (!cep || (control.errors && !control.hasError('cepInvalido'))) {
        return of(null);
      }

      return this.consultarCep(String(cep).replace(/\D/g, '')).pipe(
        map(response => {
          // Se a API retorna 'erro: true', o CEP é inválido
          return response.erro ? { cepInvalido: true } : null;
        }),
        catchError(() => {
          // Se houver qualquer erro na chamada HTTP, considera inválido
          return of({ cepInvalido: true });
        })
      );
    };
  }
}

