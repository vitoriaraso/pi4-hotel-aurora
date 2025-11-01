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
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
  constructor(private router: Router) { }

   // Arrays dos Objetos Cards PRESIDENCIAL, DELUXE, EXECUTIVO, STANDARD
  Cards = [
    { imagePath: 'assets/images/suites/standard.jpg', title: 'Standard', description: 'Suíte aconchegante e funcional, ideal para quem busca conforto com praticidade em um ambiente sofisticado.', oneIncluded: 'null', twoIncluded: 'null', threeIncluded: 'wifi' },
    { imagePath: 'assets/images/suites/executivo.jpg', title: 'Executivo', description: 'Espaço moderno e bem equipado, perfeito para hóspedes em viagem de negócios que valorizam eficiência e estilo.', oneIncluded: 'null', twoIncluded: 'coffee', threeIncluded: 'wifi' },
    { imagePath: 'assets/images/suites/deluxe.jpg', title: 'Deluxe', description: 'Suíte espaçosa com decoração refinada, oferecendo comodidades premium e uma experiência de hospedagem superior.', oneIncluded: 'local_dining', twoIncluded: 'coffee', threeIncluded: 'wifi' },
    { imagePath: 'assets/images/suites/presidencial.jpg', title: 'Presidencial', description: 'O ápice do luxo e exclusividade: ambientes amplos, serviço personalizado e vista privilegiada para uma estadia inesquecível.', oneIncluded: 'null', twoIncluded: 'local_dining', threeIncluded: 'wifi' },
    
  ]

  // Pagína de reserva
  reservation() {
    this.router.navigate(['/app-reservation']);
  }
}
