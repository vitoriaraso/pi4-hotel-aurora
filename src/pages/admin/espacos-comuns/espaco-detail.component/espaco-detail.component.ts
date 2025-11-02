import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../../shared/button.component/button.component';
import { EspacosResponseDTO, EspacosService, TipoEspacos } from '../../../../app/services/espacos/espacos.service';

@Component({
  selector: 'app-espaco-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatIconModule, ButtonComponent],
  templateUrl: './espaco-detail.component.html',
  styleUrl: '../../css-componente-detail/detail.component.css'
})
export class EspacoDetailComponent implements OnInit {
  private espacosService = inject(EspacosService);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);

  espaco?: EspacosResponseDTO;
  isEditing = false;
  editButtonLabel = 'Editar';
  icon = 'edit';
  formulario!: FormGroup;
  tiposDeEspaco = Object.values(TipoEspacos);

  constructor() {
    this.formulario = new FormGroup({
      tipoEspacos: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    });
  }

  ngOnInit() {
    this.carregarDadosDoEspaco();
    this.formulario.disable();
  }

  private carregarDadosDoEspaco() {
    const espacoIdString = this.route.snapshot.paramMap.get('id');
    if (espacoIdString) {
      const espacoId = Number(espacoIdString);
      this.espacosService.getEspacoById(espacoId).subscribe({
        next: (dados) => {
          this.espaco = dados;
          this.formulario.patchValue(dados);
        },
        error: (erro) => this.snackBar.open('Espaço não encontrado.', 'Fechar', {duration: 5000})
      });
    }
  }

  private atualizarEstadoDoBotao(): void {
    this.editButtonLabel = this.isEditing ? 'Salvar' : 'Editar';
    this.icon = this.isEditing ? 'save' : 'edit';
  }
}
