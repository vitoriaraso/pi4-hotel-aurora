import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  ClienteService,
  ClienteFisicoRequest,
  ClienteJuridicoRequest
} from '../../../app/services/cliente/cliente.service';
import { ViaCepService } from '../../../app/services/viacep/viacep.service';
import { ButtonComponent } from '../../../shared/button.component/button.component';
import { InputTextComponent } from '../../../shared/input-text.component/input-text.component';

/**
 * Validador customizado para verificar se um CNPJ é válido.
 * Implementa o algoritmo oficial de validação de CNPJ.
 */
export function cnpjValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cnpj = control.value;
    if (!cnpj) {
      return null; // Não valida valores vazios, deixa para o 'required'
    }

    // Remove todos os caracteres que não são dígitos
    const cnpjNumerico = cnpj.replace(/[^\d]+/g, '');

    // CNPJ deve ter 14 dígitos e não pode ser uma sequência de dígitos repetidos
    if (cnpjNumerico.length !== 14 || /^(\d)\1{13}$/.test(cnpjNumerico)) {
      return { cnpjInvalido: true };
    }

    // --- Cálculo do primeiro dígito verificador ---
    const pesosPrimeiroDigito = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = 0;
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpjNumerico.charAt(i)) * pesosPrimeiroDigito[i];
    }

    let resto = soma % 11;
    const digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

    // Verifica se o primeiro dígito calculado bate com o informado
    if (digitoVerificador1 !== parseInt(cnpjNumerico.charAt(12))) {
      return { cnpjInvalido: true };
    }

    // --- Cálculo do segundo dígito verificador ---
    const pesosSegundoDigito = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    soma = 0; // Zera a soma para o novo cálculo
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpjNumerico.charAt(i)) * pesosSegundoDigito[i];
    }

    resto = soma % 11;
    const digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

    // Verifica se o segundo dígito calculado bate com o informado
    if (digitoVerificador2 !== parseInt(cnpjNumerico.charAt(13))) {
      return { cnpjInvalido: true };
    }

    return null;
  };
}

/**
 * Validador customizado para verificar se os campos de senha e confirmação de senha coincidem.
 */
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('senha');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword || !password.value || !confirmPassword.value) {
    return null;
  }

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  } else {
    if (confirmPassword.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }
    return null;
  }
};

@Component({
  selector: 'app-create-account-pj',
  standalone: true,
  templateUrl: './create-account-pj.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ButtonComponent,
    InputTextComponent,
    //RouterLink,
  ],
  styleUrls: ['./create-account-pj.component.css']
})
export class CreateAccountPjComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private viaCepService = inject(ViaCepService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  formulario!: FormGroup;

  ngOnInit(): void {
    this.scrollToTop();
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      cnpj: ['', [Validators.required, cnpjValidator()]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]],
      cep: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{8}$/)], // Validadores síncronos
        [this.viaCepService.cepValidator()] // Validador assíncrono
      ],
      logradouro: [{ value: '', disabled: true }, [Validators.required]],
      numero: ['', [Validators.required]],
      bairro: [{ value: '', disabled: true }, [Validators.required]],
      complemento: [''],
      localidade: [{ value: '', disabled: true }, [Validators.required]],
      uf: [{ value: '', disabled: true }, [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  // Getters para fácil acesso aos controles no template
  get nome() { return this.formulario.get('nome'); }
  get cnpj() { return this.formulario.get('cnpj'); }
  get telefone() { return this.formulario.get('telefone'); }
  get email() { return this.formulario.get('email'); }
  get senha() { return this.formulario.get('senha'); }
  get confirmPassword() { return this.formulario.get('confirmPassword'); }
  get cep() { return this.formulario.get('cep'); }
  get logradouro() { return this.formulario.get('logradouro'); }
  get numero() { return this.formulario.get('numero'); }
  get bairro() { return this.formulario.get('bairro'); }
  get localidade() { return this.formulario.get('localidade'); }
  get uf() { return this.formulario.get('uf'); }

  consultarCep(): void {
    const cepControl = this.cep;
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

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.snackBar.open('Por favor, corrija os erros no formulário.', 'Fechar', { duration: 3000 });
      return;
    }

    const requestData: ClienteJuridicoRequest = this.formulario.getRawValue();

    this.clienteService.cadastrarClienteJuridico(requestData).subscribe({
      next: (msg: any) => {
        
        this.snackBar.open(
          'Cadastro realizado com sucesso! Redirecionando para a página de login...',
          'Fechar',
          { duration: 2000 }
        );
        setTimeout(() => {
          this.router.navigate(['/auth/login/pj']);
        }, 3000);
      },
      error: (err) => {
        console.error('Erro no cadastro:', err.error.message);
        this.snackBar.open(
          'Ops! Parece que há um problema com algumas informações. Revise os dados e tente novamente.',
          'Fechar',
          { duration: 3000 }
        );
      },
    });


  }

  
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

