import { Component } from '@angular/core';
import { InputTextComponent } from '../../shared/input-text.component/input-text.component';
import { ButtonComponent } from '../../shared/button.component/button.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [InputTextComponent, ButtonComponent],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

}
