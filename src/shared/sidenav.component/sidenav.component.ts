import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button.component/button.component';
import {JwtService} from '../../app/jwt/jwt.service';
import {ClienteService} from '../../app/services/cliente/cliente.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
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
export class SidenavComponent implements OnInit {
  @Output() linkClicked = new EventEmitter<void>();
  private jwtService = inject(JwtService);
  private clienteService = inject(ClienteService);
  protected isLogado: boolean = false;
  protected urlBotao: string = '';
  protected nomeUsuario: string | null | undefined;

  ngOnInit(): void {
    const usuarioId = this.jwtService.getTokenId();

    if (usuarioId === null) {
      this.isLogado = false;
      this.urlBotao = '/account/signup';
      this.nomeUsuario = 'Entrar';
    } else {
      const usuarioName = this.jwtService.getTokenName();
      this.isLogado = true;
      this.urlBotao = '/account/personal-info';
      this.nomeUsuario = usuarioName;
    }
  }
}
