import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum TipoCliente {
  FISICA = 'FISICA',
  JURIDICA = 'JURIDICA'
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

export interface ClienteFisicoRequest {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  cpf: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface ClienteJuridicoRequest {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  cnpj: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
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

  // POST
  cadastrarClienteFisico(clienteData: ClienteFisicoRequest): Observable<void> {
    const url = `${this.apiUrl}/fisico`;
    return this.http.post<void>(url, clienteData);
  }

  cadastrarClienteJuridico(clienteData: ClienteJuridicoRequest): Observable<void> {
    const url = `${this.apiUrl}/juridico`;
    return this.http.post<void>(url, clienteData);
  }



  // PUT
  atualizarCliente(id: number, tipoCliente: TipoCliente, clienteData: ClienteUpdateRequest): Observable<void> {
    const endpoint = tipoCliente === TipoCliente.FISICA ? 'fisico' : 'juridico';
    const url = `${this.apiUrl}/${endpoint}/${id}`;

    console.log(`Enviando requisição PUT para ${url}`, clienteData);

    return this.http.put<void>(url, clienteData);
  }



  // GET
  getClientes(): Observable<ClienteResponseDTO[]> {
    return this.http.get<ClienteResponseDTO[]>(this.apiUrl);
  }

  getClienteById(id: number): Observable<ClienteResponseDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ClienteResponseDTO>(url);
  }
}
