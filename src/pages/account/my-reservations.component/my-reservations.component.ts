import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe para usar @if, @for, | currency
import { MatSnackBar } from '@angular/material/snack-bar';

// 1. Importe os serviços e modelos corretos
import { ClienteService } from '../../../app/services/cliente/cliente.service'; // Serviço do Cliente
import { JwtService } from '../../../app/jwt/jwt.service';
import { ReservaResumoDTO } from '../../../app/models/reserva/reserva.model';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.css'
})
export class MyReservationsComponent implements OnInit {
  // 2. Injete os serviços corretos
  private clienteService = inject(ClienteService);
  private jwtService = inject(JwtService);
  private snackBar = inject(MatSnackBar);

  // 3. ✅ A MUDANÇA PRINCIPAL: O array agora é do tipo Resumo
  reservas: ReservaResumoDTO[] = [];
  isLoading = true;
  error: string | null = null;

  ngOnInit(): void {
    // 4. Pegue o ID do cliente logado
    const clienteId = this.jwtService.getTokenId();

    if (clienteId !== null) {
      // 5. Chame o SERVIÇO DO CLIENTE
      this.clienteService.getClienteById(clienteId).subscribe({
        next: (dadosDoCliente) => {
          this.reservas = dadosDoCliente.reservas;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erro ao buscar dados do cliente:', err);
          this.error = 'Não foi possível carregar suas reservas.';
          this.isLoading = false;
          this.snackBar.open(this.error, 'Fechar', { duration: 5000 });
        }
      });
    } else {
      this.error = 'Erro de autenticação. Não foi possível encontrar seu ID.';
      this.isLoading = false;
      this.snackBar.open(this.error, 'Fechar', { duration: 5000 });
    }
  }
}
