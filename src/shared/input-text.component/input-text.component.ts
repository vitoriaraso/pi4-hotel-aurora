import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent {
  @Input() id: string = '';
  @Input() type: string = 'text';
  @Input() name: string = "";
  @Input() placeholder?: string = '';
}
