import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClienteService, ClienteResponseDTO, ClienteUpdateRequest, TipoCliente } from '../../app/services/cliente.service';

import { ButtonComponent } from '../../shared/button.component/button.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  cliente?: ClienteResponseDTO;
  // variáveis para controlar o modo de edição
  isEditing = false;
  editButtonLabel = 'Editar';
  icon = 'edit';

  // injetando o ClienteService
  private clienteService = inject(ClienteService);

  ngOnInit() {
    this.carregarDadosDoCliente();
  }

  private carregarDadosDoCliente() {
    // TODO: pegar id do login
    const clienteId = 1;
    console.log(`Get cliente com id: ${clienteId}`);

    // "subscribe" -> escuta a resposta da API
    this.clienteService.getClienteById(clienteId).subscribe({
      // "next" -> executado quando a API responde com sucesso
      next: (dados) => {
        // TODO: respostas da API, 200, 409 etc os caraio q o erick implementou meu deus af
        this.cliente = dados;
        console.log('Dados do cliente recebidos:', this.cliente);
      },
      // "error" -> se ocorrer algum problema na chamada
      error: (erro) => {
        console.error('Ocorreu um erro ao buscar os dados do cliente:', erro);
      }
    });
  }

  toggleInfoEdit(): void {
    this.isEditing = !this.isEditing;

    if (!this.isEditing && this.cliente) {
      this.atualizarDadosDoCliente();
    } else {
      this.atualizarEstadoDoBotao();
    }
  }

  private atualizarDadosDoCliente(): void {
    if (!this.cliente) {
      console.error("Dados do cliente não carregados");
      return;
    }

    const updateRequest: ClienteUpdateRequest = {
      nome: this.cliente.nome,
      email: this.cliente.email,
      telefone: this.cliente.telefone,
      cep: this.cliente.cep,
      logradouro: this.cliente.logradouro,
      numero: this.cliente.numero,
      complemento: this.cliente.complemento || '',
      bairro: this.cliente.bairro,
      localidade: this.cliente.localidade,
      uf: this.cliente.uf
    };

    // chama o serviço com os parâmetros necessários
    this.clienteService.atualizarCliente(this.cliente.id, this.cliente.tipoCliente, updateRequest)
      .subscribe({
        next: () => {
          console.log('Cliente atualizado com sucesso!');
          this.atualizarEstadoDoBotao();
        },
        error: (erro) => {
          console.error('Falha ao atualizar o cliente:', erro);
          this.isEditing = true;
        }
      });
  }

  private atualizarEstadoDoBotao(): void {
    this.editButtonLabel = this.isEditing ? 'Salvar' : 'Editar';
    this.icon = this.isEditing ? 'save' : 'edit';
  }
}
