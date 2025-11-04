import { Injectable, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {AuthService} from '../auth/auth.service';

interface MeuJwtPayload {
  id_user: number;
  name: string;
  roles: string[]; // Um array de strings
  sub: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private authService = inject(AuthService);

  constructor() { }

  getTokenId(): number | null {
    const token = this.authService.getToken(); // Pega o token do AuthService

    if (!token) {
      console.error('Token não encontrado. O usuário está logado?');
      return null;
    }

    try {
      const decoded = jwtDecode<MeuJwtPayload>(token);
      return decoded.id_user ?? null;
    } catch (error) {
      console.error('Token inválido ou malformado:', error);
      return null;
    }
  }

  getTokenName(): string | null {
    const token = this.authService.getToken(); // Pega o token do AuthService

    if (!token) {
      console.error('Token não encontrado. O usuário está logado?');
      return null;
    }

    try {
      const decoded = jwtDecode<MeuJwtPayload>(token);
      return decoded.name ?? null;
    } catch (error) {
      console.error('Token inválido ou malformado:', error);
      return null;
    }
  }

  getRoles(): string[] {
    const token = this.authService.getToken(); // Pega o token do AuthService

    if (!token) {
      console.error('Token não encontrado. O usuário está logado?');
      return [];
    }

    try {
      const decoded = jwtDecode<MeuJwtPayload>(token);
      return decoded?.roles || []; // Retorna as roles ou um array vazio
    } catch (error) {
      console.error('Token inválido ou malformado:', error);
      return [];
    }
  }

  isAdmin(): boolean {
    return this.getRoles().includes('ADMIN');
  }
}
