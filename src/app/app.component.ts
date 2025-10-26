import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from '../shared/sidenav.component/sidenav.component';
import { CartSidenavComponent } from '../shared/cart-sidenav.component/cart-sidenav.component';
import { HeaderComponent } from '../shared/header.component/header.component';
import { FooterComponent } from '../shared/footer.component/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    MatSidenavModule,
    SidenavComponent,
    CartSidenavComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showHeader: boolean = true;
  showFooter: boolean = true;

  // Documentação: Injetamos o serviço de Roteamento (Router) e a Rota Ativa (ActivatedRoute)
  // para podermos "ouvir" e "inspecionar" as navegações.
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  // Documentação: ngOnInit é um "gancho de ciclo de vida" que roda uma vez
  // quando o componente é inicializado. É o lugar perfeito para configurar nosso "ouvinte".
  ngOnInit() {
    this.router.events.pipe(
      // Filtramos os eventos de roteamento para pegar apenas o 'NavigationEnd',
      // que acontece quando uma navegação entre páginas é concluída com sucesso.
      filter(event => event instanceof NavigationEnd),
      // Mapeamos o evento para obter os dados da rota que nos interessam.
      map(() => {
        let route = this.activatedRoute;
        // Navegamos pela árvore de rotas para encontrar a rota filha primária.
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      // Pegamos os dados ('data') da rota encontrada.
      map(route => route.snapshot.data)
    ).subscribe(data => {
      // Finalmente, atualizamos nossa variável 'showHeader' com o valor
      // que definimos no arquivo de rotas.
      this.showHeader = data['showHeader'] ?? true; // Usa 'true' como padrão
      this.showFooter = data['showFooter'] ?? true; // Usa 'true' como padrão
    });
  }



}
