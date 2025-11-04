import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// Imports do Dialog
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// Seus componentes e serviços
import { DashboardTableComponent } from '../../../../shared/dashboard-table.component/dashboard-table.component';
import { FuncionarioResponseDTO, FuncionarioService } from '../../../../app/services/funcionario/funcionario.service';
import {
  ConfirmationDialogComponent
} from '../../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ButtonComponent } from '../../../../shared/button.component/button.component';

@Component({
  selector: 'app-dashboard-funcionarios',
  standalone: true,
  imports: [
    CommonModule,
    DashboardTableComponent,
    MatDialogModule,
    ButtonComponent,
    RouterLink,
    MatButtonToggleModule
  ],
  templateUrl: './dashboard-funcionarios.component.html',
  styleUrls: ['../../css-componente-dashboard/dashboard.component.css']
})
export class DashboardFuncionariosComponent implements OnInit {
  private funcionarioService = inject(FuncionarioService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  mostrando: 'ativos' | 'inativos' = 'ativos';

  listaDeFuncionarios: FuncionarioResponseDTO[] = [];
  isLoading = true;

  // Painel de controle da tabela: quais colunas mostrar e como chamá-las
  colunasVisiveis: string[] = ['id', 'nome', 'email', 'cargo', 'telefone', 'ativoTexto'];
  nomesDasColunas: Record<string, string> = {
    id: 'ID',
    nome: 'Nome do Funcionário',
    email: 'E-mail',
    cargo: 'Cargo',
    telefone: 'Telefone',
    ativoTexto: 'Status' // Nova coluna de Status
  };

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios(): void {
    this.isLoading = true;

    const observable = this.mostrando === 'ativos'
      ? this.funcionarioService.getAtivos()
      : this.funcionarioService.getInativos();

    observable.subscribe({
      next: (dados) => {
        this.listaDeFuncionarios = dados.map(func => ({
          ...func,
          ativoTexto: this.mostrando === 'ativos' ? 'Ativo' : 'Inativo',
          hotelNome: func.hotel.nome, // "Achata" o nome do hotel
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar funcionários:', err);
        this.isLoading = false;
      }
    });
  }

  mudarFiltro(novoFiltro: 'ativos' | 'inativos'): void {
    this.mostrando = novoFiltro;
    this.carregarFuncionarios();
  }

  handleView(funcionario: FuncionarioResponseDTO): void {
    // 6. Passa o status atual pela URL (queryParams)
    const status = this.mostrando === 'ativos' ? 'ativo' : 'inativo';
    this.router.navigate(
      ['/admin/dashboard/funcionarios', funcionario.id],
      { queryParams: { status: status } }
    );
  }

  handleDesativar(funcionario: FuncionarioResponseDTO): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Tem certeza que deseja DESATIVAR o funcionário "${funcionario.nome}"?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.funcionarioService.desativarFuncionario(funcionario.id).subscribe({
          next: () => {
            this.snackBar.open('Funcionário desativado!', 'Fechar', { duration: 3000 });
            this.carregarFuncionarios();
          },
          error: (err) => this.snackBar.open('Erro ao desativar.', 'Fechar', { duration: 5000 })
        });
      }
    });
  }

  handleReativar(funcionario: FuncionarioResponseDTO): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Tem certeza que deseja REATIVAR o funcionário "${funcionario.nome}"?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.funcionarioService.reativarFuncionario(funcionario.id).subscribe({
          next: () => {
            this.snackBar.open('Funcionário reativado!', 'Fechar', { duration: 3000 });
            this.carregarFuncionarios();
          },
          error: (err) => this.snackBar.open('Erro ao reativar.', 'Fechar', { duration: 5000 })
        });
      }
    });
  }
}
