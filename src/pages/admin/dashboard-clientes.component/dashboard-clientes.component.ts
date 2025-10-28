import {Component, inject, OnInit} from '@angular/core';
// Importe o seu componente de tabela reutilizável
import { DashboardTableComponent } from '../../../shared/dashboard-table.component/dashboard-table.component'; // Ajuste o caminho
import { CommonModule } from '@angular/common';
// Use apenas o DTO que a API retorna
import { ClienteResponseDTO } from '../../../app/models/cliente/cliente.model';
import { ClienteService } from '../../../app/services/cliente/cliente.service';

@Component({
  selector: 'app-dashboard-clientes',
  standalone: true,
  imports: [
    CommonModule,
    DashboardTableComponent // Mude o nome se o seu for diferente
  ],
  templateUrl: './dashboard-clientes.component.html',
  styleUrl: './dashboard-clientes.component.css'
})
export class DashboardClientesComponent implements OnInit {
  private clienteService = inject(ClienteService);

  // A lista deve ser do tipo que a API retorna: ClienteResponseDTO
  listaDeClientes: ClienteResponseDTO[] = [];
  isLoading = true;

  // ✅ ESTE É O SEU PAINEL DE CONTROLE: Defina aqui as colunas que quer ver.
  colunasVisiveisParaAdmin: string[] = ['id', 'nome', 'email', 'telefone', 'tipoCliente', 'dataCadastro'];
  nomesDasColunas: Record<string, string> = {
    id: 'Código',
    nome: 'Nome Completo',
    email: 'E-mail',
    telefone: 'Telefone',
    tipoCliente: 'Tipo de Cliente',
    dataCadastro: 'Data de Cadastro'
  };

  ngOnInit(): void {
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
}
