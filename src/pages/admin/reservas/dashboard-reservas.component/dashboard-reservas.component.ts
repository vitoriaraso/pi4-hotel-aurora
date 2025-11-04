import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DashboardTableComponent } from '../../../../shared/dashboard-table.component/dashboard-table.component';
import { ButtonComponent } from '../../../../shared/button.component/button.component';
import { ReservaService } from '../../../../app/services/reserva/reserva.service';

@Component({
  selector: 'app-dashboard-reservas',
  standalone: true,
  imports: [
    CommonModule,
    DashboardTableComponent,
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './dashboard-reservas.component.html',
  styleUrl: '../../css-componente-dashboard/dashboard.component.css'
})
export class DashboardReservasComponent implements OnInit {
  private reservaService = inject( ReservaService);
  private router = inject(Router);

  listaDeReservas: any[] = [];
  isLoading = true;

  // "Achatamos" os dados, então usamos nomes simples
  colunasVisiveis: string[] = ['id', 'statusReserva', 'clienteNome', 'instalacaoNome', 'checkIn', 'valorTotal', 'funcionarioNome'];
  nomesDasColunas: Record<string, string> = {
    id: 'ID',
    statusReserva: 'Status',
    clienteNome: 'Cliente',
    instalacaoNome: 'Instalação',
    checkIn: 'Check-in',
    valorTotal: 'Valor Total',
    funcionarioNome: 'Funcionário'
  };

  ngOnInit(): void {
    this.carregarReservas();
  }

  carregarReservas(): void {
    this.isLoading = true;
    this.reservaService.getReservas().subscribe({
      next: (dados) => {
        this.listaDeReservas = dados.map(reserva => ({
          ...reserva,
          // "Achata" os objetos para a tabela
          clienteNome: reserva.cliente.nome,
          funcionarioNome: reserva.funcionario ? reserva.funcionario.nome : 'N/A',
          instalacaoNome: reserva.instalacaoAlugavel.nome,
          checkIn: reserva.checkIn.split(' ')[0], // Só a data
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar reservas:', err);
        this.isLoading = false;
      }
    });
  }
}
