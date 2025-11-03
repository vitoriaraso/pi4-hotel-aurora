/*
import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { AboutAuroraComponent } from '../about-aurora.component/about-aurora.component';
import { RoomsSectionComponent } from '../rooms-section.component/rooms-section.component';
import { HeroSection } from "../../../components/app/hero-section";
import { FooterComponent } from "../../../shared/footer.component/footer.component";
import { HeaderComponent } from "../../../shared/header.component/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutAuroraComponent, RoomsSectionComponent, HeroSection, FooterComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
  private swiperInstance?: Swiper;

  constructor(private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    console.log("1. ngAfterViewInit foi chamado.");

    if (this.carouselContainer && this.carouselContainer.nativeElement) {
      console.log("2. Elemento do carrossel encontrado no DOM:", this.carouselContainer.nativeElement);
      this.initializeSwiper();
    } else {
      console.error("ERRO CRÍTICO: O elemento do carrossel NÃO foi encontrado com @ViewChild.");
    }
  }

  initializeSwiper(): void {
    console.log("3. Tentando inicializar o Swiper...");
    try {
      this.ngZone.runOutsideAngular(() => {
        this.swiperInstance = new Swiper(this.carouselContainer.nativeElement, {
          modules: [Autoplay, Pagination],

          // Configurações básicas para testar
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
          },
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },

          // Debugging
          observer: true,
          observeParents: true,
        });

        console.log("4. SUCESSO! Instância do Swiper criada:", this.swiperInstance);
      });
    } catch (error) {
      console.error("5. ERRO AO INICIAR O SWIPER:", error);
    }
  }
}
*/