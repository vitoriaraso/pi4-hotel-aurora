import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextComponent } from '../../shared/input-text.component/input-text.component';
import { ButtonComponent } from '../../shared/button.component/button.component';

import { ClienteService, ClienteFisicoRequest } from '../../app/services/cliente/cliente.service';

@Component({
  selector: 'app-create-account-pf',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    RouterLink,
    InputTextComponent
  ],
  templateUrl: './create-account-pf.html',
  styleUrl: './create-account-pf.css'
})
export class CreateAccountPF {
    // objeto para armazenar os dados do formulário
  formData: ClienteFisicoRequest = {
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    cpf: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: ''
  };

  private clienteService = inject(ClienteService);
  private router = inject(Router);

  onSubmit(): void {
    console.log('Enviando dados para a API:', this.formData);

    this.clienteService.cadastrarClienteFisico(this.formData).subscribe({
      next: () => {
        // TODO: melhorar isso aqui
        alert('Conta criada com sucesso');
        // redireciona a página de login
        this.router.navigate(['/account/signup']);
      },
      error: (error) => {
        console.log('Ocorreu um erro:', error);
        // TODO: melhorar isso aqui
        alert(`Erro ao criar conta: ${error.error.message}`);
        }
    })
  }
}
