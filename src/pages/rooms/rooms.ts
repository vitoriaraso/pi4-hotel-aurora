import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Imports Angular Material
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [MatButton, MatIconModule, MatCardModule, CommonModule],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css'
})
export class Rooms {
  constructor(private router: Router) { }

   // Arrays dos Objetos Cards
  Cards = [
    { imagePath: 'assets/images/room04.jpeg', title: 'Classic', description: 'Quarto aconchegante e funcional, ideal para uma estadia prática.', oneIncluded: 'null', twoIncluded: 'null', threeIncluded: 'wifi' },
    { imagePath: 'assets/images/room05.jpeg', title: 'Master', description: 'Espaço confortável, perfeito para dois hóspedes que buscam comodidade.', oneIncluded: 'null', twoIncluded: 'coffee', threeIncluded: 'wifi' },
    { imagePath: 'assets/images/room06.jpeg', title: 'Premier', description: 'Opção sofisticada para um ou dois hóspedes, superior ao Master.', oneIncluded: 'local_dining', twoIncluded: 'coffee', threeIncluded: 'wifi' },
    { imagePath: 'assets/images/room09.jpeg', title: 'Family', description: 'Ambiente planejado para casais com filhos, com espaço extra.', oneIncluded: 'null', twoIncluded: 'local_dining', threeIncluded: 'wifi' },
    { imagePath: 'assets/images/room06.jpeg', title: 'Executive', description: 'Quarto moderno com área de trabalho, ideal para viagens de negócios.', oneIncluded: 'null', twoIncluded: 'coffee', threeIncluded: 'wifi' },
    { imagePath: 'assets/images/room04.jpeg', title: 'Deluxe', description: 'Hospedagem ampla e elegante, combinando luxo e conforto.', oneIncluded: 'null', twoIncluded: 'local_dining', threeIncluded: 'wifi' },
    { imagePath: 'assets/images/room07.jpeg', title: 'Romantic', description: 'Clima intimista e acolhedor, pensado para casais.', oneIncluded: 'null', twoIncluded: 'local_dining', threeIncluded: 'wifi' },
    { imagePath: 'assets/images/room04.jpeg', title: 'Accessible', description: 'Estrutura adaptada para garantir conforto e segurança a todos.', oneIncluded: 'coffee', twoIncluded: 'local_dining', threeIncluded: 'wifi' },
    { imagePath: 'assets/images/room05.jpeg', title: 'Presidential', description: 'A mais alta categoria, unindo luxo, exclusividade e serviços premium.', oneIncluded: 'coffee', twoIncluded: 'local_dining', threeIncluded: 'wifi' },
  ]

  // Pagína de reserva
  reservation() {
    this.router.navigate(['/app-reservation']);
  }
}
