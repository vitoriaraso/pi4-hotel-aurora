import { Component, EventEmitter, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

// TODO: mudar para logout
@Component({
  selector: 'app-cart-sidenav',
  standalone: true,
  imports: [
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './cart-sidenav.component.html',
  styleUrl: './cart-sidenav.component.css'
})
export class CartSidenavComponent {
  @Output() linkClicked = new EventEmitter<void>();
}
