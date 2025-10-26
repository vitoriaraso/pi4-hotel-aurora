import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../../app/services/reserva/reserva.service';
import { ReservaResponseDTO } from '../../../app/models/reserva/reserva.model';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.css'
})
export class MyReservationsComponent implements OnInit {
  private reservaService = inject(ReservaService);

  reservas: ReservaResponseDTO[] = [];
  isLoading = true;
  error: string | null = null;

  ngOnInit(): void {
    // TODO: adapte essa linha para pegar o ID real do usuário logado
    const clienteId = 1;

    if (clienteId) {
      // Chama o novo métdo que faz o trabalho pesado
      this.reservaService.getReservasPorCliente(clienteId).subscribe({
        next: (dados) => {
          console.log('DADOS BRUTOS RECEBIDOS PELA API:', dados);
          this.reservas = dados;
          this.isLoading = false;
          console.log('Reservas do cliente carregadas:', this.reservas);
        },
        error: (err) => {
          this.error = 'Não foi possível carregar o histórico de reservas.';
          this.isLoading = false;
          console.error('Falha ao buscar reservas:', err);
        }
      });
    } else {
      this.error = "Usuário não encontrado.";
      this.isLoading = false;
    }
  }
}
