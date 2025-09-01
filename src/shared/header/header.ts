// src/app/shared/header/header.component.ts

import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {

  public headerIsVisible = false;
  private isHomePage = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Escuta as mudanças de rota para saber se estamos na home
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomePage = (event.urlAfterRedirects === '/home');
      // Assim que a rota muda, já calculamos o estado inicial do header
      this.atualizarEstadoHeader();
    });
  }

  // Escuta o evento de scroll da janela
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // A cada scroll, recalculamos o estado do header
    this.atualizarEstadoHeader();
  }

  private atualizarEstadoHeader(): void {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (!this.isHomePage || scrollOffset > 10) {
      this.headerIsVisible = true;
    } else {
      this.headerIsVisible = false;
    }
  }

  @Output() menuClicked = new EventEmitter<void>();
  
}