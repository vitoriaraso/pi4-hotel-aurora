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
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  ClienteService,
  ClienteFisicoRequest,
} from '../../../app/services/cliente/cliente.service';
import { ViaCepService } from '../../../app/services/viacep/viacep.service';
import { ButtonComponent } from '../../../shared/button.component/button.component';
import { InputTextComponent } from '../../../shared/input-text.component/input-text.component';

/**
 * Validador customizado para verificar se um CPF é válido.
 */
export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value;
    if (!cpf) {
      return null; // Não valida valores vazios, deixa para o 'required'
    }

    const cpfNumerico = cpf.replace(/[^\d]+/g, '');

    if (cpfNumerico.length !== 11 || /^(\d)\1{10}$/.test(cpfNumerico)) {
      return { cpfInvalido: true };
    }

    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpfNumerico.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpfNumerico.substring(9, 10))) {
      return { cpfInvalido: true };
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpfNumerico.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpfNumerico.substring(10, 11))) {
      return { cpfInvalido: true };
    }

    return null; // CPF válido
  };
}

/**
 * Validador customizado para verificar se os campos de senha e confirmação de senha coincidem.
 */
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
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
  selector: 'app-create-account-pf',
  standalone: true,
  templateUrl: './create-account-pf.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ButtonComponent,
    InputTextComponent,
    RouterLink,
  ],
  styleUrls: ['./create-account-pf.component.css'],
})
export class CreateAccountPfComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private viaCepService = inject(ViaCepService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  formulario!: FormGroup;

  ngOnInit(): void {
    this.formulario = this.fb.group(
      {
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
        cpf: ['', [Validators.required, cpfValidator()]],
        telefone: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        senha: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        cep: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{8}$/)], // Validadores síncronos
          [this.viaCepService.cepValidator()], // Validador assíncrono
        ],
        logradouro: [{ value: '', disabled: true }, [Validators.required]],
        numero: ['', [Validators.required]],
        bairro: [{ value: '', disabled: true }, [Validators.required]],
        complemento: [''],
        localidade: [{ value: '', disabled: true }, [Validators.required]],
        uf: [{ value: '', disabled: true }, [Validators.required]],
      },
      { validators: passwordMatchValidator }
    );
  }

  // Getters para fácil acesso aos controles no template
  get nome() {
    return this.formulario.get('nome');
  }
  get cpf() {
    return this.formulario.get('cpf');
  }
  get telefone() {
    return this.formulario.get('telefone');
  }
  get email() {
    return this.formulario.get('email');
  }
  get senha() {
    return this.formulario.get('senha');
  }
  get confirmPassword() {
    return this.formulario.get('confirmPassword');
  }
  get cep() {
    return this.formulario.get('cep');
  }
  get logradouro() {
    return this.formulario.get('logradouro');
  }
  get numero() {
    return this.formulario.get('numero');
  }
  get bairro() {
    return this.formulario.get('bairro');
  }
  get localidade() {
    return this.formulario.get('localidade');
  }
  get uf() {
    return this.formulario.get('uf');
  }

  consultarCep(): void {
    const cepControl = this.cep;
    if (!cepControl || cepControl.invalid || !cepControl) {
      return;
    }

    const cep = cepControl.value;

    this.viaCepService.consultarCep(cep).subscribe({
      next: (dados) => {
        if (!dados.erro) {
          this.formulario.patchValue({
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            localidade: dados.localidade,
            uf: dados.uf,
          });
        }
      },
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.snackBar.open('Por favor, corrija os erros no formulário.', 'Fechar', {
        duration: 3000,
      });
      return;
    }

    const requestData: ClienteFisicoRequest = this.formulario.getRawValue();

    this.clienteService.cadastrarClienteFisico(requestData).subscribe({
      next: (msg: any) => {
        
        this.snackBar.open(
          'Cadastro realizado com sucesso! Redirecionando para a página de login...',
          'Fechar',
          { duration: 2000 }
        );
        setTimeout(() => {
          this.router.navigate(['/auth/login/pf']);
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
}
