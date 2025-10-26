import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../../shared/button.component/button.component';
import { RouterLink } from '@angular/router';
import { InputTextComponent } from '../../../shared/input-text.component/input-text.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatInputModule, ReactiveFormsModule, ButtonComponent, RouterLink, InputTextComponent],
  templateUrl: './loginPj.component.html',
  styleUrl: './loginPj.component.css'
})
export class LoginPjComponent {
  @Output() linkClicked = new EventEmitter<void>();

}
