import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button.component/button.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  imports: [ButtonComponent, MatIconModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

}
