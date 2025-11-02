import { Component, inject, OnInit } from '@angular/core';
import { ClienteService } from '../../../app/services/cliente/cliente.service';
import { ViaCepService } from '../../../app/services/viacep/viacep.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteResponseDTO, ClienteUpdateRequest } from '../../../app/models/cliente/cliente.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/button.component/button.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';
import { jwtDecode } from 'jwt-decode';
import {JwtService} from '../../../app/jwt/jwt.service';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private viaCepService = inject(ViaCepService);
  private snackBar = inject(MatSnackBar);
  private jwtService = inject(JwtService);

  cliente?: ClienteResponseDTO;

  isEditing = false;
  editButtonLabel = 'Editar';
  icon = 'edit';
  private initialFormValue: string = '';

  formulario!: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      telefone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cep: new FormControl(
        '',
        [Validators.required, Validators.pattern(/^[0-9]{8}$/)], // Validadores Síncronos
        [this.viaCepService.cepValidator()] // Validador Assíncrono
      ),
      logradouro: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      numero: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
      complemento: new FormControl('', [Validators.maxLength(100)]),
      bairro: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      localidade: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      uf: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern(/^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/)])
    });
  }

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
    this.formulario.disable();
  }

  private carregarDadosDoCliente() {
    // Pega o ID síncrono do seu novo JwtService
    const clienteId = this.jwtService.getTokenId();

    // Verifica se o ID foi encontrado
    if (clienteId !== null) {
      // Se sim, chama o ClienteService (assíncrono) com esse ID
      this.clienteService.getClienteById(clienteId).subscribe({
        next: (dados) => {
          this.cliente = dados;
          this.formulario.patchValue(dados);
          console.log('Dados do cliente recebidos:', this.cliente);
        },
        error: (erro) => {
          console.error('Ocorreu um erro ao buscar os dados do cliente:', erro);
          this.snackBar.open('Não foi possível carregar seus dados.', 'Fechar', { duration: 3000 });
        }
      });
    } else {
      // Se não houver ID, informa o erro
      console.error('ID do cliente não encontrado no token.');
      this.snackBar.open('Erro de autenticação. Tente fazer login novamente.', 'Fechar', { duration: 5000 });
    }
  }

  toggleInfoEdit(): void {
    if (!this.isEditing) {
      this.isEditing = true;
      this.initialFormValue = JSON.stringify(this.formulario.getRawValue());

      this.formulario.enable();
      this.formulario.markAsPristine();

      this.formulario.controls["logradouro"].disable();
      this.formulario.controls["bairro"].disable();
      this.formulario.controls["localidade"].disable();
      this.formulario.controls["uf"].disable();

      this.atualizarEstadoDoBotao();
      return;
    }

    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      console.log('Formulário inválido, não é possível salvar.');
      return;
    }

    const currentFormValue = JSON.stringify(this.formulario.getRawValue());
    if (this.initialFormValue === currentFormValue) {
      console.log('Nenhuma alteração detectada. Saindo do modo de edição.');
      this.isEditing = false;
      this.formulario.disable();
      this.atualizarEstadoDoBotao();
      return;
    }

    console.log('Alterações detectadas, salvando dados...');
    this.atualizarDadosDoCliente();
  }

  private atualizarDadosDoCliente(): void {
    if (!this.cliente) {
      console.error("Dados do cliente não carregados");
      return;
    }

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
          this.isEditing = false;
          this.formulario.disable();
          this.atualizarEstadoDoBotao();

          this.snackBar.open('Dados atualizados com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        error: (erro) => {
          console.error('Erro ao atualizar cliente:', erro);
          this.snackBar.open('Ops! Parece que há um problema com algumas informações. Revise os dados e tente novamente.', 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      });
  }

  private atualizarEstadoDoBotao(): void {
    this.editButtonLabel = this.isEditing ? 'Salvar' : 'Editar';
    this.icon = this.isEditing ? 'save' : 'edit';
  }

  consultarCep(): void {
    const cepControl = this.formulario.get('cep');
    if (!cepControl || cepControl.invalid || !cepControl) { return; }

    const cep = cepControl.value;

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
