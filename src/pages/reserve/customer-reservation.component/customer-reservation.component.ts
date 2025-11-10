// customer-reservation.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../shared/button.component/button.component';
import {
  ReservaRequest,
  ReservaService,
  TipoPagamento,
} from '../../../app/services/reserva/reserva.service';
import { JwtService } from '../../../app/jwt/jwt.service';
import { InstalacaoService } from '../../../app/services/instalacao/instalacao.service/instalacao.service';
import { BehaviorSubject, combineLatest } from 'rxjs'; // Adicionar combineLatest
import {
  TipoInstalacao,
  TipoInstalacaoLabel,
  CategoriaPorTipo,
} from '../../../app/models/instalacao/instalacao.model/instalacao.model';
import { switchMap, tap, filter } from 'rxjs/operators'; // Adicionar operadores

@Component({
  selector: 'app-customer-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, ButtonComponent],
  templateUrl: './customer-reservation.component.html',
  styleUrl: './customer-reservation.component.css',
})
export class CustomerReservationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private reservaService = inject(ReservaService);
  private jwtService = inject(JwtService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private instalacaoService = inject(InstalacaoService);

  formulario!: FormGroup;
  tiposPagamento = Object.values(TipoPagamento);

  private clienteLogadoId = this.jwtService.getTokenId();

  tiposInstalacao = Object.values(TipoInstalacao);
  tiposInstalacaoLabel = TipoInstalacaoLabel;

  private categoriasSubject = new BehaviorSubject<Record<string, string> | null>(null);
  public categoriasDisponiveis = this.categoriasSubject.asObservable();

  ngOnInit(): void {
    this.scrollToTop();
    this.formulario = this.fb.group({
      tipo: ['', [Validators.required]],
      categoria: [{ value: '', disabled: true }, [Validators.required]],
      numeroQuarto: [null],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      tipoPagamento: [TipoPagamento.PIX, Validators.required],
      instalacaoAlugavelId: [null, [Validators.required, Validators.min(1)]],
      orcamento: [null, { disabled: true }],
    });

    // Inicia a escuta para carregar as categorias e o orçamento
    this.escutarMudancasDeTipo();
    this.escutarMudancasDeCategoria(); // Novo método
  }

  // Getters para facilitar o acesso
  get tipoControl() {
    return this.formulario.get('tipo');
  }
  get categoriaControl() {
    return this.formulario.get('categoria');
  }
  get orcamento() {
    return this.formulario.get('orcamento');
  }

  private escutarMudancasDeTipo(): void {
    this.tipoControl?.valueChanges.subscribe((novoTipo) => {
      if (novoTipo) {
        // 1. Encontra as categorias corretas no nosso "Mapa Mestre"
        const categorias = CategoriaPorTipo[novoTipo as TipoInstalacao];

        // 2. Envia as novas categorias para o "stream"
        this.categoriasSubject.next(categorias);

        // 3. Reseta e habilita o select de 'categoria'
        this.categoriaControl?.reset('');
        this.categoriaControl?.enable();
      } else {
        // Se o 'tipo' for limpo, limpa e desabilita o select de 'categoria' e o orçamento
        this.categoriasSubject.next(null);
        this.categoriaControl?.reset('');
        this.categoriaControl?.disable();
        this.orcamento?.reset(''); // Limpa o orçamento
      }
    });
  }

  /**
   * Novo método para chamar a simulação de orçamento
   * sempre que 'tipo' e 'categoria' estiverem preenchidos.
   */
  private escutarMudancasDeCategoria(): void {
    this.categoriaControl?.valueChanges
      .pipe(
        // Garante que ambos os campos estão preenchidos
        filter(() => this.tipoControl?.value && this.categoriaControl?.value),
        // Usa switchMap para cancelar chamadas antigas se uma nova começar
        tap(() => this.orcamento?.setValue('Carregando...')), // Feedback de carregamento
        switchMap((novaCategoria: string) => {
          const tipo = this.tipoControl?.value;
          // Chama o serviço de orçamento
          return this.instalacaoService.simularOrcamento(tipo, novaCategoria);
        })
      )
      .subscribe({
        next: (orcamentoResponse) => {
          // Atualiza o campo 'orcamento' com o valor retornado
          this.orcamento?.setValue(orcamentoResponse.valorFinal);
        },
        error: (err) => {
          console.error('Erro ao simular orçamento:', err);
          this.orcamento?.setValue('Erro ao calcular');
          this.snackBar.open('Não foi possível simular o orçamento.', 'Fechar', { duration: 5000 });
        },
      });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched(); // Marca todos como 'touched' para exibir erros
      return;
    }

    const requestData: ReservaRequest = {
      ...this.formulario.value,
      clienteId: this.clienteLogadoId,
      funcionarioId: null,
    };

    // Converte datas para ISO
    requestData.checkIn = new Date(this.formulario.value.checkIn).toISOString();
    requestData.checkOut = new Date(this.formulario.value.checkOut).toISOString();

    this.reservaService.cadastrarReserva(requestData).subscribe({
      next: () => {
        this.snackBar.open('Reserva criada com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/account/my-reservations']);
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'Erro ao criar reserva.';
        this.snackBar.open(errorMsg, 'Fechar', { duration: 7000 });
      },
    });
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
