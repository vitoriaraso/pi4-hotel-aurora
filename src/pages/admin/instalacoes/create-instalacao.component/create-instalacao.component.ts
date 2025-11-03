import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../../shared/button.component/button.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {InstalacaoService} from '../../../../app/services/instalacao/instalacao.service/instalacao.service';
import {
  CategoriaPorTipo,
  InstalacaoRequest,
  TipoInstalacao,
  TipoInstalacaoLabel
} from '../../../../app/models/instalacao/instalacao.model/instalacao.model'; // Para 'isDisponivel'
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-create-instalacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatIconModule, ButtonComponent, MatSlideToggleModule, KeyValuePipe],
  templateUrl: './create-instalacao.component.html',
  styleUrls: ['../../css-componente-detail/detail.component.css']
})
export class CreateInstalacaoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private instalacaoService = inject(InstalacaoService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  tiposInstalacao = Object.values(TipoInstalacao);
  tiposInstalacaoLabel = TipoInstalacaoLabel;

  // Um "stream" que guarda a lista de categorias disponíveis para o Select 2
  private categoriasSubject = new BehaviorSubject<Record<string, string> | null>(null);
  public categoriasDisponiveis = this.categoriasSubject.asObservable();

  formulario!: FormGroup;

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      isDisponivel: [true, Validators.required],
      descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      tipo: ['', [Validators.required]], // Ex: "SAUNA", "QUARTO", "AUDITORIO"
      categoria: [{ value: '', disabled: true }, [Validators.required]], // Ex: "TipoSauna.SECA", "TipoQuarto.SOLTEIRO"
      numeroQuarto: [null],
      id_hotel: [1, Validators.required]
    });

    // Inicia o "ouvinte" de mudanças
    this.escutarMudancasDeTipo();
  }

  // Getters para facilitar o acesso
  get tipoControl() { return this.formulario.get('tipo'); }
  get categoriaControl() { return this.formulario.get('categoria'); }

  private escutarMudancasDeTipo(): void {
    // Sempre que o valor do select 'tipo' mudar...
    this.tipoControl?.valueChanges.subscribe(novoTipo => {
      if (novoTipo) {
        // 1. Encontra as categorias corretas no nosso "Mapa Mestre"
        const categorias = CategoriaPorTipo[novoTipo as TipoInstalacao];

        // 2. Envia as novas categorias para o "stream"
        this.categoriasSubject.next(categorias);

        // 3. Reseta e habilita o select de 'categoria'
        this.categoriaControl?.reset('');
        this.categoriaControl?.enable();
      } else {
        // Se o 'tipo' for limpo, limpa e desabilita o select de 'categoria'
        this.categoriasSubject.next(null);
        this.categoriaControl?.reset('');
        this.categoriaControl?.disable();
      }
    });
  }



  onSubmit(): void {
    if (this.formulario.invalid) {
      this.snackBar.open('Formulário inválido. Verifique os campos.', 'Fechar', { duration: 3000 });
      return;
    }
    const requestData: InstalacaoRequest = this.formulario.getRawValue();
    this.instalacaoService.cadastrarInstalacao(requestData).subscribe({
      next: () => {
        this.snackBar.open('Instalação cadastrada com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/admin/dashboard/instalacoes-alugaveis']);
      },
      error: (err) => this.snackBar.open('Erro ao cadastrar instalação.', 'Fechar', { duration: 5000 })
    });
  }
}
