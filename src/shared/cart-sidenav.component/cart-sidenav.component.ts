import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-cart-sidenav',
  standalone: true,
  imports: [
    MatDividerModule
  ],
  templateUrl: './cart-sidenav.component.html',
  styleUrl: './cart-sidenav.component.css'
})
export class CartSidenavComponent {

}
