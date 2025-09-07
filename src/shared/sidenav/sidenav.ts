import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [MatDividerModule, MatButtonModule, MatIconModule, RouterLink, MatSidenavModule, MatListModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css'
})
export class Sidenav {
  @ViewChild('drawer') public drawer!: MatSidenav;

  public toggle(): void {
  console.log('Método toggle() no Sidenav FOI CHAMADO!');
  
  // ADICIONE ESTA VERIFICAÇÃO
  console.log('Referência para o drawer:', this.drawer);

  if (this.drawer) {
    this.drawer.toggle();
  } else {
    console.error('ERRO: A referência para o drawer é indefinida! Verifique o #drawer no HTML.');
  }
}
}