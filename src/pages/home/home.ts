import { Component } from '@angular/core';
import { HeroSection } from '../../components/home/hero-section/hero-section';
import { SobreNosSection } from '../../components/home/sobre-nos-section/sobre-nos-section';

@Component({
  selector: 'app-home',
  imports: [HeroSection, SobreNosSection],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  rolarPara(target: HTMLElement): void {
    target.scrollIntoView({ behavior: 'smooth', block: 'start'});
  }
}
