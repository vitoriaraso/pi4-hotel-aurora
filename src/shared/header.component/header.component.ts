import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SidenavComponent } from '../sidenav.component/sidenav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, SidenavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() menuClick = new EventEmitter<void>();
  
  onMenuClick() {
    this.menuClick.emit();
  }
}
