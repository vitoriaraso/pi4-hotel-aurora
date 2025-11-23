import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';

import { ButtonComponent } from '../../../../shared/button.component/button.component';
import {
  CargoFuncionario, CargoFuncionarioLabel,
  FuncionarioRequest,
  FuncionarioService
} from '../../../../app/services/funcionario/funcionario.service';
import {cpfValidator} from '../../../create-account/create-account-pf.component/create-account-pf.component';

@Component({
  selector: 'app-create-funcionario',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink, MatIconModule,
    NgxMaskDirective, ButtonComponent
  ],
  templateUrl: './create-funcionario.component.html',
  styleUrls: ['../../css-componente-detail/detail.component.css']
})
export class CreateFuncionarioComponent implements OnInit {
  private fb = inject(FormBuilder);
  private funcionarioService = inject(FuncionarioService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  formulario!: FormGroup;

  cargos = Object.values(CargoFuncionario);
  cargoLabels = CargoFuncionarioLabel;

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      cargo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      cpf: ['', [Validators.required, cpfValidator()]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      id_hotel: [1, [Validators.required]] // Exemplo com ID fixo
    });
  }

  // Getters para os campos
  get nome() { return this.formulario.get('nome'); }
  get cargo() { return this.formulario.get('cargo'); }
  get cpf() { return this.formulario.get('cpf'); }
  get email() { return this.formulario.get('email'); }
  get telefone() { return this.formulario.get('telefone'); }
  get senha() { return this.formulario.get('senha'); }

  onSubmit(): void {
    console.log('Submit acionado');
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.snackBar.open('Por favor, corrija os erros no formulário.', 'Fechar', { duration: 3000 });
      return;
    }

    const requestData: FuncionarioRequest = this.formulario.getRawValue();

    this.funcionarioService.cadastrarFuncionario(requestData).subscribe({
      next: () => {
        this.snackBar.open('Funcionário cadastrado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/admin/dashboard/funcionarios']); // Redireciona de volta para a lista
      },
      error: (err) => {
        console.error('Erro no cadastro:', err);
        this.snackBar.open('Erro ao cadastrar funcionário. Tente novamente.', 'Fechar', { duration: 5000 });
      }
    });
  }

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

  private cpfValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const cleanedValue = value.replace(/[^\d]/g, "");

        if (cleanedValue.length !== 11) return { tamanhoInvalido: true };
        return this.isValidCpf(cleanedValue) ? null : { cpfInvalido: true };
    };
  }

}
