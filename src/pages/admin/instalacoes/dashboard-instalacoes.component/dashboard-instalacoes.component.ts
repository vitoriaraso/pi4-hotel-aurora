import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DashboardTableComponent } from '../../../../shared/dashboard-table.component/dashboard-table.component';
import { ButtonComponent } from '../../../../shared/button.component/button.component';
import {InstalacaoService} from '../../../../app/services/instalacao/instalacao.service/instalacao.service';
import {InstalacaoResponseDTO} from '../../../../app/models/instalacao/instalacao.model/instalacao.model';
import {
  ConfirmationDialogComponent
} from '../../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dashboard-instalacoes',
  standalone: true,
  imports: [CommonModule, DashboardTableComponent, MatDialogModule, ButtonComponent, RouterLink],
  templateUrl: './dashboard-instalacoes.component.html',
  styleUrls: ['../../css-componente-dashboard/dashboard.component.css']
})
export class DashboardInstalacoesComponent implements OnInit {
  private instalacaoService = inject(InstalacaoService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  listaDeInstalacoes: (InstalacaoResponseDTO & { hotelNome: string, disponibilidadeTexto: string })[] = [];
  isLoading = true;

  colunasVisiveis: string[] = ['id', 'nome', 'tipo', 'disponibilidadeTexto', 'hotelNome'];
  nomesDasColunas: Record<string, string> = {
    id: 'ID',
    nome: 'Nome da Instalação',
    tipo: 'Tipo',
    disponibilidadeTexto: 'Disponível',
    hotelNome: 'Hotel'
  };

  ngOnInit(): void {
    this.carregarInstalacoes();
  }

  carregarInstalacoes(): void {
    this.isLoading = true;
    this.instalacaoService.getInstalacoes().subscribe({
      next: (dados) => {
        // Mapeia os dados para campos amigáveis para a tabela
        this.listaDeInstalacoes = dados.map(item => ({
          ...item,
          hotelNome: item.hotel.nome,
          disponibilidadeTexto: item.isDisponivel ? 'Sim' : 'Não',
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar instalações:', err);
        this.isLoading = false;
      }
    });
  }

  handleView(item: InstalacaoResponseDTO): void {
    this.router.navigate(['/admin/dashboard/instalacoes-alugaveis', item.id]);
  }

  handleDelete(item: InstalacaoResponseDTO): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Tem certeza que deseja excluir a instalação "${item.nome}"?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.instalacaoService.deleteInstalacao(item.id).subscribe({
          next: () => {
            this.snackBar.open('Instalação excluída com sucesso!', 'Fechar', { duration: 3000 });
            this.carregarInstalacoes();
          },
          error: (err) => this.snackBar.open('Erro ao excluir instalação.', 'Fechar', { duration: 5000 })
        });
      }
    });
  }
}
