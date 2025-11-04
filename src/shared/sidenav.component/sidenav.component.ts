import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button.component/button.component';
import { JwtService } from '../../app/jwt/jwt.service';
import { ClienteService } from '../../app/services/cliente/cliente.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../app/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    RouterLink,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    ButtonComponent
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() linkClicked = new EventEmitter<void>();
  private jwtService = inject(JwtService);
  private clienteService = inject(ClienteService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  private router = inject(Router);

  protected isLogado: boolean = false;
  protected urlBotao: string = '';
  protected nomeUsuario: string | null | undefined;

  private authSubscription: Subscription | undefined;

  ngOnInit(): void {
    // Nós "ouvimos" o canal isLoggedIn$ do AuthService.
    this.authSubscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {

      this.isLogado = isLoggedIn;

      if (isLoggedIn) {
        // Se está logado
        const usuarioName = this.jwtService.getTokenName(); // Busque o nome
        if (this.jwtService.isAdmin()) {
          // Se for ADMIN
          this.urlBotao = '/admin';
        } else {
          // Se for CLIENTE (ou qualquer outra role)
          this.urlBotao = '/account/personal-info';
        }

        // O nome do usuário é definido independentemente da rota
        this.nomeUsuario = usuarioName || 'Meu Perfil'; // Fallback caso o nome seja nulo

      } else {
        // Se está deslogado
        this.urlBotao = '/account/signup';
        this.nomeUsuario = 'Entrar';
      }
    });
  }

  ngOnDestroy(): void {
    // Quando o componente é destruído, cancelamos a "inscrição" para evitar vazamento de memória.
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  /**
   * Chamado pelo link "Reservas".
   * Verifica o login e usa o localStorage para o redirecionamento.
   */
  irParaReserva(): void {
    // Pega o estado ATUAL do login
    const estaLogado = this.authService.getToken() !== null;

    if (estaLogado) {
      // Se JÁ ESTÁ logado, apenas navega
      this.router.navigate(['/reserve']); // (Use a URL correta da sua página de reserva)
    } else {
      // Se NÃO ESTÁ logado:
      this.snackBar.open('Você não está logado para efetuar uma reserva. Faça login ou registre-se.', 'Fechar', { duration: 3000 });
      console.log('Usuário deslogado. Guardando /reservar e indo para o login...');

      // Salva a URL de retorno no localStorage
      localStorage.setItem('returnUrl', '/reservar');

      // Manda o usuário para a página de login
      this.router.navigate(['/auth/login']);
    }
  }
}
