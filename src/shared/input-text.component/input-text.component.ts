import { Component, Input, forwardRef, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() mask: string = '';
  @Input() dropSpecialCharacters: boolean = true;

  // Um FormControl interno para gerenciar o estado do input e interagir com ngx-mask
  internalControl = new FormControl('');
  private destroy$ = new Subject<void>();

  // Funções 'callback' que o Angular nos dará para notificar o formulário pai
  private onChange = (_: any) => {};
  private onTouched = () => {};

  // Ele vai emitir um evento chamado 'inputBlur'
  @Output() blurEvent = new EventEmitter<void>();

  ngOnInit(): void {
    // Escuta as mudanças no FormControl interno e as propaga para o formulário pai
    this.internalControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.onChange(value);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // O formulário pai nos dá o valor inicial
  writeValue(value: any): void {
    // Define o valor no controle interno sem disparar o valueChanges
    this.internalControl.setValue(value, { emitEvent: false });
  }

  // O Angular nos dá esta função para que possamos notificar o pai sobre mudanças
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // O Angular nos dá esta função para notificar que o campo foi 'tocado'
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // O Angular nos informa se o campo deve ser desabilitado
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.internalControl.disable();
    } else {
      this.internalControl.enable();
    }
  }

  // Propaga o evento 'touched' para o formulário pai quando o usuário sai do campo
  handleBlur(): void {
    this.onTouched();
    this.blurEvent.emit();
  }
}
