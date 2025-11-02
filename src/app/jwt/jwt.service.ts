import { Injectable, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {AuthService} from '../auth/auth.service';

interface MeuJwtPayload {
  id_user: number;
  name: string;
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
}
