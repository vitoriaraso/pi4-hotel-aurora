// src/app/dialogs/edit-client-dialog/edit-client-dialog.component.ts

import { Component, OnInit, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

// Imports do Material Dialog
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';
import {ClienteResponseDTO, ClienteService, ClienteUpdateRequest} from '../../../app/services/cliente/cliente.service';
import {ViaCepService} from '../../../app/services/viacep/viacep.service';


// Seus serviços e modelos


@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, NgxMaskDirective,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogContent, MatDialogActions, MatDialogTitle
  ],
  templateUrl: './edit-client.html',
  styleUrls: ['./edit-client.css']
})
export class EditClientComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private viaCepService = inject(ViaCepService);
  private snackBar = inject(MatSnackBar);

  // Injeta referências para o próprio dialog e para os dados que ele recebeu
  public dialogRef = inject(MatDialogRef<EditClientComponent>);
  @Inject(MAT_DIALOG_DATA) public data: ClienteResponseDTO = inject(MAT_DIALOG_DATA);

  formulario!: FormGroup;

  constructor() {
    // A criação do formulário é a mesma do PersonalInfoComponent
    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      telefone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cep: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]),
      logradouro: new FormControl({ value: '', disabled: true }, [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      complemento: new FormControl(''),
      bairro: new FormControl({ value: '', disabled: true }, [Validators.required]),
      localidade: new FormControl({ value: '', disabled: true }, [Validators.required]),
      uf: new FormControl({ value: '', disabled: true }, [Validators.required])
    });
  }

  ngOnInit(): void {
    // Preenche o formulário com os dados do cliente que recebemos
    if (this.data) {
      this.formulario.patchValue(this.data);
    }
  }

  // Lógica de atualização, adaptada do seu PersonalInfoComponent
  onSave(): void {
    if (this.formulario.invalid) {
      this.snackBar.open('Por favor, corrija os erros no formulário.', 'Fechar', { duration: 3000 });
      return;
    }

    const formValues = this.formulario.getRawValue();
    const updateRequest: ClienteUpdateRequest = {
      nome: formValues.nome,
      email: formValues.email,
      telefone: formValues.telefone,
      cep: formValues.cep,
      logradouro: formValues.logradouro,
      numero: formValues.numero,
      complemento: formValues.complemento,
      bairro: formValues.bairro,
      localidade: formValues.localidade,
      uf: formValues.uf
    };

    this.clienteService.atualizarCliente(this.data.id, this.data.tipoCliente, updateRequest)
      .subscribe({
        next: () => {
          this.snackBar.open('Cliente atualizado com sucesso!', 'Fechar', { duration: 3000 });
          // Fecha o dialog e retorna 'true' para indicar que a atualização foi bem-sucedida
          this.dialogRef.close(true);
        },
        error: (erro) => {
          console.error('Erro ao atualizar cliente:', erro);
          this.snackBar.open('Erro ao atualizar os dados. Tente novamente.', 'Fechar', { duration: 5000 });
        }
      });
  }

  onCancel(): void {
    // Simplesmente fecha o dialog sem retornar nada
    this.dialogRef.close();
  }

  // Lógica do ViaCEP, copiada do seu PersonalInfoComponent
  consultarCep(): void {
    // ... (copie e cole a sua função consultarCep aqui, ela funcionará perfeitamente)
  }
}
