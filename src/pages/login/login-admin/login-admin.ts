import { Component, EventEmitter, Output, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // MANTEMOS - Para Template-driven forms (ngModel)
// REMOVEMOS ReactiveFormsModule, já que não estamos usando FormBuilder
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../../shared/button.component/button.component';
import { InputTextComponent } from '../../../shared/input-text.component/input-text.component';
import { AuthService } from '../../../app/auth/auth.service';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [
    FormsModule, // Essencial para [(ngModel)] e #loginForm
    MatInputModule,
    InputTextComponent,
  ],
  templateUrl: './login-admin.html',
  styleUrl: './login-admin.css',
})
export class loginAdminComponent implements OnInit {
  @Output() linkClicked = new EventEmitter<void>();

  // Injeção de dependência moderna com inject()
  private authService = inject(AuthService);
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
          this.router.navigate(['/admin/dashboard']); // Redireciona para a home ou dashboard
        }
      },
      error: (err) => {
        // Define o sinal com a nova mensagem de erro
        this.errorMessage.set(err.error?.message || 'Falha no login. Verifique suas credenciais.');
      },
    });
  }

  loginComGoogle() {
    window.location.href = 'http://localhost:8081/oauth2/authorization/google';
  }

  ngOnInit(): void {
    this.authService.logout();
  }
}
