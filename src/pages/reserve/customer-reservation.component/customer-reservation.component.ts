import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../shared/button.component/button.component';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
// ✅ Adicione switchMap e catchError para a API
import { switchMap, tap, filter, catchError, debounceTime } from 'rxjs/operators';

import { ReservaRequest, ReservaService, TipoPagamento } from '../../../app/services/reserva/reserva.service';
import { JwtService } from '../../../app/jwt/jwt.service';
import { InstalacaoService } from '../../../app/services/instalacao/instalacao.service/instalacao.service';
import {
  TipoInstalacao,
  TipoInstalacaoLabel,
  CategoriaPorTipo,
  InstalacaoResponseDTO
} from '../../../app/models/instalacao/instalacao.model/instalacao.model';

@Component({
  selector: 'app-customer-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, ButtonComponent, KeyValuePipe],
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

  // --- STREAMS ---

  // 1. Categorias para o Select 2
  private categoriasSubject = new BehaviorSubject<Record<string, string> | null>(null);
  public categoriasDisponiveis$ = this.categoriasSubject.asObservable();

  // 2. Instalações para o Select 3 (NOVO: O que faltava no seu código)
  private alugaveisFiltradosSubject = new BehaviorSubject<InstalacaoResponseDTO[]>([]);
  public alugaveisFiltrados$ = this.alugaveisFiltradosSubject.asObservable();

  // Lista completa carregada da API
  private todosOsAlugaveis: InstalacaoResponseDTO[] = [];

  // Controle de UI
  public isTipoDiaria = false;

  ngOnInit(): void {
    this.scrollToTop();
    this.formulario = this.fb.group({
      tipo: ['', [Validators.required]],
      categoria: [{ value: '', disabled: true }, [Validators.required]],
      instalacaoAlugavelId: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      tipoPagamento: [TipoPagamento.PIX, Validators.required],
      orcamento: [{ value: null, disabled: true }], // Readonly
    });

    // ✅ 1. Carrega todas as instalações da API ao iniciar
    this.instalacaoService.getInstalacoes().subscribe(dados => {
      this.todosOsAlugaveis = dados;
    });

    this.escutarMudancasDeTipo();
    this.escutarMudancasDeCategoriaEDatas();
  }

  // Getters
  get tipoControl() { return this.formulario.get('tipo'); }
  get categoriaControl() { return this.formulario.get('categoria'); }
  get instalacaoControl() { return this.formulario.get('instalacaoAlugavelId'); }
  get orcamento() { return this.formulario.get('orcamento'); }

  get tipoSelecionado(): TipoInstalacao | null {
    const valor = this.tipoControl?.value;
    return valor ? (valor as TipoInstalacao) : null;
  }

  private escutarMudancasDeTipo(): void {
    this.tipoControl?.valueChanges.subscribe((novoTipo) => {
      // 1. Reseta dependentes
      this.categoriaControl?.reset('');
      this.instalacaoControl?.reset('');
      this.alugaveisFiltradosSubject.next([]);
      this.orcamento?.reset();

      if (novoTipo) {
        this.isTipoDiaria = (novoTipo === 'QUARTO');

        // 2. Carrega as Categorias do Tipo selecionado (ex: para QUARTO, pega DELUXE, STANDARD, etc.)
        // CategoriaPorTipo é aquele mapa que criamos no model
        const mapaCategorias = CategoriaPorTipo[novoTipo as TipoInstalacao];

        // Transforma o mapa em uma lista de chaves válidas (ex: ['PRESIDENCIAL', 'DELUXE', 'STANDARD'])
        const categoriasValidas = Object.keys(mapaCategorias);

        // Atualiza o Select de Categoria
        this.categoriasSubject.next(mapaCategorias);
        this.categoriaControl?.enable();

        // 3. ✅ O FILTRO CORRIGIDO ("Filtro Inverso")
        const itensDoTipo = this.todosOsAlugaveis.filter(item => {
          // O valor que vem da API (ex: "DELUXE")
          const valorVindoDaApi = item.tipo ? item.tipo.toString().toUpperCase().trim() : '';

          // Verifica se "DELUXE" está na lista de categorias de "QUARTO"
          // OU se bate exatamente com o tipo (caso a API mande certo para alguns itens)
          const ehCategoriaValida = categoriasValidas.includes(valorVindoDaApi);
          const ehTipoExato = valorVindoDaApi === novoTipo.toString().toUpperCase().trim();

          return (ehCategoriaValida || ehTipoExato) && item.isDisponivel;
        });

        console.log(`Itens encontrados para ${novoTipo}: ${itensDoTipo.length}`);

        this.alugaveisFiltradosSubject.next(itensDoTipo);
        this.instalacaoControl?.enable();

      } else {
        this.categoriasSubject.next(null);
        this.categoriaControl?.disable();
        this.instalacaoControl?.disable();
      }
    });
  }

  /**
   * Calcula o orçamento via API sempre que os dados mudam.
   */
  private escutarMudancasDeCategoriaEDatas(): void {
    combineLatest([
      this.formulario.get('tipo')!.valueChanges,
      this.formulario.get('categoria')!.valueChanges,
      this.formulario.get('checkIn')!.valueChanges,
      this.formulario.get('checkOut')!.valueChanges,
    ])
      .pipe(
        debounceTime(500), // Evita chamadas excessivas enquanto digita
        tap(() => this.orcamento?.setValue('Calculando...')),
        // Só prossegue se tudo estiver preenchido
        filter(([tipo, categoria, checkIn, checkOut]) => !!(tipo && categoria && checkIn && checkOut)),

        // ✅ Chama a API de Simulação
        switchMap(([tipo, categoria, checkIn, checkOut]) => {
          // Cálculo de Duração Local para multiplicar pelo valor da API
          const start = new Date(checkIn);
          const end = new Date(checkOut);
          const diffMs = end.getTime() - start.getTime();
          if (diffMs <= 0) return of(null);

          let duracao = 0;
          if (this.isTipoDiaria) {
            duracao = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
            if (duracao < 1) duracao = 1;
          } else {
            duracao = Math.ceil(diffMs / (1000 * 60 * 60));
            if (duracao < 1) duracao = 1;
          }

          // Chama a API para pegar o valor base
          return this.instalacaoService.simularOrcamento(categoria, tipo).pipe(
            // Mapeia a resposta da API para o valor total
            switchMap(res => of(res.valorFinal * duracao)),
            catchError(err => {
              console.error('Erro API Orçamento:', err);
              return of(null);
            })
          );
        })
      )
      .subscribe({
        next: (valorTotal) => {
          if (valorTotal !== null) {
            const valorFormatado = valorTotal.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            });
            this.orcamento?.setValue(valorFormatado);
          } else {
            this.orcamento?.setValue('Erro/Inválido');
          }
        }
      });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const requestData: ReservaRequest = {
      ...this.formulario.value,
      clienteId: this.clienteLogadoId,
      funcionarioId: null,
    };

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
