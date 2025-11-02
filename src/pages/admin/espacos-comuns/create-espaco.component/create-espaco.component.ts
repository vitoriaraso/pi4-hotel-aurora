import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../../shared/button.component/button.component';
import {
  EspacosRequestDTO,
  EspacosService,
  TipoEspacos,
  TipoEspacosLabel
} from '../../../../app/services/espacos/espacos.service';

@Component({
  selector: 'app-create-espaco',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatIconModule, ButtonComponent],
  templateUrl: './create-espaco.component.html',
  styleUrl: '../../css-componente-detail/detail.component.css'
})
export class CreateEspacoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private espacosService = inject(EspacosService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  formulario!: FormGroup;
  // Expondo o enum para o template
  tiposDeEspaco = Object.values(TipoEspacos);
  tiposDeEspacoLabel = TipoEspacosLabel;

  ngOnInit(): void {
    this.formulario = this.fb.group({
      tipoEspacos: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      id_hotel: [1, Validators.required] // Exemplo com ID fixo
    });
  }

  // Getters para os campos
  get tipoEspacos() { return this.formulario.get('tipoEspacos'); }
  get descricao() { return this.formulario.get('descricao'); }
  get id_hotel() { return this.formulario.get('id_hotel'); }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.snackBar.open('Formulário inválido.', 'Fechar', { duration: 3000 });
      return;
    }
    const requestData: EspacosRequestDTO = this.formulario.getRawValue();
    this.espacosService.cadastrarEspaco(requestData).subscribe({
      next: () => {
        this.snackBar.open('Espaço cadastrado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/admin/dashboard/espacos-comuns']);
      },
      error: (err) => this.snackBar.open('Erro ao cadastrar espaço.', 'Fechar', { duration: 5000 })
    });
  }
}
