import { Component } from '@angular/core';
import { InputTextComponent } from '../../shared/input-text.component/input-text.component';
import { ButtonComponent } from '../../shared/button.component/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-account-pj',
  imports: [InputTextComponent, ButtonComponent, RouterLink],
  templateUrl: './create-account-pj.html',
  styleUrl: './create-account-pj.css'
})
export class CreateAccountPJ {

}
