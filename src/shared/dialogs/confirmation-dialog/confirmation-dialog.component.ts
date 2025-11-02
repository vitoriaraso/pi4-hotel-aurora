// src/app/shared/dialogs/confirmation/confirmation-dialog.component.ts

import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  //MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    //MatDialogClose,
  ],
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
  // Injeta a referência para o próprio dialog e os dados recebidos (a mensagem)
  public dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  @Inject(MAT_DIALOG_DATA) public data: { message: string } = inject(MAT_DIALOG_DATA);

  onConfirm(): void {
    // Fecha o dialog e retorna 'true' para quem o chamou
    this.dialogRef.close(true);
  }

  onCancel(): void {
    // Fecha o dialog e retorna 'false'
    this.dialogRef.close(false);
  }
}
