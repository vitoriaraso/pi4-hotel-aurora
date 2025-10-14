// account.component.ts

import { Component, OnInit, inject } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClienteService, ClienteResponseDTO, ClienteUpdateRequest, TipoCliente } from '../../app/services/cliente/cliente.service';

import { ButtonComponent } from '../../shared/button.component/button.component';
import { MatIconModule } from '@angular/material/icon';
import {ViaCepService} from '../../app/services/viacep/viacep.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  // O FormGroup não precisa mais da propriedade 'disabled' aqui.
  // Vamos controlar isso dinamicamente.
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    telefone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cep: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]),
    logradouro: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
    numero: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
    complemento: new FormControl('', [Validators.maxLength(100)]),
    bairro: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
    localidade: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    uf: new FormControl('', [Validators.required, Validators.pattern(/^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/)])
  });

  get nome() { return this.formulario.get('nome'); }
  get telefone() { return this.formulario.get('telefone'); }
  get email() { return this.formulario.get('email'); }
  get cep() { return this.formulario.get('cep'); }
  get logradouro() { return this.formulario.get('logradouro'); }
  get numero() { return this.formulario.get('numero'); }
  get complemento() { return this.formulario.get('complemento'); }
  get bairro() { return this.formulario.get('bairro'); }
  get localidade() { return this.formulario.get('localidade'); }
  get uf() { return this.formulario.get('uf'); }

  isEditing = false;
  editButtonLabel = 'Editar';
  icon = 'edit';
  cliente?: ClienteResponseDTO;

  private clienteService = inject(ClienteService);
  private viaCepService = inject(ViaCepService);

  ngOnInit() {
    this.carregarDadosDoCliente();
    // Inicia o formulário como desabilitado
    this.formulario.disable(); // ✅ BOA PRÁTICA
  }

  private carregarDadosDoCliente() {
    const clienteId = 1;
    this.clienteService.getClienteById(clienteId).subscribe({
      next: (dados) => {
        this.cliente = dados;
        this.formulario.patchValue(dados);
        console.log('Dados do cliente recebidos:', this.cliente);
      },
      error: (erro) => {
        console.error('Ocorreu um erro ao buscar os dados do cliente:', erro);
      }
    });
  }

  // LÓGICA PRINCIPAL MODIFICADA AQUI 👇
  toggleInfoEdit(): void {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      // Entrando no modo de edição
      this.formulario.enable(); // Habilita todos os campos

      // Se alguns campos NUNCA devem ser editáveis, desabilite-os aqui
      this.formulario.controls.logradouro.disable();
      this.formulario.controls.bairro.disable();
      this.formulario.controls.localidade.disable();
      this.formulario.controls.uf.disable();

      this.atualizarEstadoDoBotao();
    } else {
      // Saindo do modo de edição (clicando em Salvar)
      if (this.formulario.valid) {
        console.log('Formulário válido, tentando salvar...');
        this.atualizarDadosDoCliente();
      } else {
        console.log('Formulário inválido, não é possível salvar.');

        // Força o formulário a mostrar os erros de validação
        this.formulario.markAllAsTouched();
        // Importante: Não saia do modo de edição se o formulário for inválido
        this.isEditing = true;
      }
    }
  }

  private atualizarDadosDoCliente(): void {
    if (!this.cliente) {
      console.error("Dados do cliente não carregados");
      return;
    }

    // Usamos 'getRawValue()' para pegar valores de campos desabilitados também (como logradouro, etc.)
    const formValues = this.formulario.getRawValue();

    const updateRequest: ClienteUpdateRequest = {
      nome: formValues.nome ?? '',
      email: formValues.email ?? '',
      telefone: formValues.telefone ?? '',
      cep: formValues.cep ?? '',
      logradouro: formValues.logradouro ?? '',
      numero: formValues.numero ?? '',
      complemento: formValues.complemento ?? '',
      bairro: formValues.bairro ?? '',
      localidade: formValues.localidade ?? '',
      uf: formValues.uf ?? ''
    };

    this.clienteService.atualizarCliente(this.cliente.id, this.cliente.tipoCliente, updateRequest)
      .subscribe({
        next: () => {
          console.log('Cliente atualizado com sucesso!');
          this.formulario.disable(); // Desabilita o formulário após salvar
          this.atualizarEstadoDoBotao();
          alert('Dados atualizados com sucesso');
        },
        error: (erro) => {
          console.error('Erro ao atualizar cliente:', erro);
          // Mantenha o formulário em modo de edição para o usuário corrigir
          this.isEditing = true;
        }
      });
  }

  private atualizarEstadoDoBotao(): void {
    this.editButtonLabel = this.isEditing ? 'Salvar' : 'Editar';
    this.icon = this.isEditing ? 'save' : 'edit';
  }

  consultarCep(): void {
    const cepValue = this.formulario.get('cep')?.value;

    // Remove caracteres não numéricos e verifica o tamanho
    const cep = cepValue ? cepValue.replace(/\D/g, '') : '';
    if (cep.length !== 8) {
      console.log('CEP inválido ou incompleto.');
      return; // Sai da função se o CEP não tiver 8 dígitos
    }

    // Chama o serviço
    this.viaCepService.consultarCep(cep).subscribe({
      next: (dados) => {
        // A API do ViaCEP retorna {erro: true} para CEPs não encontrados
        if (dados.erro) {
          console.error('CEP não encontrado.');
          // Aqui você pode limpar os campos ou mostrar uma mensagem de erro
          this.formulario.patchValue({
            logradouro: '',
            bairro: '',
            localidade: '',
            uf: ''
          });
          return;
        }

        console.log('Dados recebidos do ViaCEP:', dados);

        // Preenche os campos do formulário com os dados recebidos
        this.formulario.patchValue({
          logradouro: dados.logradouro,
          bairro: dados.bairro,
          localidade: dados.localidade,
          uf: dados.uf
        });
      },
      error: (erro) => {
        console.error('Ocorreu um erro ao buscar o CEP:', erro);
      }
    });
  }

}
