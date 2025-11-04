import {Component, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {AuthService} from '../../app/auth/auth.service';
import {ConfirmationDialogComponent} from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import {JwtService} from '../../app/jwt/jwt.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() menuClick = new EventEmitter<void>();

  private dialog = inject(MatDialog);
  private authService = inject(AuthService);
  private jwtService = inject(JwtService);
  private router = inject(Router);

  public profileUrl: string = '/auth/login';
  public isLoggedIn: boolean = false;
  private authSubscription: Subscription | undefined;

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.atualizarLinkDePerfil();
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private atualizarLinkDePerfil(): void {
    if (this.isLoggedIn) {
      // Se está logado, verifica a role
      if (this.jwtService.getRoles()) {
        // Se for ADMIN
        this.profileUrl = '/admin'; // Navega para o painel de admin
      } else {
        // Se for CLIENTE
        this.profileUrl = '/account/personal-info'; // Navega para a conta do cliente
      }
    } else {
      // Se está deslogado
      this.profileUrl = '/auth/login';
    }
  }

  onMenuClick() {
    this.menuClick.emit();
  }

  onCartClick(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Tem certeza que deseja sair?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.authService.logout();
        this.router.navigate(['auth/login']);
      }
    });
  }
}
