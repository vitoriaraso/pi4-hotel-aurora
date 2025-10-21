import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/button.component/button.component';

@Component({
  selector: 'app-account-created.component',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './account-created.component.html',
  styleUrl: './account-created.component.css'
})
export class AccountCreatedComponent { }
