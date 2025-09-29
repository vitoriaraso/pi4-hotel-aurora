import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from '../../shared/button.component/button.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ButtonComponent, 
    MatIconModule,
    RouterLink
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  @Output() linkClicked = new EventEmitter<void>();
}
