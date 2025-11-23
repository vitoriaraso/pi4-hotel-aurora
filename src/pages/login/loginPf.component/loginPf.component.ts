import { Component, EventEmitter, Output, inject, signal, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router'; // 💡 ActivatedRoute é necessário
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../../shared/button.component/button.component';
import { InputTextComponent } from '../../../shared/input-text.component/input-text.component';
import { AuthService } from '../../../app/auth/auth.service';
import { JwtService } from '../../../app/jwt/jwt.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    ButtonComponent,
    InputTextComponent,
    RouterModule,
    // 💡 Adicione MatSnackBar aqui se não estiver no módulo raiz
    // MatSnackBarModule // Se for necessário, adicione o módulo
  ],
  templateUrl: './loginPf.component.html',
  styleUrl: './loginPf.component.css',
})
export class LoginPfComponent implements OnInit {
  @Output() linkClicked = new EventEmitter<void>();

  // Injeção de dependência
  private authService = inject(AuthService);
  private jwtService = inject(JwtService);
  private router = inject(Router);
  // 💡 INJEÇÃO CORRETA: Use ActivatedRoute para ler parâmetros da URL
  private activatedRoute = inject(ActivatedRoute);
  // 💡 INJEÇÃO NECESSÁRIA: Adicione MatSnackBar
  private snackBar = inject(MatSnackBar);

  // Propriedades para o two-way data binding com ngModel
  email = '';
  senha = '';

  // Use Signals para estados reativos, como mensagens de erro
  errorMessage = signal('');

  ngOnInit() {
    // 💡 Chamada correta: logout antes de capturar o erro, caso o token antigo ainda esteja na URL.
    this.authService.logout();
    this.capturarErroGoogle();
  }

  onSubmit(): void {
    this.errorMessage.set('');

    this.authService.login(this.email, this.senha).subscribe({
      next: (response) => {
        if (response.token) {
          this.authService.saveToken(response.token);

          // --- ✅ LÓGICA DE REDIRECIONAMENTO COM localStorage ---

          const returnUrl = localStorage.getItem('returnUrl');

          if (returnUrl) {
            localStorage.removeItem('returnUrl');
            this.router.navigateByUrl(returnUrl);
          } else {
            if (this.jwtService.isAdmin()) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/account/personal-info']);
            }
          }
        }
      },
      error: (err) => {
        this.errorMessage.set(
          'Falha no login. Verifique suas credenciais.'
        );
      },
    });
  }

  loginComGoogle() {
    window.location.href = 'http://localhost:8081/oauth2/authorization/google';
  }

  capturarErroGoogle() {
    // 💡 CORREÇÃO: Usar this.activatedRoute para acessar queryParams
    this.activatedRoute.queryParams.subscribe(params => {
      const errorCode = params['error'];

      if (errorCode) {
        let errorMessage: string;

        switch (errorCode) {
          case 'email_not_registered':
            errorMessage = 'Seu e-mail do Google não está cadastrado. Faça o cadastro comum primeiro.';
            break;
          case 'login_failed':
          default:
            errorMessage = 'Ocorreu um erro desconhecido durante o login com o Google.';
            break;
        }

        // Exibe o erro
        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 7000,
          panelClass: ['snackbar-error']
        });

        // 💡 CORREÇÃO: Limpa o parâmetro 'error' da URL para evitar reexibição no refresh
        this.router.navigate([], {
          queryParams: { error: null },
          queryParamsHandling: 'merge'
        });

      }
    });
  }
}
