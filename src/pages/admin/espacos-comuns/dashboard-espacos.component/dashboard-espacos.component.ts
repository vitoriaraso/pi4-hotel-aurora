import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DashboardTableComponent } from '../../../../shared/dashboard-table.component/dashboard-table.component';
import { ButtonComponent } from '../../../../shared/button.component/button.component';
import { EspacosService } from '../../../../app/services/espacos/espacos.service';
import { EspacosResponseDTO } from '../../../../app/models/espacos/espacos.model';
import { ConfirmationDialogComponent } from '../../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dashboard-espacos',
  standalone: true,
  imports: [CommonModule, DashboardTableComponent, MatDialogModule, ButtonComponent, RouterLink],
  templateUrl: './dashboard-espacos.component.html',
  styleUrl: '../../css-componente-dashboard/dashboard.component.css'
})
export class DashboardEspacosComponent implements OnInit {
  private espacosService = inject(EspacosService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  listaDeEspacos: EspacosResponseDTO[] = [];
  isLoading = true;

  colunasVisiveis: string[] = ['id', 'tipoEspacos', 'descricao', 'hotel'];
  nomesDasColunas: Record<string, string> = {
    id: 'ID',
    tipoEspacos: 'Tipo de Espaço',
    descricao: 'Descrição',
    hotel: 'Hotel'
  };

  ngOnInit(): void {
    this.carregarEspacos();
  }

  carregarEspacos(): void {
    this.isLoading = true;
    this.espacosService.getEspacos().subscribe({
      next: (dados) => {
        // Mapeia os dados para extrair o nome do hotel (objeto aninhado)
        this.listaDeEspacos = dados.map(espaco => ({
          ...espaco,
          hotel: espaco.hotel.nome as any,
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar espaços:', err);
        this.isLoading = false;
      }
    });
  }

  handleView(espaco: EspacosResponseDTO): void {
    this.router.navigate(['/admin/dashboard/espacos-comuns', espaco.id]);
  }

  handleDelete(espaco: EspacosResponseDTO): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Tem certeza que deseja excluir o espaço "${espaco.tipoEspacos}"?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.espacosService.deleteEspaco(espaco.id).subscribe({
          next: () => {
            this.snackBar.open('Espaço excluído com sucesso!', 'Fechar', { duration: 3000 });
            this.carregarEspacos();
          },
          error: (err) => this.snackBar.open('Erro ao excluir espaço.', 'Fechar', { duration: 5000 })
        });
      }
    });
  }
}
