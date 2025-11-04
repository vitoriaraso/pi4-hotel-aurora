import {Component, inject, OnInit} from '@angular/core';
// Importe o seu componente de tabela reutilizável
import { DashboardTableComponent } from '../../../../shared/dashboard-table.component/dashboard-table.component'; // Ajuste o caminho
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

// Use apenas o DTO que a API retorna
import { ClienteResponseDTO } from '../../../../app/models/cliente/cliente.model';
import { ClienteService } from '../../../../app/services/cliente/cliente.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { EditClientComponent } from '../../../../shared/dialogs/edit-client/edit-client';
import {
  ConfirmationDialogComponent
} from '../../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ButtonComponent } from '../../../../shared/button.component/button.component';

@Component({
  selector: 'app-dashboard-clientes',
  standalone: true,
  imports: [
    CommonModule,
    DashboardTableComponent,
    MatDialogModule,
    ButtonComponent,
    RouterLink,
    MatButtonToggleModule,
  ],
  templateUrl: './dashboard-clientes.component.html',
  styleUrl: '../../css-componente-dashboard/dashboard.component.css'
})
export class DashboardClientesComponent implements OnInit {
  private clienteService = inject(ClienteService);
  // private dialog = inject(MatDialog);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  mostrando: 'ativos' | 'inativos' = 'ativos';

  // Propriedades para a tabela
  listaDeClientes: ClienteResponseDTO[] = [];
  isLoading = true;

  colunasVisiveisParaAdmin: string[] = ['id', 'nome', 'email', 'tipoCliente', 'dataCadastro'];
  nomesDasColunas: Record<string, string> = {
    id: 'Código',
    nome: 'Nome Completo',
    email: 'E-mail',
    tipoCliente: 'Tipo',
    dataCadastro: 'Data de Cadastro'
  };

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.isLoading = true;

    const observable = this.mostrando === 'ativos'
      ? this.clienteService.getClientes()
      : this.clienteService.getInativos();

    observable.subscribe({
      next: (dados) => {
        this.listaDeClientes = dados.map(cliente => ({
          ...cliente,
          ativoTexto: cliente.ativo ? 'Ativo' : 'Inativo'
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
        this.isLoading = false;
      }
    });
  }

  mudarFiltro(novoFiltro: 'ativos' | 'inativos'): void {
    this.mostrando = novoFiltro;
    this.carregarClientes();
  }

  /**
   * É chamada quando o evento (editAction) é emitido pela tabela.
   * Navega para a página de detalhes do cliente selecionado.
   * @param cliente O objeto do cliente recebido do evento ($event).
   */
  handleEdit(cliente: ClienteResponseDTO): void { // O tipo pode ser ClienteResponseDTO (ou any)
    // 1. Determina o status com base na propriedade booleana 'ativo'
    const status = cliente.ativo ? 'ativo' : 'inativo';

    console.log(`Navegando para detalhes do ID: ${cliente.id} (Status: ${status})`);

    // 2. Navega para a URL de detalhes, adicionando o queryParams
    this.router.navigate(
      ['/admin/dashboard/clientes', cliente.id], // A rota principal (ex: /admin/dashboard/clientes/123)
      { queryParams: { status: status } } // O parâmetro (ex: ?status=inativo)
    );
  }

  handleDesativar(cliente: ClienteResponseDTO): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Tem certeza que deseja DESATIVAR o cliente "${cliente.nome}"?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.clienteService.desativarCliente(cliente.id).subscribe({
          next: () => {
            this.snackBar.open('Cliente desativado com sucesso!', 'Fechar', { duration: 3000 });
            this.carregarClientes(); // Recarrega a lista
          },
          error: (err) => this.snackBar.open('Erro ao desativar o cliente.', 'Fechar', { duration: 5000 })
        });
      }
    });
  }

  handleReativar(cliente: ClienteResponseDTO): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Tem certeza que deseja REATIVAR o cliente "${cliente.nome}"?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.clienteService.reativarCliente(cliente.id).subscribe({
          next: () => {
            this.snackBar.open('Cliente reativado com sucesso!', 'Fechar', { duration: 3000 });
            this.carregarClientes(); // Recarrega a lista
          },
          error: (err) => this.snackBar.open('Erro ao reativar o cliente.', 'Fechar', { duration: 5000 })
        });
      }
    });
  }
}
