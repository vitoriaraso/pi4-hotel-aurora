import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  Cards = [
    {
      id: 1,
      titulo: 'Standard',
      descricao:
        'Suíte aconchegante e funcional, ideal para quem busca conforto com praticidade em um ambiente sofisticado.',
      imagemUrl: 'assets/images/suites/standard.jpg',
    },
    {
      id: 2,
      titulo: 'Executivo',
      descricao:
        'Espaço moderno e bem equipado, perfeito para hóspedes em viagem de negócios que valorizam eficiência e estilo.',
      imagemUrl: 'assets/images/suites/executivo.jpg',
    },
    {
      id: 3,
      titulo: 'Deluxe',
      descricao:
        'Suíte espaçosa com decoração refinada, oferecendo comodidades premium e uma experiência de hospedagem superior.',
      imagemUrl: 'assets/images/suites/deluxe.jpg',
    },
    {
      id: 4,
      titulo: 'Presidencial',
      descricao:
        'O ápice do luxo e exclusividade: ambientes amplos, serviço personalizado e vista privilegiada para uma estadia inesquecível.',
      imagemUrl: 'assets/images/suites/presidencial.jpg',
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
