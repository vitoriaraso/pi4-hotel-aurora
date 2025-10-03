import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button.component/button.component';

@Component({
  selector: 'app-account.component',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  name: string = "Zezinho Balboa";
  tel: string = "(00) 0000-0000";
  email: string = "zezinho@corp.ze";

  cep: string = "000000";
  logradouro: string = "000000";
  numero: string = "000000";
  complemento: string = "000000";
  bairro: string = "Selecione";
  localidade: string = "000000";
  uf: string = "000000";

  personalInfoButtonLabel: string = 'Editar';
  isPersonalInfoEditing: boolean = false;

  addressInfoButtonLabel: string = 'Editar';
  isAddressInfoEditing: boolean = false;

  togglePersonalInfo() {
    const personalInfoInputs = document.querySelectorAll<HTMLInputElement>('.personal-info-input');

    if (!this.isPersonalInfoEditing) {
      personalInfoInputs.forEach(input => input.removeAttribute('readonly'));
      personalInfoInputs[0]?.focus();
    } else {
      personalInfoInputs.forEach(input => input.setAttribute('readonly', 'true'));

      const updatedData: Record<string, string> = {};
      personalInfoInputs.forEach(input => {
        updatedData[input.id] = input.value;
      });
      console.log('Dados atualizados:', updatedData);
    }

    this.isPersonalInfoEditing = !this.isPersonalInfoEditing;
    this.personalInfoButtonLabel = this.isPersonalInfoEditing ? 'Salvar' : 'Editar';
  }

  toggleAddressInfo() {
    const addressInfoInputs = document.querySelectorAll<HTMLInputElement>('.address-info-input');

    if (!this.isAddressInfoEditing) {
      addressInfoInputs.forEach(input => input.removeAttribute('readonly'));
      addressInfoInputs[0]?.focus();
    } else {
      addressInfoInputs.forEach(input => input.setAttribute('readonly', 'true'));

      const updatedData: Record<string, string> = {};
      addressInfoInputs.forEach(input => {
        updatedData[input.id] = input.value;
      });
      console.log('Dados atualizados:', updatedData);
    }

    this.isAddressInfoEditing = !this.isAddressInfoEditing;
    this.addressInfoButtonLabel = this.isAddressInfoEditing ? 'Salvar' : 'Editar';
  }
  
  
}
