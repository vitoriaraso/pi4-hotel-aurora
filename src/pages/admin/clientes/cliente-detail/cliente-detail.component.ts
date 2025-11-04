import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';
import { ButtonComponent } from '../../../../shared/button.component/button.component';
import {
  ClienteResponseDTO,
  ClienteService,
  ClienteUpdateRequest
} from '../../../../app/services/cliente/cliente.service';
import { ViaCepService } from '../../../../app/services/viacep/viacep.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    MatIconModule,
    NgxMaskDirective,
    ButtonComponent
  ],
  templateUrl: './cliente-detail.component.html',
  styleUrl: '../../css-componente-detail/detail.component.css',
})
export class ClienteDetailComponent implements OnInit {
  // Injeção de dependências
  private clienteService = inject(ClienteService);
  private viaCepService = inject(ViaCepService);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);

  // Propriedades do componente
  cliente?: ClienteResponseDTO;
  isEditing = false;
  editButtonLabel = 'Editar';
  icon = 'edit';
  private initialFormValue: string = '';
  formulario!: FormGroup;

  constructor() {
    // Criação do formulário (lógica idêntica à do PersonalInfoComponent)
    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      telefone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cep: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]),
      logradouro: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      numero: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
      complemento: new FormControl('', [Validators.maxLength(100)]),
      bairro: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      localidade: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      uf: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern(/^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/)])
    });
  }

  // Getters para facilitar o acesso no template
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

  ngOnInit() {
    this.carregarDadosDoCliente();
    this.formulario.disable(); // O formulário começa em modo de visualização
  }

  private carregarDadosDoCliente() {
    // 1. Pega o ID (parâmetro da rota)
    const clienteIdString = this.route.snapshot.paramMap.get('id');

    // 2. Pega o Status (parâmetro de consulta)
    const status = this.route.snapshot.queryParamMap.get('status');

    if (clienteIdString) {
      const clienteId = Number(clienteIdString);

      // 3. Define qual Observable (chamada de API) será usado
      let observable: Observable<ClienteResponseDTO>;

      if (status === 'inativo') {
        // Se a URL for "...?status=inativo"
        console.log(`Buscando cliente INATIVO com ID: ${clienteId}`);
        observable = this.clienteService.getInativoById(clienteId);
      } else {
        // Se a URL for "...?status=ativo" ou não tiver parâmetro
        console.log(`Buscando cliente ATIVO com ID: ${clienteId}`);
        observable = this.clienteService.getClienteById(clienteId);
      }

      // 4. Se inscreve no Observable que foi escolhido
      observable.subscribe({
        next: (dados) => {
          this.cliente = dados;
          this.formulario.patchValue(dados);
        },
        error: (erro) => {
          console.error('Ocorreu um erro ao buscar os dados do cliente:', erro);
          this.snackBar.open('Cliente não encontrado (ativo ou inativo).', 'Fechar', { duration: 5000 });
        }
      });
    }
  }

  toggleInfoEdit(): void {
    if (!this.isEditing) {
      // Entrando no modo de edição
      this.isEditing = true;
      this.initialFormValue = JSON.stringify(this.formulario.getRawValue());
      this.formulario.enable();
      this.formulario.markAsPristine();
      // Mantém os campos de endereço desabilitados
      this.formulario.controls["logradouro"].disable();
      this.formulario.controls["bairro"].disable();
      this.formulario.controls["localidade"].disable();
      this.formulario.controls["uf"].disable();
      this.atualizarEstadoDoBotao();
      return;
    }

    // Saindo do modo de edição (clicando em Salvar)
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) { return; }

    const currentFormValue = JSON.stringify(this.formulario.getRawValue());
    if (this.initialFormValue === currentFormValue) {
      // Nenhuma mudança, apenas sai do modo de edição
      this.isEditing = false;
      this.formulario.disable();
      this.atualizarEstadoDoBotao();
      return;
    }

    // Houve mudanças, então salva os dados
    this.atualizarDadosDoCliente();
  }

  private atualizarDadosDoCliente(): void {
    if (!this.cliente) { return; }

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
          this.snackBar.open('Dados atualizados com sucesso!', 'Fechar', { duration: 3000 });
          this.isEditing = false;
          this.formulario.disable();
          this.atualizarEstadoDoBotao();
        },
        error: (erro) => {
          console.error('Erro ao atualizar cliente:', erro);
          this.snackBar.open('Erro ao atualizar os dados. Tente novamente.', 'Fechar', { duration: 5000 });
        }
      });
  }

  private atualizarEstadoDoBotao(): void {
    this.editButtonLabel = this.isEditing ? 'Salvar' : 'Editar';
    this.icon = this.isEditing ? 'save' : 'edit';
  }

  consultarCep(): void {
    const cepControl = this.cep;
    if (!cepControl || cepControl.invalid || !cepControl.value) { return; }
    const cep = cepControl.value.replace(/\D/g, '');
    this.viaCepService.consultarCep(cep).subscribe({
      next: (dados) => {
        if (!dados.erro) {
          this.formulario.patchValue({
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            localidade: dados.localidade,
            uf: dados.uf
          });
        }
      }
    });
  }
}
