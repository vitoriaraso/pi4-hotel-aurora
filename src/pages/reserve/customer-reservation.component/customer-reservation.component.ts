import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../shared/button.component/button.component';
import { ReservaRequest, ReservaService, TipoPagamento } from '../../../app/services/reserva/reserva.service';
import { JwtService } from '../../../app/jwt/jwt.service';

@Component({
  selector: 'app-customer-reservation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    ButtonComponent
  ],
  templateUrl: './customer-reservation.component.html',
  styleUrl: './customer-reservation.component.css' // Pode usar o CSS do 'create-reserva'
})
export class CustomerReservationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private reservaService = inject(ReservaService);
  private jwtService = inject(JwtService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  formulario!: FormGroup;
  tiposPagamento = Object.values(TipoPagamento);

  // Pega o ID do cliente logado
  private clienteLogadoId = this.jwtService.getTokenId();

  ngOnInit(): void {
    this.formulario = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      tipoPagamento: [TipoPagamento.PIX, Validators.required],
      instalacaoAlugavelId: [null, [Validators.required, Validators.min(1)]],
      // Os IDs de cliente e funcionário são preenchidos automaticamente
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) { /* ... */ return; }

    const requestData: ReservaRequest = {
      ...this.formulario.value,
      clienteId: this.clienteLogadoId, // ID do cliente vem do token
      funcionarioId: null // Cliente não define funcionário
    };

    // Converte datas para ISO
    requestData.checkIn = new Date(this.formulario.value.checkIn).toISOString();
    requestData.checkOut = new Date(this.formulario.value.checkOut).toISOString();

    this.reservaService.cadastrarReserva(requestData).subscribe({
      next: () => {
        this.snackBar.open('Reserva criada com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/account/my-reservations']); // Manda para "Minhas Reservas"
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'Erro ao criar reserva.';
        this.snackBar.open(errorMsg, 'Fechar', { duration: 7000 });
      }
    });
  }
}
