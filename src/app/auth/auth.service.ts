import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: HttpClient) {}

  // Login tradicional com JSON (email/senha)
  login(email: string, senha: string): Observable<any> {
    const body = { email, senha };
    return this.http.post(`${`http://localhost:8081/api/auth/login`}`, body);
  }

  // Login via OAuth2 Google
  loginWithGoogle(): void {
    // Redireciona o usuário para o endpoint de login via Google configurado no Spring
  window.location.href = `http://localhost:8081/oauth2/authorization/google`}

  // Armazenar token no localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obter token armazenado
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Logout (remove token)
  logout(): void {
    localStorage.removeItem('token');
  }
}
