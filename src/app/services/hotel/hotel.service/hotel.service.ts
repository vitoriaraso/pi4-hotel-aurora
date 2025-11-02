// src/app/services/hotel/hotel.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {HotelRequestDTO, HotelResponseDTO} from '../../../models/hotel/hotel.model/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private http = inject(HttpClient);
  // O endpoint base é SINGULAR, conforme seu Controller
  private apiUrl = 'http://localhost:8081/api/hotel';

  getHoteis(): Observable<HotelResponseDTO[]> {
    return this.http.get<HotelResponseDTO[]>(this.apiUrl);
  }

  getHotelById(id: number): Observable<HotelResponseDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<HotelResponseDTO>(url);
  }

  // O seu backend retorna void (204 No Content) no PUT
  atualizarHotel(id: number, data: HotelRequestDTO): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, data);
  }

  deleteHotel(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  // O seu backend retorna void (201 Created) no POST
  cadastrarHotel(data: HotelRequestDTO): Observable<void> {
    return this.http.post<void>(this.apiUrl, data);
  }
}
