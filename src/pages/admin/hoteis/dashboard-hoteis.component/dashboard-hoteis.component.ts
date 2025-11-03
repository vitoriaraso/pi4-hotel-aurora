import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DashboardTableComponent } from '../../../../shared/dashboard-table.component/dashboard-table.component';
import { ButtonComponent } from '../../../../shared/button.component/button.component';
import {HotelService} from '../../../../app/services/hotel/hotel.service/hotel.service';
import {HotelResponseDTO} from '../../../../app/models/hotel/hotel.model/hotel.model';
import {
  ConfirmationDialogComponent
} from '../../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dashboard-hoteis',
  standalone: true,
  imports: [CommonModule, DashboardTableComponent, MatDialogModule, ButtonComponent, RouterLink],
  templateUrl: './dashboard-hoteis.component.html',
  styleUrls: ['../../css-componente-dashboard/dashboard.component.css']
})
export class DashboardHoteisComponent implements OnInit {
  private hotelService = inject(HotelService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  listaDeHoteis: HotelResponseDTO[] = [];
  isLoading = true;

  // A tabela principal de hotéis é simples
  colunasVisiveis: string[] = ['id', 'nome'];
  nomesDasColunas: Record<string, string> = {
    id: 'ID',
    nome: 'Nome do Hotel'
  };

  ngOnInit(): void {
    this.carregarHoteis();
  }

  carregarHoteis(): void {
    this.isLoading = true;
    this.hotelService.getHoteis().subscribe({
      next: (dados) => {
        this.listaDeHoteis = dados;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar hotéis:', err);
        this.isLoading = false;
      }
    });
  }

  handleView(hotel: HotelResponseDTO): void {
    this.router.navigate(['/admin/dashboard/hoteis', hotel.id]);
  }

  handleDelete(hotel: HotelResponseDTO): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Tem certeza que deseja excluir o hotel "${hotel.nome}"? Isso excluirá todos os espaços e instalações associados.` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.hotelService.deleteHotel(hotel.id).subscribe({
          next: () => {
            this.snackBar.open('Hotel excluído com sucesso!', 'Fechar', { duration: 3000 });
            this.carregarHoteis();
          },
          error: (err) => this.snackBar.open('Erro ao excluir hotel.', 'Fechar', { duration: 5000 })
        });
      }
    });
  }
}
