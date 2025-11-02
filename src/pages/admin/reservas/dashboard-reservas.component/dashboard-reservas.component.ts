import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DashboardTableComponent } from '../../../../shared/dashboard-table.component/dashboard-table.component';
import { ButtonComponent } from '../../../../shared/button.component/button.component';
import { ReservaResponseDTO, ReservaService } from '../../../../app/services/reserva/reserva.service';

@Component({
  selector: 'app-dashboard-reservas',
  standalone: true,
  imports: [CommonModule, DashboardTableComponent, MatDialogModule, ButtonComponent, RouterLink],
  templateUrl: './dashboard-reservas.component.html',
  styleUrl: '../../css-componente-dashboard/dashboard.component.css'
})
export class DashboardReservasComponent implements OnInit {
  private reservaService = inject(ReservaService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  listaDeReservas: any[] = [];
  isLoading = true;

  colunasVisiveis: string[] = [
    // 'id',
    'statusReserva',
    'clienteNome',
    'instalacaoNome',
    'checkIn',
    'checkOut',
    'valorTotal',
    'funcionarioNome'
  ];
  nomesDasColunas: Record<string, string> = {
    // 'id': 'ID',
    'statusReserva': 'Status',
    'clienteNome': 'Cliente',
    'instalacaoNome': 'Instalação',
    'checkIn': 'Check-in',
    'checkOut': 'Check-out',
    'valorTotal': 'Valor Total',
    'funcionarioNome': 'Funcionário'
  };

  ngOnInit(): void {
    this.carregarReservas();
  }

  carregarReservas(): void {
    this.isLoading = true;
    this.reservaService.getReservas().subscribe({

      next: (dados) => {
        this.listaDeReservas = dados.map(reserva => ({
          // id: reserva.id,
          statusReserva: reserva.statusReserva,
          checkIn: reserva.checkIn.split(' ')[0],
          checkOut: reserva.checkOut.split(' ')[0],
          valorTotal: reserva.valorTotal,
          clienteNome: reserva.cliente.nome,
          instalacaoNome: reserva.instalacaoAlugavel.nome,
          funcionarioNome: reserva.funcionario.nome
        }));
        this.isLoading = false;
        console.log("[PAI] Dados 'achatados' enviados para a tabela:", this.listaDeReservas);
      },
      error: (err) => {
        console.error('Erro ao carregar reservas:', err);
        this.isLoading = false;
      }
    });
  }
}
