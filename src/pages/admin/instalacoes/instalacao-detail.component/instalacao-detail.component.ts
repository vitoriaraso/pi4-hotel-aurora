import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../../shared/button.component/button.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {InstalacaoService} from '../../../../app/services/instalacao/instalacao.service/instalacao.service';
import {
  InstalacaoResponseDTO,
  InstalacaoUpdateRequest
} from '../../../../app/models/instalacao/instalacao.model/instalacao.model';

@Component({
  selector: 'app-instalacao-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatIconModule, ButtonComponent, MatSlideToggleModule],
  templateUrl: './instalacao-detail.component.html',
  styleUrls: ['../../css-componente-detail/detail.component.css']
})
export class InstalacaoDetailComponent implements OnInit {
  private instalacaoService = inject(InstalacaoService);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);

  instalacao?: InstalacaoResponseDTO;
  isEditing = false;
  editButtonLabel = 'Editar';
  icon = 'edit';
  formulario!: FormGroup;

  constructor() {
    // O formulário de edição só controla o que o backend permite: 'isDisponivel'
    this.formulario = new FormGroup({
      isDisponivel: new FormControl(false),
    });
  }

  ngOnInit() {
    this.carregarDadosInstalacao();
    this.formulario.disable(); // Começa desabilitado
  }

  private carregarDadosInstalacao() {
    const instalacaoIdString = this.route.snapshot.paramMap.get('id');
    if (instalacaoIdString) {
      const instalacaoId = Number(instalacaoIdString);
      this.instalacaoService.getInstalacaoById(instalacaoId).subscribe({
        next: (dados) => {
          this.instalacao = dados;
          // Preenche o formulário apenas com o campo 'isDisponivel'
          this.formulario.patchValue({ isDisponivel: dados.isDisponivel });
        },
        error: (erro) => this.snackBar.open('Instalação não encontrada.', 'Fechar', { duration: 5000 })
      });
    }
  }

  toggleInfoEdit(): void {
    if (!this.isEditing) {
      this.isEditing = true;
      this.formulario.enable(); // Habilita o toggle
    } else {
      this.atualizarDisponibilidade();
    }
    this.atualizarEstadoDoBotao();
  }

  private atualizarDisponibilidade(): void {
    if (!this.instalacao) { return; }

    const updateRequest: InstalacaoUpdateRequest = this.formulario.getRawValue();

    this.instalacaoService.atualizarDisponibilidade(this.instalacao.id, updateRequest).subscribe({
      next: (dadosAtualizados) => {
        this.snackBar.open('Disponibilidade atualizada!', 'Fechar', { duration: 3000 });
        this.isEditing = false;
        this.formulario.disable();
        this.atualizarEstadoDoBotao();
        // Atualiza os dados na tela
        this.instalacao = dadosAtualizados;
        this.formulario.patchValue({ isDisponivel: dadosAtualizados.isDisponivel });
      },
      error: (erro) => this.snackBar.open('Erro ao atualizar. Tente novamente.', 'Fechar', { duration: 5000 })
    });
  }

  private atualizarEstadoDoBotao(): void {
    this.editButtonLabel = this.isEditing ? 'Salvar' : 'Editar';
    this.icon = this.isEditing ? 'save' : 'edit';
  }
}
