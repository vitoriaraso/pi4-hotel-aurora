import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JwtService } from '../../../app/jwt/jwt.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['../css-componente-dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private jwtService = inject(JwtService);

  adminName: string = 'Admin'; // Valor padrão

  ngOnInit(): void {
    const nomeDoToken = this.jwtService.getTokenName();
    if (nomeDoToken) {
      this.adminName = nomeDoToken.split(' ')[0];
    }
  }
}
