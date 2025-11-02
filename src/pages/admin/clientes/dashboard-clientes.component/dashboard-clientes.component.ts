import {Component, inject, OnInit} from '@angular/core';
// Importe o seu componente de tabela reutilizável
import { DashboardTableComponent } from '../../../../shared/dashboard-table.component/dashboard-table.component'; // Ajuste o caminho
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Use apenas o DTO que a API retorna
import { ClienteResponseDTO } from '../../../../app/models/cliente/cliente.model';
import { ClienteService } from '../../../../app/services/cliente/cliente.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {EditClientComponent} from '../../../../shared/dialogs/edit-client/edit-client';
import {
  ConfirmationDialogComponent
} from '../../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dashboard-clientes',
  standalone: true,
  imports: [
    CommonModule,
    DashboardTableComponent,
    MatDialogModule
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
    this.clienteService.getClientes().subscribe({
      next: (dados) => {
        this.listaDeClientes = dados;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
        this.isLoading = false;
      }
    });
  }

  // ✅ 3. ESTA É A FUNÇÃO QUE FAZ A MÁGICA
  /**
   * É chamada quando o evento (editAction) é emitido pela tabela.
   * Navega para a página de detalhes do cliente selecionado.
   * @param cliente O objeto do cliente recebido do evento ($event).
   */
  handleEdit(cliente: ClienteResponseDTO): void {
    console.log('Navegando para os detalhes do cliente com ID:', cliente.id);

    // Usa o router para navegar para a rota dinâmica que criamos,
    // passando o ID do cliente como parâmetro.
    this.router.navigate(['/admin/dashboard/clientes', cliente.id]);
  }

  /**
   * É chamado quando o evento (deleteAction) é emitido pela tabela.
   * Abre um dialog de confirmação antes de excluir.
   * @param cliente O objeto do cliente a ser excluído.
   */
  handleDelete(cliente: ClienteResponseDTO): void {
    // 1. Abre o dialog de confirmação
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Tem certeza que deseja excluir o cliente "${cliente.nome}"? Esta ação não pode ser desfeita.` }
    });

    // 2. Ouve a resposta do dialog
    dialogRef.afterClosed().subscribe(result => {
      // 3. Se o usuário clicou em "Confirmar" (result === true)
      if (result === true) {
        // 4. Chama o serviço para deletar o cliente
        this.clienteService.deleteCliente(cliente.id).subscribe({
          next: () => {
            this.snackBar.open('Cliente excluído com sucesso!', 'Fechar', { duration: 3000 });
            // 5. Recarrega a lista para remover o item da tabela
            this.carregarClientes();
          },
          error: (err) => {
            console.error('Erro ao excluir cliente:', err);
            this.snackBar.open('Erro ao excluir o cliente. Tente novamente.', 'Fechar', { duration: 5000 });
          }
        });
      }
    });
  }
}
