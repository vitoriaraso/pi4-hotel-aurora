import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { DashboardTableComponent } from '../../../../shared/dashboard-table.component/dashboard-table.component';
import { FuncionarioResponseDTO, FuncionarioService } from '../../../../app/services/funcionario/funcionario.service';
import {
  ConfirmationDialogComponent
} from '../../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ButtonComponent } from '../../../../shared/button.component/button.component';

// Define uma interface estendida para garantir a tipagem da nova coluna formatada
interface FuncionarioTabelaDTO extends FuncionarioResponseDTO {
  ativoTexto: string;
  cpfFormatado: string;
}

// 💡 Função de formatação manual para CPF (substitui a necessidade de injetar o NgxMaskPipe)
function formatCpf(cpf: string): string {
  cpf = cpf.replace(/[^\d]/g, ''); // Remove não-dígitos
  if (cpf.length === 11) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  return cpf;
}

@Component({
  selector: 'app-dashboard-funcionarios',
  standalone: true,
  imports: [
    CommonModule,
    DashboardTableComponent,
    MatDialogModule,
    ButtonComponent,
    RouterLink,
    MatButtonToggleModule,
    // ❌ REMOVIDO: NgxMaskPipe
  ],
  templateUrl: './dashboard-funcionarios.component.html',
  styleUrls: ['../../css-componente-dashboard/dashboard.component.css']
})
export class DashboardFuncionariosComponent implements OnInit {
  private funcionarioService = inject(FuncionarioService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  // ❌ REMOVIDO: private maskPipe = inject(NgxMaskPipe);

  mostrando: 'ativos' | 'inativos' = 'ativos';

  listaDeFuncionarios: FuncionarioTabelaDTO[] = [];
  isLoading = true;

  colunasVisiveis: string[] = ['id', 'nome', 'cpfFormatado', 'email', 'cargo', 'telefone', 'ativoTexto'];

  nomesDasColunas: Record<string, string> = {
    id: 'ID',
    nome: 'Nome do Funcionário',
    cpfFormatado: 'CPF', // Novo nome da coluna
    email: 'E-mail',
    cargo: 'Cargo',
    telefone: 'Telefone',
    ativoTexto: 'Status'
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
        this.listaDeFuncionarios = dados.map(func => {
          const cpf = func.cpf || '';
          let cpfFormatado = 'N/A';

          if (cpf && /^\d{11}$/.test(cpf)) {
            // 💡 APLICAÇÃO MANUAL DA MÁSCARA (usando a função de utilidade)
            cpfFormatado = formatCpf(cpf);
          } else if (cpf) {
            cpfFormatado = cpf;
          }

          return {
            ...func,
            ativoTexto: this.mostrando === 'ativos' ? 'Ativo' : 'Inativo',
            cpfFormatado: cpfFormatado,
            hotelNome: func.hotel.nome,
          } as FuncionarioTabelaDTO;
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar funcionários:', err);
        this.isLoading = false;
        this.snackBar.open('Não foi possível carregar a lista de funcionários.', 'Fechar', { duration: 5000 });
      }
    });
  }

  // ... restante do componente (métodos inalterados)
  mudarFiltro(novoFiltro: 'ativos' | 'inativos'): void {
    this.mostrando = novoFiltro;
    this.carregarFuncionarios();
  }

  handleView(funcionario: FuncionarioTabelaDTO): void {
    const status = this.mostrando === 'ativos' ? 'ativo' : 'inativo';
    this.router.navigate(
      ['/admin/dashboard/funcionarios', funcionario.id],
      { queryParams: { status: status } }
    );
  }

  handleDesativar(funcionario: FuncionarioTabelaDTO): void {
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

  handleReativar(funcionario: FuncionarioTabelaDTO): void {
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
