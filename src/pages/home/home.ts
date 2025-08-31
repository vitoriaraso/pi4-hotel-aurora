import { Component } from '@angular/core';
import { HeroSection } from '../../components/home/hero-section/hero-section';
import { SobreNosSection } from '../../components/home/sobre-nos-section/sobre-nos-section';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-home',
  imports: [HeroSection, SobreNosSection, Header],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  rolarPara(target: HTMLElement): void {
    target.scrollIntoView({ behavior: 'smooth', block: 'start'});
  }
}
