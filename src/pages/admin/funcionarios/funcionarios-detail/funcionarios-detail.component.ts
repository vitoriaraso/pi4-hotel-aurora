import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';
import { Observable } from 'rxjs';

import { ButtonComponent } from '../../../../shared/button.component/button.component';
import {
  CargoFuncionario,
  CargoFuncionarioLabel,
  FuncionarioResponseDTO,
  FuncionarioService,
  FuncionarioUpdateRequest
} from '../../../../app/services/funcionario/funcionario.service';

@Component({
  selector: 'app-funcionario-detail',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, RouterLink,
    MatIconModule, NgxMaskDirective, ButtonComponent
  ],
  templateUrl: './funcionarios-detail.component.html',
  styleUrl: '../../css-componente-detail/detail.component.css',
})
export class FuncionariosDetailComponent implements OnInit {
  private funcionarioService = inject(FuncionarioService);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);

  funcionario?: FuncionarioResponseDTO;
  isEditing = false;
  editButtonLabel = 'Editar';
  icon = 'edit';

  cargos = Object.values(CargoFuncionario);
  cargoLabels = CargoFuncionarioLabel;

  formulario!: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [
        Validators.required,
        this.cpfValidator()
      ]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  // Getters para os campos
  get nome() { return this.formulario.get('nome'); }
  get email() { return this.formulario.get('email'); }
  get cpf() { return this.formulario.get('cpf'); }
  get telefone() { return this.formulario.get('telefone'); }
  get cargo() { return this.formulario.get('cargo'); }

  ngOnInit() {
    this.carregarDadosDoFuncionario();
    this.formulario.disable();
  }

  /**
   * Lê o ID (paramMap) e o status (queryParamMap) para chamar o serviço correto.
   */
  private carregarDadosDoFuncionario() {
    // 1. Pega o ID da rota
    const funcionarioIdString = this.route.snapshot.paramMap.get('id');
    // 2. Pega o Status da URL
    const status = this.route.snapshot.queryParamMap.get('status');

    if (funcionarioIdString) {
      const funcionarioId = Number(funcionarioIdString);

      // 3. Define qual Observable (chamada de API) será usado
      let observable: Observable<FuncionarioResponseDTO>;

      if (status === 'inativo') {
        observable = this.funcionarioService.getInativoById(funcionarioId);
      } else {
        observable = this.funcionarioService.getAtivoById(funcionarioId);
      }

      // 4. Se inscreve no Observable escolhido
      observable.subscribe({
        next: (dados) => {
          this.funcionario = dados;
          this.formulario.patchValue(dados);
        },
        error: (erro) => this.snackBar.open('Funcionário não encontrado.', 'Fechar', { duration: 5000 })
      });
    }
  }

  toggleInfoEdit(): void {
    if (!this.isEditing) {
      this.isEditing = true;
      this.formulario.enable();
    } else {
      if (this.formulario.invalid) {
        this.snackBar.open('Formulário inválido.', 'Fechar', { duration: 3000 });
        return;
      }
      this.atualizarDadosDoFuncionario();
    }
    this.atualizarEstadoDoBotao();
  }

  private atualizarDadosDoFuncionario(): void {
    if (!this.funcionario) { return; }

    const updateRequest: FuncionarioUpdateRequest = this.formulario.getRawValue();

    this.funcionarioService.atualizarFuncionario(this.funcionario.id, updateRequest)
      .subscribe({
        next: () => {
          this.snackBar.open('Dados atualizados com sucesso!', 'Fechar', { duration: 3000 });
          this.isEditing = false;
          this.formulario.disable();
          this.atualizarEstadoDoBotao();
        },
        error: (erro) => {
          if (erro.error.status === 403) {
            this.snackBar.open('Você não possui priviégios para essa função.', 'Fechar', { duration: 5000 });
          } else {
            console.error('Erro ao atualizar funcionário:', erro);
            this.snackBar.open('Erro ao atualizar os dados.', 'Fechar', {duration: 5000});
          }
        }
      });
  }

  private atualizarEstadoDoBotao(): void {
    this.editButtonLabel = this.isEditing ? 'Salvar' : 'Editar';
    this.icon = this.isEditing ? 'save' : 'edit';
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
