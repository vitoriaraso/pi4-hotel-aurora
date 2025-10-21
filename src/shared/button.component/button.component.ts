import { Component, EventEmitter, Input, Output, HostBinding } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() icon?: string; // o ? indica que é opcional
  @Input() disabled: boolean = false;

  // 1. Usando HostBinding para adicionar uma classe ao elemento <app-button>
  //    Quando a propriedade `disabled` for `true`, a classe CSS 'disabled-button' será adicionada.
  @HostBinding('class.disabled-button')
  get isDisabled() {
    return this.disabled;
  }

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
