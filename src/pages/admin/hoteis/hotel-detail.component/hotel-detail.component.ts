import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../../shared/button.component/button.component';
import {HotelRequestDTO, HotelResponseDTO} from '../../../../app/models/hotel/hotel.model/hotel.model';
import {HotelService} from '../../../../app/services/hotel/hotel.service/hotel.service';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatIconModule, ButtonComponent],
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['../../css-componente-detail/detail.component.css'],
})
export class HotelDetailComponent implements OnInit {
  private hotelService = inject(HotelService);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);

  hotel?: HotelResponseDTO;
  isEditing = false;
  editButtonLabel = 'Editar';
  icon = 'edit';
  formulario!: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    });
  }

  ngOnInit() {
    this.carregarDadosDoHotel();
    this.formulario.disable();
  }

  private carregarDadosDoHotel() {
    const hotelIdString = this.route.snapshot.paramMap.get('id');
    if (hotelIdString) {
      const hotelId = Number(hotelIdString);
      this.hotelService.getHotelById(hotelId).subscribe({
        next: (dados) => {
          this.hotel = dados;
          this.formulario.patchValue(dados);
        },
        error: (erro) => this.snackBar.open('Hotel não encontrado.', 'Fechar', { duration: 5000 })
      });
    }
  }

  toggleInfoEdit(): void {
    if (!this.isEditing) {
      this.isEditing = true;
      this.formulario.enable();
    } else {
      if (this.formulario.invalid) { return; }
      this.atualizarDadosDoHotel();
    }
    this.atualizarEstadoDoBotao();
  }

  private atualizarDadosDoHotel(): void {
    if (!this.hotel) { return; }
    const updateRequest: HotelRequestDTO = this.formulario.getRawValue();
    this.hotelService.atualizarHotel(this.hotel.id, updateRequest).subscribe({
      next: () => {
        this.snackBar.open('Hotel atualizado com sucesso!', 'Fechar', { duration: 3000 });
        this.isEditing = false;
        this.formulario.disable();
        this.atualizarEstadoDoBotao();
      },
      error: (erro) => this.snackBar.open('Erro ao atualizar. Tente novamente.', 'Fechar', { duration: 5000 })
    });
  }

  private atualizarEstadoDoBotao(): void {
    this.editButtonLabel = this.isEditing ? 'Salvar' : 'Editar';
    this.icon = this.isEditing ? 'save' : 'edit';
  }
}
