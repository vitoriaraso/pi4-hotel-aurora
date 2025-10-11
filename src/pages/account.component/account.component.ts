import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClienteService, ClienteResponseDTO, ClienteUpdateRequest } from '../../app/services/cliente.service';

import { ButtonComponent } from '../../shared/button.component/button.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-account.component',
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
    this.editButtonLabel = this.isEditing ? 'Salvar' : 'Editar';
    this.icon = this.isEditing ? 'save' : 'edit';

    if (!this.isEditing && this.cliente) {
      // TODO: botar o PUT aqui quando o usuário clicar em salvar
    }
  }
}
