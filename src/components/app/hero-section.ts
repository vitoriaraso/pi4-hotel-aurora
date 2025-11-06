import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

interface Depoimento {
  name: string;
  feedback: string;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.css']
})
export class HeroSection implements OnInit {
  
  ImgRestaurante: { src: string, alt: string } = {
    src: '/assets/images/restaurante.jpg', 
    alt: 'Imagem de destaque, restaurante principal do Aurora Resort.',
  };
  
  // Dados dos depoimentos (Mantido)
  Depoimentos: Depoimento[] = [
    {
      name: 'Isabella F.',
      feedback: 'A experiência no Aurora superou todas as expectativas. O silêncio e o conforto realmente nos fazem desacelerar. O serviço é impecável!',
    },
    {
      name: 'Roberto V.',
      feedback: 'Desde o check-in, a atenção é diferenciada. Encontrei meu refúgio da cidade. Recomendo a todos que buscam tranquilidade e luxo discreto.',
    },
    {
      name: 'Camila P.',
      feedback: 'Cada detalhe do design convida à contemplação. Os momentos inesquecíveis em harmonia com a natureza são reais. Voltarei com certeza!',
    },
  ];

  
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  ngOnInit(): void {
    this.scrollToTop();
  }
}