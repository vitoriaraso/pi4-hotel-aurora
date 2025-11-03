import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../../shared/button.component/button.component';
import {HotelService} from '../../../../app/services/hotel/hotel.service/hotel.service';
import {HotelRequestDTO} from '../../../../app/models/hotel/hotel.model/hotel.model';

@Component({
  selector: 'app-create-hotel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatIconModule, ButtonComponent],
  templateUrl: './create-hotel.component.html',
  styleUrls: ['../../css-componente-detail/detail.component.css']
})
export class CreateHotelComponent implements OnInit {
  private fb = inject(FormBuilder);
  private hotelService = inject(HotelService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  formulario!: FormGroup;

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.snackBar.open('Formulário inválido.', 'Fechar', { duration: 3000 });
      return;
    }
    const requestData: HotelRequestDTO = this.formulario.getRawValue();
    this.hotelService.cadastrarHotel(requestData).subscribe({
      next: () => {
        this.snackBar.open('Hotel cadastrado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/admin/dashboard/hoteis']);
      },
      error: (err) => this.snackBar.open('Erro ao cadastrar hotel.', 'Fechar', { duration: 5000 })
    });
  }
}
