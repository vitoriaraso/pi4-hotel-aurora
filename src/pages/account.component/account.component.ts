import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button.component/button.component';

@Component({
  selector: 'app-account.component',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  name: string = "Zezinho Balboa";
  tel: string = "(00) 0000-0000";
  email: string = "zezinho@corp.ze"
}
