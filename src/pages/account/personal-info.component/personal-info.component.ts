import { Component, inject, OnInit } from '@angular/core';
import { ClienteService } from '../../../app/services/cliente/cliente.service';
import { ViaCepService } from '../../../app/services/viacep/viacep.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteResponseDTO, ClienteUpdateRequest, TipoCliente } from '../../../app/models/cliente/cliente.model';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/button.component/button.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';
import { JwtService } from '../../../app/jwt/jwt.service';

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

  cpfCnpjMask = '000.000.000-00';
  isPessoaFisica = true;

  formulario!: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      telefone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpfCnpj: new FormControl('', [
        Validators.required,
        this.cpfCnpjValidator()
      ]),
      cep: new FormControl(
        '',
        [Validators.required, Validators.pattern(/^[0-9]{8}$/)],
        [this.viaCepService.cepValidator()]
      ),
      logradouro: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      numero: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
      complemento: new FormControl('', [Validators.maxLength(100)]),
      bairro: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      localidade: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      uf: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern(/^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/)])
    });
  }

  // --- Funções de Validação de CPF e CNPJ ---
  private isValidCpf(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  private isValidCnpj(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]/g, "");
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(1))) return false;

    return true;
  }

  private cpfCnpjValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const cleanedValue = value.replace(/[^\d]/g, "");

      if (this.isPessoaFisica) {
        if (cleanedValue.length !== 11) return { tamanhoInvalido: true };
        return this.isValidCpf(cleanedValue) ? null : { cpfInvalido: true };
      } else {
        if (cleanedValue.length !== 14) return { tamanhoInvalido: true };
        return this.isValidCnpj(cleanedValue) ? null : { cnpjInvalido: true };
      }
    };
  }

  // --- Getters e Métodos do Componente ---

  get nome() { return this.formulario.get('nome'); }
  get telefone() { return this.formulario.get('telefone'); }
  get email() { return this.formulario.get('email'); }
  get cpfCnpj() { return this.formulario.get('cpfCnpj'); }
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
    const clienteId = this.jwtService.getTokenId();

    if (clienteId !== null) {
      this.clienteService.getClienteById(clienteId).subscribe({
        next: (dados) => {
          this.cliente = dados;

          this.isPessoaFisica = dados.tipoCliente === TipoCliente.FISICA;
          this.cpfCnpjMask = this.isPessoaFisica ? '000.000.000-00' : '00.000.000/0000-00';

          const identificador = this.isPessoaFisica ? dados.cpf : dados.cnpj;

          this.formulario.patchValue({
            ...dados,
            cpfCnpj: identificador,
          });

          this.cpfCnpj?.updateValueAndValidity();
        },
        error: (erro) => {
          console.error('Ocorreu um erro ao buscar os dados do cliente:', erro);
          this.snackBar.open('Não foi possível carregar seus dados.', 'Fechar', { duration: 3000 });
        }
      });
    } else {
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
    // Remove pontuação/máscara do identificador para enviar apenas números
    const identificadorLimpo = (formValues.cpfCnpj as string).replace(/[^\d]/g, "");

    // 💡 Usa 'undefined' para omitir o campo não usado do JSON
    const cpfValue = this.isPessoaFisica ? identificadorLimpo : undefined;
    const cnpjValue = this.isPessoaFisica ? undefined : identificadorLimpo;

    // Criamos o objeto base da requisição com o campo CPF ou CNPJ definido como 'undefined'
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
      uf: formValues.uf ?? '',

      // Mapeamento. O campo não utilizado será 'undefined'
      cpf: cpfValue as (string | null | undefined),
      cnpj: cnpjValue as (string | null | undefined),
    };

    // 🏆 Filtra o objeto para remover campos com valor 'undefined', garantindo que o JSON
    // final contenha APENAS 'cpf' OU 'cnpj', mas nunca ambos.
    const requestBody = Object.fromEntries(
      Object.entries(updateRequest).filter(([, value]) => value !== undefined)
    ) as ClienteUpdateRequest;

    this.clienteService.atualizarCliente(this.cliente.id, this.cliente.tipoCliente, requestBody)
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
    if (!cepControl || cepControl.invalid || !cepControl.value) { return; }
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
