import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dependencies',
  imports: [CommonModule],
  templateUrl: './dependencies.component.html',
  styleUrls: ['./dependencies.component.css']
})
export class DependenciesComponent {
  itemsDependencies = [
      {
        id: 1,
        titulo: 'Piscina Coberta',
        descricao: 'Mergulhe no luxo, em nosso ambiente climatizado. Piscinas elegantes com design de borda infinita, perfeitas para relaxar em qualquer estação.',
        imagemUrl: '/assets/images/lazer/piscina.jpg'
      },
      {
        id: 2,
        titulo: 'Piscina Descoberta',
        descricao: 'Mergulhe no luxo, seja sob o sol ou em nosso ambiente climatizado. Piscinas elegantes com design de borda infinita, perfeitas para relaxar em qualquer estação.',
        imagemUrl: '/assets/images/lazer/piscinadescoberta.jpg'
      },
      {
        id: 3,
        titulo: 'Oasis SPA & Hidro',
        descricao: 'Um santuário de tranquilidade. Desfrute de hidromassagens privativas e tratamentos de spa exclusivos para revitalizar corpo e mente após um longo dia.',
        imagemUrl: 'assets/images/lazer/hidro.jpg'
      },
      {
        id: 4,
        titulo: 'Fitness Center Exclusivo',
        descricao: 'Mantenha sua rotina de bem-estar com equipamentos de última geração e vista inspiradora.',
        imagemUrl: 'assets/images/lazer/academia.avif'
      },
      {
        id: 5,
        titulo: 'Kids Club Premium',
        descricao: 'Um mundo de imaginação e segurança para os pequenos. Brinquedoteca temática, atividades educativas e recreação supervisionada por monitores especializados.',
        imagemUrl: 'assets/images/lazer/kid.jpg'
      },
      {
        id: 6,
        titulo: 'Pet Lounge & Spa',
        descricao: 'Seu melhor amigo desfruta do mesmo padrão de excelência. Uma área dedicada com serviços de banho, tosa e recreação monitorada, garantindo o conforto total da família.',
        imagemUrl: 'assets/images/lazer/pet.jpg'
      },
      {
        id: 7,
        titulo: 'Café da Manhã Privativo',
        descricao: 'Desperte com uma experiência gastronômica. Produtos frescos, orgânicos e pães de fermentação natural, servidos na privacidade de sua acomodação com vista privilegiada.',
        imagemUrl: 'assets/images/lazer/cafe2.jpg'
      },
      {
        id: 8,
        titulo: 'Salão Aurora Gourmet',
        descricao: 'Desperte com uma experiência gastronômica. Produtos frescos, orgânicos e pães de fermentação natural, servidos em um salão com vista panorâmica.',
        imagemUrl: 'assets/images/lazer/cafe.jpg'
      }


    ];
}

