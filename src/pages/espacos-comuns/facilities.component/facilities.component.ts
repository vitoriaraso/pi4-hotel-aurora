import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspacosService } from '../../../app/services/espacos/espacos.service';
import { EspacosResponseDTO } from '../../../app/models/espacos.model/espacos.model';

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.css'
})
export class FacilitiesComponent {
  private espacosService = inject(EspacosService);

  espacos: EspacosResponseDTO[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.espacosService.listarTodosEspacos().subscribe({
      next: (dados) => {
        this.espacos = dados;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar espaços:', err);
        this.isLoading = false;
      }
    });
  }
}
