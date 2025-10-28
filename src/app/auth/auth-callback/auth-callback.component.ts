import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [],
  template: '<p>Processando login...</p>'
})
export class AuthCallbackComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Supondo que o backend redireciona para algo como:
    // http://localhost:4200/auth-callback?token=xxx.yyy.zzz
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Salva o token no localStorage
      this.authService.saveToken(token);

      // Redireciona para home ou dashboard
      this.router.navigate(['/']);
    } else {
      // Se não houver token, redireciona para login
      this.router.navigate(['/login']);
    }
  }
}
