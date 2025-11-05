import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

interface ConferenceCard {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

interface ContentSection {
  title: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
  reverseLayout: boolean;
}

@Component({
  selector: 'app-conference-room',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './conference-room.component.html',
  styleUrl: './conference-room.component.css',
})
export class ConferenceRoomComponent {
  conferenceCards: ConferenceCard[] = [
    {
      imageSrc: 'assets/images/conference-room/cardamerica.webp',
      imageAlt: 'Imagem sala de conferência Serena',
      title: 'Sala de Conferência Serena',
      description:
        'As salas Serena do Norte e do Sul, juntas, formam o maior espaço para eventos do hotel, com 452 m² e capacidade para até 550 pessoas em estilo cinema ou 500 em coquetéis.',
    },
    {
      imageSrc: 'assets/images/conference-room/cardsalareuniao.webp',
      imageAlt: 'Imagem sala de reunião Horizonte',
      title: 'Sala de Reunião Horizonte',
      description:
        'Um ambiente ideal para eventos criativos e de tecnologia, nossa sala de reunião Horizonte oferece iluminação natural e mais de 90 metros quadrados de espaço.',
    },
    {
      imageSrc: 'assets/images/conference-room/cardsaladiretoria.webp',
      imageAlt: 'Imagem sala de reunião Alvorada',
      title: 'Sala de Reunião Alvorada',
      description:
        'Pense em algo diferente do seu próprio espaço e use nossa elegante sala de diretoria Alvorada para a sua próxima reunião executiva.',
    },
  ];

  contentSections: ContentSection[] = [
    {
      title: 'Inspire seus participantes',
      text: 'Não importa o tamanho ou a finalidade do seu grupo, uma equipe de eventos dedicada combina o conhecimento sobre a região com o estilo inspirado de cada espaço, incrível serviço de buffet com produtos de origem local e pausas sociais prontas para inspirar e motivar o networking entre seus convidados.',
      imageSrc: 'assets/images/conference-room/salareuniaodiretoria.webp',
      imageAlt: 'Imagem de uma sala de reunião ampla e sofisticada',
      reverseLayout: false, // padrão
    },
    {
      title: 'Internet segura e estável',
      text: 'Para que uma reunião on-line aconteça com excelência, oferecemos dois provedores de internet. Conexão dedicada de acesso à internet de até 100 Mbps. Modo full-duplex, velocidade de download e upload iguais de até 100 Mbps.',
      imageSrc: 'assets/images/conference-room/salareuniaodiretoria2.webp',
      imageAlt:
        'Imagem de uma sala de reunião com paredes de vidro e no exterior vegetação exuberante',
      reverseLayout: true, // reverse'
    },
    {
      title: 'Auditório Abram Szajman',
      text: 'Espaço sofisticado e acolhedor, projetado para eventos memoráveis. À frente, um palco amplo e bem iluminado se destaca, com cortinas elegantes e equipamentos audiovisuais de última geração. O ambiente é climatizado, com iluminação suave que reforça a atmosfera refinada.',
      imageSrc: 'assets/images/conference-room/auditorio.webp',
      imageAlt: 'Imagem de um auditório',
      reverseLayout: false, // padrão
    },
  ];
}
