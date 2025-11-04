import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  // Não injete o Router aqui, o serviço não deve navegar.

  private loggedInStatus = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.loggedInStatus.asObservable();

  constructor() {}

  /**
   * Login tradicional.
   * O tap() é um "gancho" que nos permite salvar o token
   * e transmitir o estado de login ANTES de retornar o Observable
   * para o componente de login.
   */
  login(email: string, senha: string): Observable<any> {
    const body = { email, senha };
    return this.http.post<any>(`http://localhost:8081/api/auth/login`, body).pipe(
      tap(response => {
        // Assume que o backend retorna um objeto com uma propriedade 'token'
        if (response && response.token) {
          this.saveToken(response.token);
        } else {
          // Se o backend só retorna o token (sem ser um objeto)
          // Isso é improvável, mas só para garantir
          console.warn("A resposta do login não continha um objeto { token: '...' }.");
        }
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedInStatus.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInStatus.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
