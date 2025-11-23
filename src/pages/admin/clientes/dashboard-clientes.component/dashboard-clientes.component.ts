import {Component, inject, OnInit} from '@angular/core';
// Importe o seu componente de tabela reutilizável
import { DashboardTableComponent } from '../../../../shared/dashboard-table.component/dashboard-table.component'; // Ajuste o caminho
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Use apenas o DTO que a API retorna
import { ClienteResponseDTO } from '../../../../app/models/cliente/cliente.model';
import { ClienteService } from '../../../../app/services/cliente/cliente.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import {
  ConfirmationDialogComponent
} from '../../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';

interface ClienteTabelaDTO extends ClienteResponseDTO {
  cpfCnpj: string; // Coluna unificada
  ativoTexto: string; // Coluna Ativo/Inativo para a tabela
}

function formatCpfCnpj(identificador: string): string {
  // 1. Remove caracteres não numéricos
  identificador = identificador.replace(/[^\d]/g, '');

  const length = identificador.length;

  if (length === 11) {
    // 2. Formatação para CPF: 000.000.000-00
    return identificador.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  if (length === 14) {
    // 3. Formatação para CNPJ: 00.000.000/0000-00
    return identificador.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  // 4. Retorna o original (limpo) se o tamanho for inválido para CPF/CNPJ
  return identificador;
}

@Component({
  selector: 'app-dashboard-clientes',
  standalone: true,
  imports: [
    CommonModule,
    DashboardTableComponent,
    MatDialogModule,
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
  listaDeClientes: ClienteTabelaDTO[] = [];
  isLoading = true;

  colunasVisiveisParaAdmin: string[] = ['id', 'nome', 'cpfCnpj', 'email', 'tipoCliente', 'dataCadastro'];
  nomesDasColunas: Record<string, string> = {
    id: 'Código',
    nome: 'Nome Completo',
    cpfCnpj: 'CPF/CNPJ', // Novo nome da coluna
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
        // 3. 🎯 Mudança: Mapear os dados para criar a coluna unificada 'cpfCnpj'
        this.listaDeClientes = dados.map(cliente => {
          // Determina se é PF ou PJ e pega o identificador correto
          const identificador = cliente.cpf || cliente.cnpj || '';

          let cpfCnpjFormatado = 'N/A';
          if (identificador) {
            // Aplica a formatação manual
            cpfCnpjFormatado = formatCpfCnpj(identificador);
          }

          return {
            ...cliente,
            cpfCnpj: cpfCnpjFormatado, // Novo campo unificado
            ativoTexto: cliente.ativo ? 'Ativo' : 'Inativo' // Mantém o status em texto
          } as ClienteTabelaDTO;
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
        this.isLoading = false;
        this.snackBar.open('Não foi possível carregar a lista de clientes.', 'Fechar', { duration: 5000 });
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
