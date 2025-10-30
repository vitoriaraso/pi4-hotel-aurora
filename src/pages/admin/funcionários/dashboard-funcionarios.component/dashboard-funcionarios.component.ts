import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// Imports do Dialog
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// Seus componentes e serviços
import { DashboardTableComponent } from '../../../../shared/dashboard-table.component/dashboard-table.component';
import {FuncionarioResponseDTO, FuncionarioService} from '../../../../app/services/funcionario/funcionario.service';
import {
  ConfirmationDialogComponent
} from '../../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import {ButtonComponent} from '../../../../shared/button.component/button.component';

@Component({
  selector: 'app-dashboard-funcionarios',
  standalone: true,
  imports: [CommonModule, DashboardTableComponent, MatDialogModule, ButtonComponent, RouterLink],
  templateUrl: './dashboard-funcionarios.component.html',
  styleUrl: '../../css-componente-dashboard/dashboard.component.css'
})
export class DashboardFuncionariosComponent implements OnInit {
  private funcionarioService = inject(FuncionarioService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  listaDeFuncionarios: FuncionarioResponseDTO[] = [];
  isLoading = true;

  // Painel de controle da tabela: quais colunas mostrar e como chamá-las
  colunasVisiveis: string[] = ['id', 'nome', 'email', 'cargo', 'telefone'];
  nomesDasColunas: Record<string, string> = {
    id: 'ID',
    nome: 'Nome do Funcionário',
    email: 'E-mail',
    cargo: 'Cargo',
    telefone: 'Telefone'
  };

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios(): void {
    this.isLoading = true;
    this.funcionarioService.getFuncionarios().subscribe({
      next: (dados) => {
        this.listaDeFuncionarios = dados;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar funcionários:', err);
        this.isLoading = false;
      }
    });
  }

  handleView(funcionario: FuncionarioResponseDTO): void {
    this.router.navigate(['/admin/dashboard/funcionarios', funcionario.id]);
  }

  handleDelete(funcionario: FuncionarioResponseDTO): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Tem certeza que deseja excluir o funcionário "${funcionario.nome}"?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.funcionarioService.deleteFuncionario(funcionario.id).subscribe({
          next: () => {
            this.snackBar.open('Funcionário excluído com sucesso!', 'Fechar', { duration: 3000 });
            this.carregarFuncionarios();
          },
          error: (err) => {
            console.error('Erro ao excluir funcionário:', err);
            this.snackBar.open('Erro ao excluir. Tente novamente.', 'Fechar', { duration: 5000 });
          }
        });
      }
    });
  }
}
