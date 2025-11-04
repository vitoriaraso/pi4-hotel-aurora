import { Component, EventEmitter, Output, inject, signal, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../../shared/button.component/button.component';
import { InputTextComponent } from '../../../shared/input-text.component/input-text.component';
import { AuthService } from '../../../app/auth/auth.service';
import { JwtService } from '../../../app/jwt/jwt.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, // Essencial para [(ngModel)] e #loginForm
    MatInputModule,
    ButtonComponent,
    InputTextComponent,
    RouterModule,
  ],
  templateUrl: './loginPf.component.html',
  styleUrl: './loginPf.component.css',
})
export class LoginPfComponent implements OnInit {
  @Output() linkClicked = new EventEmitter<void>();

  // Injeção de dependência moderna com inject()
  private authService = inject(AuthService);
  private jwtService = inject(JwtService);
  private router = inject(Router);

  // Propriedades para o two-way data binding com ngModel
  email = '';
  senha = '';

  // Use Signals para estados reativos, como mensagens de erro
  errorMessage = signal('');

  // O onSubmit agora confia que o formulário está válido,
  // pois o botão "Entrar" só é habilitado se loginForm.valid = true
  onSubmit(): void {
    // Limpa erros anteriores ao tentar novamente
    this.errorMessage.set('');

    this.authService.login(this.email, this.senha).subscribe({
      next: (response) => {
        if (response.token) {
          this.authService.saveToken(response.token);
          this.router.navigate(['/']); // Redireciona para a home ou dashboard

          // --- ✅ A LÓGICA DE REDIRECIONAMENTO COM localStorage ---

          // 1. Tenta ler a URL guardada do localStorage
          const returnUrl = localStorage.getItem('returnUrl');

          if (returnUrl) {
            // 2. Se achou uma URL, remove ela do storage (para não usar de novo)
            localStorage.removeItem('returnUrl');

            // 3. Navega o usuário de volta para onde ele queria ir
            this.router.navigateByUrl(returnUrl);
          } else {
            // 4. Se não achou nada, faz o login padrão (Admin ou Cliente)
            if (this.jwtService.isAdmin()) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/account/personal-info']);
            }
          }
        }
      },
      error: (err) => {
        // Define o sinal com a nova mensagem de erro
        this.errorMessage.set(
          err.error?.message || 'Falha no login. Verifique suas credenciais.'
        );
      },
    });
  }

  loginComGoogle() {
    window.location.href = 'http://localhost:8081/oauth2/authorization/google';
  }

  ngOnInit() {
    this.authService.logout();
  }
}
