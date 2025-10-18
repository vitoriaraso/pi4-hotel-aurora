import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/button.component/button.component';

@Component({
  selector: 'app-account-created',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './account-created.html',
  styleUrl: './account-created.css'
})
export class AccountCreated {

}
