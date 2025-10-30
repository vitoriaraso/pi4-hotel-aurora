import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';

import { ButtonComponent } from '../../../../shared/button.component/button.component';
import {
  FuncionarioResponseDTO,
  FuncionarioService,
  FuncionarioUpdateRequest
} from '../../../../app/services/funcionario/funcionario.service';

@Component({
  selector: 'app-funcionario-detail',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, RouterLink,
    MatIconModule, NgxMaskDirective, ButtonComponent
  ],
  templateUrl: './funcionario-detail.component.html',
  styleUrl: '../../css-componente-detail/detail.component.css',
})
export class FuncionarioDetailComponent implements OnInit {
  private funcionarioService = inject(FuncionarioService);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);

  funcionario?: FuncionarioResponseDTO;
  isEditing = false;
  editButtonLabel = 'Editar';
  icon = 'edit';
  formulario!: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  ngOnInit() {
    this.carregarDadosDoFuncionario();
    this.formulario.disable();
  }

  private carregarDadosDoFuncionario() {
    const funcionarioIdString = this.route.snapshot.paramMap.get('id');
    if (funcionarioIdString) {
      const funcionarioId = Number(funcionarioIdString);
      this.funcionarioService.getFuncionarioById(funcionarioId).subscribe({
        next: (dados) => {
          this.funcionario = dados;
          this.formulario.patchValue(dados);
        },
        error: (erro) => {
          console.error('Erro ao buscar funcionário:', erro);
          this.snackBar.open('Funcionário não encontrado.', 'Fechar', { duration: 5000 });
        }
      });
    }
  }

  toggleInfoEdit(): void {
    if (!this.isEditing) {
      this.isEditing = true;
      this.formulario.enable();
    } else {
      if (this.formulario.invalid) {
        this.snackBar.open('Formulário inválido.', 'Fechar', { duration: 3000 });
        return;
      }
      this.atualizarDadosDoFuncionario();
    }
    this.atualizarEstadoDoBotao();
  }

  private atualizarDadosDoFuncionario(): void {
    if (!this.funcionario) { return; }

    const updateRequest: FuncionarioUpdateRequest = this.formulario.getRawValue();

    this.funcionarioService.atualizarFuncionario(this.funcionario.id, updateRequest)
      .subscribe({
        next: () => {
          this.snackBar.open('Dados atualizados com sucesso!', 'Fechar', { duration: 3000 });
          this.isEditing = false;
          this.formulario.disable();
          this.atualizarEstadoDoBotao();
        },
        error: (erro) => {
          console.error('Erro ao atualizar funcionário:', erro);
          this.snackBar.open('Erro ao atualizar. Tente novamente.', 'Fechar', { duration: 5000 });
        }
      });
  }

  private atualizarEstadoDoBotao(): void {
    this.editButtonLabel = this.isEditing ? 'Salvar' : 'Editar';
    this.icon = this.isEditing ? 'save' : 'edit';
  }
}
