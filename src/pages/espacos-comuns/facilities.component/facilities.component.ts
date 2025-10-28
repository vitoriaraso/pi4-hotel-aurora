import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspacosService } from '../../../app/services/espacos/espacos.service';
import { EspacosResponseDTO } from '../../../app/models/espacos/espacos.model';

interface SecaoEspaco {
  titulo: string;
  espacos: EspacosResponseDTO[];
}

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.css'
})
export class FacilitiesComponent implements OnInit {
  private espacosService = inject(EspacosService);

  secoesDeEspacos: SecaoEspaco[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.espacosService.listarTodosEspacos().subscribe({
      next: (dados) => {
        // came uma nova função para processar os dados recebidos
        this.agruparEspacosPorSecao(dados);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar espaços:', err);
        this.isLoading = false;
      }
    });
  }

  private agruparEspacosPorSecao(espacos: EspacosResponseDTO[]): void {
    // defina aqui suas seções e a ordem delas
    const secoesConfig = [
      { titulo: 'Lazer e Diversão', tipos: ['PISCINA', 'SALADEJOGOS', 'SALAODETV', 'PLAYGROUND', 'QUADRAPOLIESPORTIVA', 'ESPACOKIDS', 'CINEMA'] },
      { titulo: 'Bem-Estar e Relaxamento', tipos: ['ACADEMIA', 'JARDIM', 'SALADELEITURA', 'TERRACO'] },
      { titulo: 'Serviços e Conveniência', tipos: ['REFEITORIO', 'LOBBY'] }
      // Adicione mais seções se precisar
    ];

    this.secoesDeEspacos = secoesConfig.map(secao => {
      // para cada seção, filtre a lista completa de espaços
      const espacosDaSecao = espacos.filter(espaco => secao.tipos.includes(espaco.tipoEspacos));

      // retorne o novo objeto de seção com os espaços filtrados
      return {
        titulo: secao.titulo,
        espacos: espacosDaSecao
      };
    }).filter(secao => secao.espacos.length > 0); // remove seções que ficaram vazias
  }
}
