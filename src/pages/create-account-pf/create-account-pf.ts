import { Component } from '@angular/core';
import { InputTextComponent } from '../../shared/input-text.component/input-text.component';
import { ButtonComponent } from '../../shared/button.component/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-account-pf',
  imports: [ButtonComponent, RouterLink, InputTextComponent],
  templateUrl: './create-account-pf.html',
  styleUrl: './create-account-pf.css'
})
export class CreateAccountPF {

}
