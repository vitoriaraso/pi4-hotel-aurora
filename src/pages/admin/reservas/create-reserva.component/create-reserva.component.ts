import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../../shared/button.component/button.component';
import { ReservaRequest, ReservaService, TipoPagamento } from '../../../../app/services/reserva/reserva.service';
import { JwtService } from '../../../../app/jwt/jwt.service';

@Component({
  selector: 'app-create-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatIconModule, ButtonComponent],
  templateUrl: './create-reserva.component.html',
  styleUrl: '../../css-componente-detail/detail.component.css'
})
export class CreateReservaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private reservaService = inject(ReservaService);
  private jwtService = inject(JwtService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  formulario!: FormGroup;
  tiposPagamento = Object.values(TipoPagamento);

  // Pegamos o ID do funcionário logado (admin)
  private funcionarioLogadoId = this.jwtService.getTokenId();

  ngOnInit(): void {
    this.formulario = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      tipoPagamento: [TipoPagamento.PIX, Validators.required],
      // IDs que o admin/funcionário precisa preencher
      clienteId: [null, [Validators.required, Validators.min(1)]],
      instalacaoAlugavelId: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.snackBar.open('Formulário inválido.', 'Fechar', { duration: 3000 });
      return;
    }

    // Monta o payload
    const requestData: ReservaRequest = {
      ...this.formulario.value,
      funcionarioId: this.funcionarioLogadoId // Adiciona o ID do funcionário logado
    };

    // Converte datas para o formato ISO (que o LocalDateTime do Spring espera)
    requestData.checkIn = new Date(this.formulario.value.checkIn).toISOString();
    requestData.checkOut = new Date(this.formulario.value.checkOut).toISOString();

    this.reservaService.cadastrarReserva(requestData).subscribe({
      next: () => {
        this.snackBar.open('Reserva cadastrada com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/admin/dashboard/reservas']);
      },
      error: (err) => {
        // Mostra o erro do backend (ex: "Conflito de reserva...")
        const errorMsg = err.error?.message || 'Erro ao cadastrar reserva.';
        this.snackBar.open(errorMsg, 'Fechar', { duration: 7000 });
      }
    });
  }
}
